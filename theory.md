### Theory

From creation to completion the process goes through many state transitions.
We will be experimenting with 5 stages:
* New
* Ready
* Running
* Wait
* Kill

### New:

In this stage the process is yet to be created and is in the form of a program in the secndary memory waitng for OS to create the process.

### Ready:

In this state the process has been created and is waiting in the main memory for the CPU to execute process instructions.

### Running:

The process has been chosen from the ready queue and the CPU is executing the instuctions in the process.

### Waiting:

The process might request access to I/O or need user input,when this happens we send the process to waiting state.

### Kill:
The process has been completed or is terminated and PCB gets deleted.


We will also be looking into peemption in this experiment.This is basically when the process is forcfully pulled out of the CPU and put in the ready state.

![exp1-theory](https://user-images.githubusercontent.com/110168104/200497337-dee35ec1-a220-41b0-ab09-b0961b8b0f43.jpeg)
---------------------------------------------------------------------------------------------------------------------------------------------------------

## Context Switching

### What is context switching?
The Context switching is a technique or method used by the operating system to switch a process from one state to another to execute its function using CPUs in the system. 
### Why context switching?
A context switching helps to share a single CPU across all processes to complete its execution and store the system's tasks status. When the process reloads in the system, the execution of the process starts at the same point where there is conflicting.
* If a high priority process falls into the ready queue, the currently running process will be shut down or stopped by a high priority process to complete its tasks in the system.
* If any running process requires I/O resources in the system, the current process will be switched by another process to use the CPUs. And when the I/O requirement is met, the old process goes into a ready state to wait for its execution in the CPU. Context switching stores the state of the process to resume its tasks in an operating system. Otherwise, the process needs to restart its execution from the initials level.
* A context switching allows a single CPU to handle multiple process requests simultaneously without the need for any additional processors.
### Triggers for context switching:
We are focusing on these triggers for context switching:
* Interrupts
* Multitasking
