import { getTaskList,setTaskList } from "./task.js";


export function saveTasks() :void {
    const json = JSON.stringify(getTaskList());
    localStorage.setItem("tasks",json);
}

export function loadTasks() :void {
    const json= localStorage.getItem("tasks");
    if(json ===null){
        return;
    }
    setTaskList(JSON.parse(json)); 
}