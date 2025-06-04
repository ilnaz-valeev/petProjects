const taskList = document.querySelector(".taskList");
const inputTask = document.querySelector(".inputTask");
const clearButton = document.querySelector(".clearButton"); // Переименовано для ясности
const countingTask = document.querySelector(".countingTask");
const logo = document.querySelector(".logo");

// Добавление задачи
inputTask.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTask.value.trim() !== "") {
    e.preventDefault();
    addTask(inputTask.value.trim());
    updateTaskCount();
    inputTask.value = "";
  }
});

function addTask(taskText) {
  const taskHTML = `
    <li class="task">
        <label>
            <span class="circle">
                <img class="checkmark" src="img/tick.png" alt="check">
            </span>
            <span class="form__container-text">${taskText}</span>
        </label>
        <button class="cross-btn">
            <img class="cross" src="img/cross.png" alt="remove task">
        </button>
    </li>`;
  taskList.insertAdjacentHTML("beforeend", taskHTML);
}


// Удаление задач
taskList.addEventListener("click", (e) => {
  const deleteBtn = e.target.closest(".cross-btn");
  if (deleteBtn) {
    deleteBtn.closest("li").remove();
    updateTaskCount();
    return;
  }

  const circle = e.target.closest(".circle");
  if (circle) {
    const taskItem = circle.closest("li");
    taskItem.classList.toggle("checked");
    circle.classList.toggle("checked");
  }
});

// Очистка выполненных задач 
clearButton.addEventListener("click", () => {
  const completedTasks = document.querySelectorAll(".task.checked"); // Правильное имя
  completedTasks.forEach((task) => {
    task.remove();
    updateTaskCount();
  });
});


function updateTaskCount() {
    const tasks = document.querySelectorAll(".task")
    countingTask.textContent = tasks.length;
}


logo.addEventListener("click",(e)=>{
    
    if (logo == ligth) {
      body = ligth;
    } else {
      body = dark;
    }
});