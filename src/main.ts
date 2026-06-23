
/******** Variables and interfaces ********/


interface Task{
taskName: string;
priority: "low"|"medium"|"high";
completed: boolean;
description? : string;

toggle():void;

}

const taskList: Task[]=[];

/******** functions ********/

const getTaskList= () : Task[]=> taskList;

const getTask =(i : number): Task => taskList[i]!;

const deleteTask=(i: number): Task[] => taskList.splice(i);

const setTask=(task : Task) : number => taskList.push(task);

function createTask (name: string, prio : "low"|"medium"|"high",desc?:string):void{
  let task: Task={
    taskName:name,
    priority: prio,
    completed:false,
    description: desc!,

    toggle() {
        return this.completed=!this.completed;
        
    }


  }
  setTask(task);
}

const updateTask=(task : Task, i : number) : void=>{

    deleteTask(i);
    setTask(task);

}
const completeTask=(i : number): void=>{
    const task=taskList[i]!;
    task.completed=true;
}

const statistics=()=>{

}


/******** Console testdata ********/


const task1: Task ={taskName:"Lära mig TS", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
const task2: Task ={taskName:"Tvätta", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
const task3: Task ={taskName:"Diska", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
const task4: Task ={taskName:"Slänga soppor", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
const task5: Task ={taskName:"Tömma brevlådan", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
const task6: Task ={taskName:"Handla", priority:"low",completed:false,description:"tofu och spenat", toggle(){ return this.completed=!this.completed;} };
createTask("Damma","low");

const tasks: Task[] =[task1,task2,task3,task4,task5,task6];



printHeader();
printTodo();
printCompleted();

/******** Print console functions ********/


function printHeader() :void{


    console.log(`

       ------------------------ 
        TASKTRACKER
       ------------------------
       
    `);

}

function printTodo(): void{
    console.log("Todo:");

    for(const task of tasks){
        if(!task.completed){
            console.log(`

        ------------------------ 
            ${task.taskName}
        ------------------------
            Priority: ${task.priority}
            Completed: ${task.completed}

            `);
        }
    }

}


function printCompleted():void{

    console.log("Completed:");

    for(const task of tasks){
        if(task.completed){
            console.log(`

        ------------------------ 
            ${task.taskName}
        ------------------------
            Priority: ${task.priority}
            Completed: ${task.completed}

            `);
        }
    }
}




