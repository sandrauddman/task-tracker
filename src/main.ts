
/******** Variables and interfaces ********/


interface Task{

id: number;
taskName: string;
priority: "low"|"medium"|"high";
completed: boolean;
description? : string;

toggle():void;

}


type TaskPriority="low"|"medium"|"high"

let taskList: Task[]=[];
let nextId: number=1;




/******** functions (fix id instead of index)********/ 

const getTaskList= () : Task[]=> taskList;

const getTask =(id : number): Task => taskList.filter((task)=>task.id=id)[0]!;

const deleteTask=(id: number): Task[] => taskList= taskList.filter((task)=>task.id!=id);

function createTask (name: string, prio :"low"|"medium"|"high", desc:string =""):void{

  let newTask: Task={
    id:nextId,
    taskName:name,
    priority: prio,
    completed:false,
    description: desc,

    toggle() {
        return this.completed=!this.completed;
        
    }
  }
   taskList.push(newTask);
   nextId++;
}

const completeTask=(id : number): void=>{
    const task=getTask(id);
    task.completed=true;
}

const countTodo=():number=>{
    let result:number =0;
    for(const task of taskList){
        if(!task.completed) result++;
    }
    return result;
    
}




/************ Rendering , eventListners , build DOM ***********/


/* get table body*/ 
const taskrows = document.querySelector("tbody");

/* get footer*/ 
const footer= document.querySelector("footer");

/* get fields for adding task */
const taskNameInput= document.querySelector("#taskName") as HTMLInputElement;
const descriptionInput= document.querySelector("#description") as HTMLInputElement;
const priorityInput=document.querySelector("#priority")as HTMLSelectElement;
const addButton= document.querySelector(".addButton") as HTMLButtonElement;

/* get checkbox for toggle complete */

const checkbox= document.getElementById("#taskCheck") as HTMLInputElement;


addButton.addEventListener("click", ()=>{
    addTask();
   
})








function addTask(){

const taskNm :string= taskNameInput.value.trim();
const desc : string= descriptionInput.value;
const prio=priorityInput.value as TaskPriority;

createTask(taskNm,prio,desc);
renderTasks();
renderFooter();

taskNameInput.textContent="";
descriptionInput.textContent="";
priorityInput.selectedIndex=0;

}



function renderTasks() : void{

    if(taskrows) taskrows.innerHTML="";

    for(const task of taskList){

    const row =document.createElement("tr");

    const td1 =document.createElement("td");
    td1.classList.add("task")
    td1.innerHTML= `<input type="checkbox" name="taskCheck" id="taskCheck">
                    <label for="taskcheck">${task.taskName}</label>`;

    

    const td2 =document.createElement("td");
    td2.textContent= `${task.description}`;
    
    const td3 =document.createElement("td");
    td3.textContent= `${task.priority}`;

    const deleteBtn= document.createElement("button");
    deleteBtn.textContent="x";
    deleteBtn.addEventListener("click", ()=>{
        deleteTask(task.id);
        renderTasks();
        renderFooter();
    });

    const td4 =document.createElement("td");
    td4.append(deleteBtn);
    
    
    


    

    row.append(td1,td2,td3,td4);
    
    taskrows?.append(row)
    }

}



function renderFooter(): void{

    if(footer) footer.innerHTML="";

    const coTodo =document.createElement("p");
    coTodo.textContent =`Your remaning todos: ${countTodo()}`
    
    const quote =document.createElement("p");
    quote.classList.add("quote")
    quote.textContent=`"You don't have to see the whole staircase, just take the first step." — Martin Luther King Jr.s`


    footer?.append(coTodo, quote);


}


createTask("Maila Mathias","low");
createTask("Uppdatera kostnadskalkyl","low");
createTask("simpleko","medium");
createTask("hey","low","säga hej till nån");



renderTasks();


