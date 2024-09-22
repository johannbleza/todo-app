const inputTask = document.querySelector(".inputTask");
const inputTaskBtn = document.querySelector(".inputTaskBtn");
const taskList = document.querySelector(".task-list");
const form = document.querySelector(".input-container");

let tasks = [];
let newTask = "";

inputTask.addEventListener("keyup", (e) => {
  newTask = e.target.value;
});

inputTaskBtn.addEventListener("click", () => {
  if (newTask.length > 0) {
    tasks.push({ task: newTask, done: false });
    updateList();
    newTask = "";
    inputTask.value = "";
  }
});

const updateList = () => {
  let newTaskElement = document.createElement("li");
  newTaskElement.classList.add("task-container");
  newTaskElement.innerHTML = `<div class="task">
    <input type="checkbox" id="task" class="checkbox" name="task" />
    <label for="task" class="taskText">${newTask}</label>
    </div>
    <div class="remove">x</div>`;
  taskList.appendChild(newTaskElement);

  const checkbox = document.querySelector(".checkbox");
  const taskText = document.querySelector(".taskText");
  checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
      taskText.style.textDecoration = "line-through";
    } else {
      taskText.style.textDecoration = "none";
    }
  });
};
