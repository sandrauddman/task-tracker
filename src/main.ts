import { renderFooter,renderTasks } from "./render.js";
import { loadTasks } from "./storage.js";


loadTasks();
renderTasks();
renderFooter();


