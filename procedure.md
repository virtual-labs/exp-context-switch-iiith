### Procedure
We have 7 components:

* Instruction box
* Ready pool: Where the live processes will be placed
* CPU: where the process in execution is placed
* I/O pool: where the process will go if the process has any I/O calls.
* Completed pool: This is where all the completed processes are placed.
* Controls: This is where all the buttons that the you can play with are placed.
* Log: Where all actions on the process get recorded

We have 6 controls:
* Create Process and put it in Ready Pool
* CPU to Ready Pool
* CPU to IO Pool
* IO Pool to Ready Pool
* Terminate the Process in CPU
* Advance Clock

Steps of the simulator:

1. You will receive a notification from the instruction box saying that there is a process that needs to be created. You will click on the Create Process and put it in Ready Pool and you can see that a process has appeared in the running queue.
2. Click on the process to send it to the CPU.
3. Once you are in the CPU we can use one of 4 different buttons:
  - Click Advance Clock: You can advance the clock cycle by clicking this button.
  - Click CPU to Ready Pool: You might receive an instruction saying that the process in the CPU needs to get preempted so you will have to push the process back to the ready pool by clicking this button.
  - Click CPU to IO Pool: If you receive an instruction saying the current process has I/O calls then you will need to push the process from the CPU to the I/O pool by clicking the button.
  - Click Terminate the Process in CPU: Once the process is completed we will receive an instruction saying you need to kill the process as it is completed so now the process can be pushed to the completed process pool where it can no longer be accessed.
4. Inside the I/O pool you will wait for the instruction saying the process can collect the data ,here you can click the IO Pool to Ready Pool button which will then send the process back to the ready pool.
![exp 1-procedure](https://user-images.githubusercontent.com/110168104/200494899-46443936-8ce6-48d5-8187-9526cdd4d98f.jpeg)


