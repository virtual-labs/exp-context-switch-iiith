export { initialize_processes }

interface IOTime {
    start_time: number
    ticks: number
}

export interface Process {
    id: number
    start_time: number
    io: IOTime | null
    ticks: number
    cur_ticks: number
}

const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const create_process = (id: number): Process => {
    const ticks: number = getRandomInt(3, 6);
    let io = {
        "start_time": getRandomInt(1, ticks - 1),
        "ticks": getRandomInt(1, 3)
    }
    if (id % 2 == 0) {
        io = null;
    }
    return {
        "id": id,
        "ticks": ticks,
        "start_time": getRandomInt(0, 10),
        "cur_ticks": 0,
        "io": io
    }
}

const initialize_processes = (n: number): Process[] => {
    let processes = [];
    for (let i = 0; i < n; i++) {
        processes.push(create_process(i));
    }
    processes.sort((p1, p2) => p1.start_time - p2.start_time);
    return processes;
}

