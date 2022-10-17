console.log("JavaScript loaded");

const inputFromUser = document.querySelector(".input-container input");

const actionButton = document.querySelectorAll(".buttons span");

const clearAllTask = document.querySelector(".clear-all");

const taskContainer = document.querySelector(".task-lists");

const addButton = document.querySelector(".button-container .button-class");



let isEditedTask = false;

// Getting the todo-list stored in local storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

// Total task count 
const totalTasks = document.querySelector(".total-task span");

actionButton.forEach(btn => {
    btn.addEventListener("click", () => {
    document.querySelector("span.all-button").classList.remove("all-button");
    btn.classList.add("all-button");
    showTodo(btn.id);
  });
});

function storeItems() {
  localStorage.setItem("todo-list", JSON.stringify(todos));
}

function showTodo(filter) {
  let li = "";
  if (todos) {
    todos.forEach((todo, id) => {
        let isCompleted = todo.status == "completed" ? "checked" : "";
     
        if (filter == todo.status || filter == "all") {
            li += ` <li class="task">
                    <label for="${id}">
                        <input class="select-task-checkbox" onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <span class="task-details">${todo.name}</span>
                    </label>
                    <span onclick="deleteTask(${id})">
                        <img src ="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" id="delete-icon" />   
                    </span>
                    
                    </li>
                `;
        }
    });
  }

  taskContainer.innerHTML =
    li ||
    `<span class="no-task-entered-title">You don't have any task here</span>`;
  countTasks();
}

showTodo("all");

function showMenu(selectedTask) {
  let taskMenu = selectedTask.parentElement.lastElementChild;
  taskMenu.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != selectedTask) {
      taskMenu.classList.remove("show");
    }
  });
}


// Delete individual task
function deleteTask(deleteId) {
  todos.splice(deleteId, 1);
  storeItems();
  showTodo("all");
}

// Delete all the task
clearAllTask.addEventListener("click", () => {
  todos.splice(0, todos.length);
  storeItems();
  showTodo("all");
});


// Updating the status of tasks
function updateStatus(selectedTask) {

  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "uncomplete";
  }
  storeItems();
}

inputFromUser.addEventListener("keyup", e => {
  let userTask = inputFromUser.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditedTask) {
      if (!todos) {
        todos = [];
      }
      let taskInfo = { name: userTask, status: "uncomplete" };
      todos.push(taskInfo);
    } else {
      isEditedTask = false;
    }

    inputFromUser.value = "";
    storeItems();
    showTodo("all");
  }
});

addButton.onclick = () => {
  let userTask = inputFromUser.value;
  let getLocalStorage = localStorage.getItem("todo-list");

  if (getLocalStorage == null) {
    todos = [];
  } else {
    todos = JSON.parse(getLocalStorage);
  }

  if (!isEditedTask) {
    if (!todos) {
      todos = [];
    }
    let taskInfo = { name: userTask, status: "uncomplete" };
    todos.push(taskInfo);
  } else {
    isEditedTask = false;
  }

  inputFromUser.value = "";
  storeItems();
  showTodo("all");
};

  

inputFromUser.onkeyup = () => {
  let userTask = inputFromUser.value;
  if (userTask.trim() != 0) {
    addButton.classList.add("all-button");
  } else {
    addButton.classList.remove("all-button");
  }
};

function countTasks() {
  let itemcount = document.querySelectorAll('input[type="checkbox"]').length;
  totalTasks.textContent = itemcount;

  const checkedTasks = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;

}
