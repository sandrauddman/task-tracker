
/******** Variables and interfaces ********/

interface Task{

id: number;
taskName: string;
priority: "Low"|"Medium"|"High";
completed: boolean;
description? : string;

toggle():void;

}


type TaskPriority="Low"|"Medium"|"High"
let taskList: Task[]=[];
let nextId: number=1;




/******** functions ********/ 

const getTaskList= () : Task[]=> taskList;

const getTask =(id : number): Task => taskList.filter((task)=>task.id=id)[0]!;

const deleteTask=(id: number): Task[] => taskList= taskList.filter((task)=>task.id!=id);

function createTask (name: string, prio :"Low"|"Medium"|"High", desc:string =""):void{

  let newTask: Task={
    id:nextId,
    taskName:name,
    priority: prio,
    completed:false,
    description: desc,

    toggle() {
        console.log(this.completed);
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
const errorInput=document.querySelector(".error") as HTMLParagraphElement;
//const addButton= document.querySelector(".addButton") as HTMLButtonElement;
const form =document.querySelector(".form-group") as HTMLFormElement;



//addButton.addEventListener("click", addTask);
form.addEventListener("submit",handleSubmit);







function addTask(){

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
    for(const task of taskList){
        if(task.taskName.toLowerCase()===name.toLowerCase()) return "Task arlready exists!"
    }
    return "";

}

function clearEntry (): void {
    taskNameInput.value="";
    descriptionInput.value="";
    priorityInput.selectedIndex=0;

}



function renderTasks() : void{

    if(taskrows) taskrows.innerHTML="";

    for(const task of taskList){

    const row =document.createElement("tr");

    const td1 =document.createElement("td");
    td1.classList.add("task");

    if(task.priority ==="High"){
        td1.classList.add("high-priority");
    }

    

    const checkboxInput= document.createElement("input");
    checkboxInput.id="taskCheck";
    checkboxInput.name="taskCheck";
    checkboxInput.type="checkbox";
    if(task.completed) checkboxInput.checked=true;
    
    const label = document.createElement("label");
    label.htmlFor="taskCheck";
    label.textContent=`${task.taskName}`
    td1.append(checkboxInput,label);
   

                  
    checkboxInput.addEventListener("change", ()=>{
       task.toggle();
       renderFooter();
    });

 

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


createTask("Maila Mathias","Low");
createTask("Uppdatera kostnadskalkyl","Low");
createTask("simpleko","Medium");
createTask("hey","High","säga hej till nån");



renderTasks();
renderFooter();


