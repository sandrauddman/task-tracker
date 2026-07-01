import { getTaskList,deleteTask,countTodo} from "./task.js";


/* get table body and footer elems*/ 
const taskrows = document.querySelector("tbody");
const footer= document.querySelector("footer");



export function renderTasks() : void{

    if(taskrows) taskrows.innerHTML="";

    for(const task of getTaskList()){

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



export function renderFooter(): void{

    if(footer) footer.innerHTML="";

    const coTodo =document.createElement("p");
    coTodo.textContent =`Your remaning todos: ${countTodo()}`
    
    const quote =document.createElement("p");
    quote.classList.add("quote")
    quote.textContent=`"You don't have to see the whole staircase, just take the first step." — Martin Luther King Jr.s`


    footer?.append(coTodo, quote);


}
