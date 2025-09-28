let tasks = [
  { id: 1, description: "Hacer desafío", completed: false },
  { id: 2, description: "Hacer ejercicio", completed: false },
  { id: 3, description: "Preparar almuerzo", completed: true },
];

const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");
const pendingTasksElement = document.getElementById("pending-tasks");

function generateId() {
  return tasks.length > 0 ? Math.max(...tasks.map((task) => task.id)) + 1 : 1;
}

function addTask() {
  const description = taskInput.value.trim();

  if (description === "") {
    alert("Por favor, ingresa una tarea");
    return;
  }

  const newTask = {
    id: generateId(),
    description: description,
    completed: false,
  };

  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
  updateSummary();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
  updateSummary();
}

function toggleTaskStatus(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
  updateSummary();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

    taskItem.innerHTML = `
        <span class="task-text ${task.completed ? "completed" : ""}">${task.description}</span>
         <div class="task-actions">
            <button class="complete-btn" onclick="toggleTaskStatus(${task.id})">${task.completed ? "Pendiente" : "Completar"}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
        </div>`;
    taskList.appendChild(taskItem);
  });
}

function updateSummary() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  totalTasksElement.textContent = totalTasks;
  completedTasksElement.textContent = completedTasks;
  pendingTasksElement.textContent = pendingTasks;
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
updateSummary();