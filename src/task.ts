/******** Variables and interfaces ********/

import { saveTasks } from "./storage";

interface Task{

id: number;
taskName: string;
priority: "Low"|"Medium"|"High";
completed: boolean;
description? : string;

toggle():void;

}

let taskList: Task[]=[];

export type TaskPriority="Low"|"Medium"|"High"



/******** functions ********/ 

export const getTaskList= () : Task[]=> taskList;

export const setTaskList= (newTasks : Task[]) : Task[] => taskList= newTasks;

export const getTask =(id : number): Task => taskList.filter((task)=>task.id=id)[0]!;

export const deleteTask=(id: number): void => {
    taskList= taskList.filter((task)=>task.id!=id);
    saveTasks();
}

 export function createTask (name: string, prio :"Low"|"Medium"|"High", desc:string =""):void{

    let nextId: number=1;

    let newTask: Task={
        id:nextId,
        taskName:name,
        priority: prio,
        completed:false,
        description: desc,

        toggle() {
            console.log(this.completed);
            return this.completed=!this.completed;
            saveTasks();
            
        }
    }
   taskList.push(newTask);
   saveTasks();
   nextId++;
}

 export const countTodo=():number=>{
    let result:number =0;
    for(const task of getTaskList()){
        if(!task.completed) result++;
    }
    return result;
    
}

