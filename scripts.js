const newTaskBar = document.querySelector(".newTaskBar");
const addTaskBtn = document.querySelector(".addTask");
const tasks = document.querySelector(".tasks");
const deleteBtn = document.querySelector(".delete");

const sumir = function () {
  newTaskBar.setAttribute("placeholder", "Tarefa a ser feita...");
  newTaskBar.classList.remove("error");
};

const addTaskItem = function () {
  let newTask = document.createElement("div");
  let task1 = document.createElement("div");
  task1.classList.add("task1");
  newTask.classList.add("taskItem");
  const task = document.createElement("p");

  task.innerText = newTaskBar.value;

  const deleteItem = document.createElement("img");
  const concludeItem = document.createElement("img");
  concludeItem.classList.add("concludes");
  deleteItem.classList.add("delete");
  concludeItem.addEventListener("click", () => {
    if (!task.textContent.includes("✓")) {
      task.classList.add("complete");
      task.innerText += "  ✓";
      task.classList.add("yesTask");
    } else if (task.textContent.includes("✓")) {
      task.classList.remove("complete");
      task.innerText = task.textContent.slice(0, -3);
      task.classList.remove("yesTask");
    }
  });
  deleteItem.addEventListener("click", () => {
    newTask.remove();
  });
  concludeItem.setAttribute(
    "src",
    "./assets/streamline-icon-task-checklist-check@48x48.png"
  );
  deleteItem.setAttribute(
    "src",
    "./assets/streamline-icon-recycling-trash-bin@48x48.png"
  );

  newTask.appendChild(task);
  task1.appendChild(deleteItem);
  task1.appendChild(concludeItem);

  newTask.appendChild(task1);
  tasks.style.cssText = `display:inline-block;`;
  tasks.appendChild(newTask);
  newTaskBar.value = "";
  updateLS();
};

const validateInput = function () {
  if (newTaskBar.value.trim() == "") {
    newTaskBar.value = "";
    newTaskBar.classList.add("error");
    newTaskBar.setAttribute("placeholder", "Tarefa vazia!");
    setTimeout(sumir, 3000);
  } else {
    addTaskItem();
  }
};
const buttonHandler = function (event) {
  event.preventDefault();
};
const updateLS = function () {
  const tasks3 = tasks.childNodes;
  console.log(tasks3);
  const localLS = [...tasks3].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("complete");
    return { description: content.innerText, isCompleted };
  });
  localStorage.setItem("tasks4", JSON.stringify(localLS));
};

const refresh = function () {
  const tasksFromLS = JSON.parse(localStorage.getItem("tasks4"));
  for (let task5 of tasksFromLS) {
    let newTask = document.createElement("div");
    let task1 = document.createElement("div");
    task1.classList.add("task1");
    newTask.classList.add("taskItem");
    const task = document.createElement("p");

    task.innerText = task5.description;
    if (task5.isCompleted) {
      task.classList.add("complete");
    }

    const deleteItem = document.createElement("img");
    const concludeItem = document.createElement("img");
    concludeItem.classList.add("concludes");
    deleteItem.classList.add("delete");
    concludeItem.addEventListener("click", () => {
      if (!task.textContent.includes("✓")) {
        task.classList.add("complete");
        task.innerText += "  ✓";
        task.classList.add("yesTask");
        updateLS();
      } else if (task.textContent.includes("✓")) {
        task.classList.remove("complete");
        task.innerText = task.textContent.slice(0, -2);
        task.classList.remove("yesTask");
        updateLS();
      }
    });
    deleteItem.addEventListener("click", () => {
      newTask.remove();
      updateLS();
    });
    concludeItem.setAttribute(
      "src",
      "./assets/streamline-icon-task-checklist-check@48x48.png"
    );
    deleteItem.setAttribute(
      "src",
      "./assets/streamline-icon-recycling-trash-bin@48x48.png"
    );

    newTask.appendChild(task);
    task1.appendChild(deleteItem);
    task1.appendChild(concludeItem);

    newTask.appendChild(task1);
    tasks.style.cssText = `display:inline-block;`;
    tasks.appendChild(newTask);
    newTaskBar.value = "";
  }
};
refresh();
addTaskBtn.addEventListener("click", buttonHandler);
addTaskBtn.addEventListener("click", validateInput);
