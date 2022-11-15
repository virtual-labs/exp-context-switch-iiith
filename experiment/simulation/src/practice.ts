import { Process, initialize_processes } from './helper_functions';

let instruction = document.getElementById("instruction");

instruction.textContent = "No Instruction for now";

let log: string[] = [];

const log_ele = document.getElementById("log");

let current_time: number = 0;
let processes: Process[] = initialize_processes(6);
// console.log(processes);
let ready: Process[] = [];
let io: Process[] = [];
let completed: Process[] = [];
let cpu_proc: Process | null = null;
let prempt: number = 0;
const cpu_time = 2;

function create_process_ui(process: Process): HTMLDivElement {
    const d = document.createElement('div');
    let p = document.createElement('p');
    p.textContent = "P" + String(process.id);
    d.appendChild(p);
    // let p2 = document.createElement('p');
    // p2.textContent = "Remaining Time: " + String(process.ticks - process.cur_ticks);
    // d.appendChild(p2);
    d.classList.add('process');
    return d;
}

function update_log() {
    // log_ele.innerHTML = "";
    // log.forEach((log: string) => {
    //     const p = document.createElement('p');
    //     p.textContent = log;
    //     log_ele.appendChild(p);
    // })
    const p = document.createElement('p');
    const l = log.length;
    p.textContent = `${l}. Time: ${current_time} ${log[l - 1]}`;
    log_ele.appendChild(p);
}

let update_ready_queue = () => {
    const ready_queue = document.querySelector("#ready_queue .queue_body");
    ready_queue.innerHTML = "";
    ready.forEach((process: Process) => {
        // const p = document.createElement('p');
        // p.textContent = "P" + String(process.id);
        // p.classList.add('process');
        const d = create_process_ui(process);
        ready_queue.appendChild(d);
        d.style.backgroundColor = "blue";
        d.onclick = (event: MouseEvent) => {
            // check if sending the process to cpu is correct
            if (cpu_proc !== null) {
                // alert("CPU is not empty. Please wait for the current process to complete.");
                instruction.textContent = "Think again! CPU is not empty. There can be only one process running in the CPU.";
                return;
            }
            
            // console.log("hello eswar")
            cpu_proc = process;
            ready = ready.filter(proc => proc.id !== process.id);
            log.push(`Process P${process.id} is moved from ready pool to CPU`);
            update();
        }
    });
}

let update_io_queue = () => {
    const io_queue = document.querySelector("#io_queue .queue_body");
    io_queue.innerHTML = "";
    io.forEach((process: Process) => {
        // const p = document.createElement('p');
        // p.textContent = "P" + String(process.id);
        // p.classList.add('process');
        const d = create_process_ui(process);
        d.style.backgroundColor = "gray";
        if (process.io != null && process.io.ticks === 0) {
            d.style.backgroundColor = "yellow";
        }
        io_queue.appendChild(d);
    })
}

let update_complete_pool = () => {
    const complete_pool = document.querySelector("#complete_pool .queue_body");
    complete_pool.innerHTML = "";
    completed.forEach((process: Process) => {
        // const p = document.createElement('p');
        // p.textContent = "P" + String(process.id);
        // p.classList.add('process');
        const d = create_process_ui(process);
        d.style.backgroundColor = "black";
        complete_pool.appendChild(d);
    })
}


let update_cpu = () => {
    if (cpu_proc !== null) {
        // console.log("pora yedava");
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "";
        // const p = document.createElement('p');
        // p.textContent = "P" + String(cpu_proc.id);
        // p.classList.add('process');
        const d = create_process_ui(cpu_proc);
        d.style.backgroundColor = "green";
        if (cpu_proc.io != null && cpu_proc.io.start_time === cpu_proc.cur_ticks) {
            d.style.backgroundColor = "gray";
        }
        else if (cpu_proc.cur_ticks === cpu_proc.ticks) {
            d.style.backgroundColor = "black";
        }
        else if (ready.length >0 && prempt === cpu_time) {
            d.style.backgroundColor = "blue";
        }
        cpu_ele.appendChild(d);
    }
    else {
        const cpu_ele = document.querySelector("#cpu .queue_body");
        cpu_ele.innerHTML = "No Process in CPU";
    }
}

let update_instruction = () => {
    let inst: string = `Advance the clock`;
    if (completed.length == 6) {
        inst = "Well Done! You have completed running all processes."
    }
    else if (processes.length > 0 && processes[0].start_time == current_time) {
        inst = `There is a create request for a new process P${processes[0].id}`;
    }
    else if (cpu_proc === null && ready.length > 0) {
        // inst = "The CPU is empty. Please select a process in ready queue for execution";
        inst = "";
    }
    else if (cpu_proc !== null && cpu_proc.io != null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        inst = `The process P${cpu_proc.id} in CPU needs IO.`;
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        inst = `The process P${cpu_proc.id} in CPU hit the termination instruction.`;
    }
    else if (cpu_proc !== null && ready.length > 0 && prempt == cpu_time) {
        inst = `The process P${cpu_proc.id} in CPU completed its current cpu time.`;
    }
    else {
        // io queue
        let flag: Boolean = false;
        for (let index = 0; index < io.length; index++) {
            if (io[index].io != null && io[index].io.ticks === 0) {
                inst = `The process P${io[index].id} in IO pool is done with IO.`;
                break;
            }
        }
    }
    instruction.textContent = inst;
}

function update_clock() {
    document.getElementById("clock_val").textContent = String(current_time);
}

let update = () => {
    update_instruction();
    update_ready_queue();
    update_cpu();
    update_io_queue();
    update_complete_pool();
    update_clock();
    if (log.length > 0) {
        update_log();
    }
    // console.log(log);
}

update();

document.getElementById("advance_clock").onclick = (event: MouseEvent) => {
    // check if the user has done all the required things before advancing the clock
    if (completed.length == 6) {
        // alert("You have completed running all processes. Please refresh the page to start again.");
        instruction.textContent = "You have completed running all processes. Please refresh the page to start again.";
        return;
    }
    else if (processes.length > 0 && processes[0].start_time == current_time) {
        // alert("Please create the new process before advancing the clock.");
        instruction.textContent = `Think again! There is a create request for the process P${processes[0].id}.`;
        return;
    }
    else if (cpu_proc === null && ready.length > 0) {
        // alert("The CPU is empty. Please select a process in ready queue for execution");
        instruction.textContent = "Think again! The CPU is empty.";
        return;
    }
    else if (cpu_proc !== null && cpu_proc.io != null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        // alert("The process in CPU needs IO. Please send it to IO queue by clicking IO.");
        instruction.textContent = "Think again! The process in CPU needs IO.";
        return;
    }
    else if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        // alert("The process in CPU completed its work. Please send it to complete pool by clicking Complete.");
        instruction.textContent = `Think again! The process P${cpu_proc.id} in CPU hit the termination instruction.`;
        return;
    }
    else if (cpu_proc !== null && ready.length > 0 && prempt == cpu_time) {
        // alert("The process in CPU completed its current cpu time. Please send it to ready queue by clicking Prempt.");
        instruction.textContent = `Think again! The process P${cpu_proc.id} in CPU needs to be preempted.`;
        return;
    }
    else {
        // io queue
        let flag: Boolean = false;
        for (let index = 0; index < io.length; index++) {
            if (io[index].io != null && io[index].io.ticks === 0) {
                // alert(`The process P${io[index].id} in IO queue got IO. Please collect data and send it to ready queue by clicking Collect.`);
                instruction.textContent = `Think again! The process P${io[index].id} in IO pool got IO and is waiting to go to ready pool.`;
                flag = true;
                break;
            }
        }
        if (flag) return;
    }

    current_time = current_time + 1;
    if (cpu_proc !== null) {
        cpu_proc.cur_ticks = cpu_proc.cur_ticks + 1;
        prempt = prempt + 1;
    }
    for (let index = 0; index < io.length; index++) {
        io[index].io.ticks--;
    }
    log.push(`Advanced clock to ${current_time}`);
    update();
}

document.getElementById("create").onclick = (event: MouseEvent) => {
    // check if clicking "create" is valid
    if (processes[0].start_time != current_time) {
        // alert("The process is not ready to be created.");
        instruction.textContent = `Think again! There is no process ready to be created.`;
        return;
    }

    if (processes.length > 0 && processes[0].start_time == current_time) {
        ready.push(processes[0]);
        processes.shift();
        log.push(`Created process P${ready[ready.length - 1].id}`);
        update();
    }
}

document.getElementById("prempt").onclick = (event: MouseEvent) => {
    // check if clicking "prempt" is valid
    if (cpu_proc === null) {
        // alert("The CPU is empty. There is no process to preempt.");
        instruction.textContent = `Think again! The CPU is empty.`;
        return;
    }
    else if (prempt != cpu_time || ready.length == 0) {
        // alert("The process in CPU has not completed its current cpu time. Please wait for it to complete.");
        instruction.textContent = `Think again! The process P${cpu_proc.id} in CPU doesn't need to be preempted now.`;
        return;
    }

    // if (cpu_proc !== null && prempt == cpu_time) {
        ready.push(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Preempted process P${ready[ready.length - 1].id}, and put it in ready queue`);
        update();
    // }
}

document.getElementById("goto_io").onclick = (event: MouseEvent) => {
    // check if clicking "goto_io" is valid
    if (cpu_proc === null) {
        // alert("The CPU is empty. There is no process to send to IO.");
        instruction.textContent = `Think again! The CPU is empty.`;
        return;
    }
    else if (cpu_proc.io != null && cpu_proc.cur_ticks != cpu_proc.io.start_time) {
        // alert("The process in CPU doesn't need IO now.");
        instruction.textContent = `Think again! The process P${cpu_proc.id} in CPU doesn't need IO now.`;
        return;
    }

    if (cpu_proc !== null && cpu_proc.io != null && cpu_proc.cur_ticks === cpu_proc.io.start_time) {
        io.push(cpu_proc);
        // console.log("In Goto IO");
        // console.log(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Sent process P${io[io.length - 1].id} to IO pool`);
        update();
    }
}

document.getElementById("collect").onclick = (event: MouseEvent) => {
    // check if clicking "collect" is valid
    let flag: Boolean = false;
    for (let index = 0; index < io.length; index++) {
        if (io[index].io != null && io[index].io.ticks === 0) {
            flag = true;
            break;
        }
    }
    if (!flag) {
        // alert("There is no process in IO pool that has completed IO.");
        instruction.textContent = `Think again! There is no process in IO pool that has completed IO.`;
        return;
    }

    let process: Process;
    for (let index = 0; index < io.length; index++) {
        if (io[index].io != null && io[index].io.ticks === 0) {
            process = io[index];
            break;
        }
    }
    process.io.start_time = -1;
    ready.push(process);
    io = io.filter(proc => proc.id !== process.id);
    log.push(`Sent the process P${process.id} from IO pool to ready pool`);
    update();
}

document.getElementById("kill").onclick = (event: MouseEvent) => {
    // check if clicking "kill" is valid
    if (cpu_proc === null) {
        // alert("There is no process in CPU to terminate.");
        instruction.textContent = `Think again! The CPU is empty.`;
        return;
    }
    else if (cpu_proc.cur_ticks != cpu_proc.ticks) {
        // alert("The process in CPU has not hit its termination instruction yet.");
        instruction.textContent = `Think again! The process P${cpu_proc.id} in CPU hasn't hit its termination instruction yet.`;
        return;
    }

    if (cpu_proc !== null && cpu_proc.cur_ticks === cpu_proc.ticks) {
        completed.push(cpu_proc);
        cpu_proc = null;
        prempt = 0;
        log.push(`Terminated process P${completed[completed.length - 1].id}`);
        update();
    }
}

