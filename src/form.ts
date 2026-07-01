
import { renderFooter,renderTasks } from "./render.js";
import { createTask,getTaskList } from "./task.js";
import type { TaskPriority } from "./task.js";


/************ Rendering , eventListners , build DOM ***********/




/* get fields for adding task */
const taskNameInput= document.querySelector("#taskName") as HTMLInputElement;
const descriptionInput= document.querySelector("#description") as HTMLInputElement;
const priorityInput=document.querySelector("#priority")as HTMLSelectElement;
const errorInput=document.querySelector(".error") as HTMLParagraphElement;
//const addButton= document.querySelector(".addButton") as HTMLButtonElement;
const form =document.querySelector(".form-group") as HTMLFormElement;



//addButton.addEventListener("click", addTask);
form.addEventListener("submit",handleSubmit);


function handleSubmit(event: SubmitEvent): void {
    event.preventDefault();

    const taskNm :string= taskNameInput.value.trim();
    const desc : string= descriptionInput.value;
    const prio=priorityInput.value as TaskPriority;

    const error=validateEntry(taskNm, desc);

    if (error !== ""){
        errorInput.textContent=error;
        return;
    }



    createTask(taskNm,prio,desc);
    renderTasks();
    renderFooter();

    clearEntry();

}

function validateEntry(name: string, description:string): string{

    if(name === "") return "Task can't be empty";
    if(name.length < 3) return "Task must have a minmum of 3 ch";
    if(name.length > 40) return "Task name can only contain max 40 ch";
    if(description.length > 40) return "Task description cannot be more than 40 ch";
    for(const task of getTaskList()){
        if(task.taskName.toLowerCase()===name.toLowerCase()) return "Task arlready exists!"
    }
    return "";

}

function clearEntry (): void {
    taskNameInput.value="";
    descriptionInput.value="";
    priorityInput.selectedIndex=0;

}
