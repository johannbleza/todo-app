const inputTask = document.querySelector(".inputTask");
const inputTaskBtn = document.querySelector(".inputTaskBtn");
const taskList = document.querySelector(".task-list");
const clear = document.querySelector(".clear");

let newTask = "";

inputTask.addEventListener("keyup", (e) => {
  newTask = e.target.value;
});

let savedList = JSON.parse(localStorage.getItem("saved list")) || [];
// Add Task
inputTaskBtn.addEventListener("click", () => {
  if (inputTask.value.length > 0) {
    savedList.push({ task: newTask, done: false });
    displayTask();
    inputTask.value = "";
  }
});

// Display Tasks
const displayTask = () => {
  taskList.innerHTML = "";
  savedList.forEach((item) => {
    let li = document.createElement("li");
    li.classList.add("task-container");
    li.innerHTML = `<div class="task">
        <input type="checkbox" id="task" class="checkbox" ${
          item.done ? "checked" : ""
        } name="task" />
        <label for="task" class="taskText">${item.task}</label>
        </div>
        <div class="remove">x</div>`;
    taskList.appendChild(li);

    let checkbox = li.children[0].children[0];
    let taskText = li.children[0].children[1];
    let remove = li.children[1];

    remove.addEventListener("click", () => removedFromList(taskText));

    // checkbox.checked = item.done ? true : false;
    taskText.style.textDecoration = item.done ? "line-through" : "";

    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
        item.done = true;
      } else {
        taskText.style.textDecoration = "";
        item.done = false;
      }
      updateLocalStorage();
    });
    updateLocalStorage();
  });

  if (savedList.length > 0) {
    clear.style.display = "flex";
  }
};

const removedFromList = (remove) => {
  savedList = savedList.filter((item) => item.task !== remove.innerHTML);
  updateLocalStorage();
  displayTask();

  if (savedList.length == 0) {
    clear.style.display = "none";
  }
};

function updateLocalStorage() {
  localStorage.setItem("saved list", JSON.stringify(savedList));
}

clear.addEventListener("click", () => {
  localStorage.removeItem("saved list");
  taskList.innerHTML = "";
  savedList = [];
  clear.style.display = "none";
});

displayTask();
