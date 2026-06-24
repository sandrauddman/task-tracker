
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

function createTask (name: string, prio : "low"|"medium"|"high", desc:string =""):void{
  let task: Task={
    taskName:name,
    priority: prio,
    completed:false,
    description: desc,

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

const countTodo=():number=>{
    let result:number =0;
    for(const task of taskList){
        if(!task.completed) result++;
    }
    return result;
    
}




/******** Console testdata ********/


//const task1: Task ={taskName:"Lära mig TS", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
//const task2: Task ={taskName:"Tvätta", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
//const task3: Task ={taskName:"Diska", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
//const task4: Task ={taskName:"Slänga soppor", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
//const task5: Task ={taskName:"Tömma brevlådan", priority:"low",completed:false, toggle(){ return this.completed=!this.completed;}};
//const task6: Task ={taskName:"Handla", priority:"low",completed:false,description:"tofu och spenat", toggle(){ return this.completed=!this.completed;} };


//const tasks: Task[] =[task1,task2,task3,task4,task5,task6];



//printHeader();
//printTodo();
//printCompleted();

/******** Print console functions ********/


/**function printHeader() :void{


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
}**/


/************ Render table  and footer***********/

const taskrows = document.querySelector("tbody");

const footer= document.querySelector("footer");



function renderTasks() : void{

    if(taskrows) taskrows.innerHTML="";

    for(const task of taskList){

    const row =document.createElement("tr");

    const td1 =document.createElement("td");
    td1.classList.add("task")
    td1.innerHTML= `<input type="checkbox" name="taskName" id="taskName">
                            <label for="taskName">${task.taskName}</label>`;
    const td2 =document.createElement("td");
    td2.textContent= `${task.description}`;
    
    const td3 =document.createElement("td");
    td3.textContent= `${task.priority}`;

    const td4 =document.createElement("td");
    td4.innerHTML= `<button type="submit">x</button>`;



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
createTask("Damma","low");


renderTasks();
renderFooter();


