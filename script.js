const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks when the page loads
window.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const task = {
    text: taskText,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  taskInput.value = "";
}

// Render all tasks
function loadTasks() {
  taskList.innerHTML = "";
  tasks.forEach(renderTask);
}

// Render single task
function renderTask(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  if (task.completed) {
    li.classList.add("completed");
  }

  // Toggle completion
  li.addEventListener("click", () => {
    task.completed = !task.completed;
    li.classList.toggle("completed");
    saveTasks();
  });

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    tasks = tasks.filter((t) => t !== task);
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
