const taskList = document.querySelector(".taskList");
const inputTask = document.querySelector(".inputTask");
const clearButton = document.querySelector(".clearButton"); // Переименовано для ясности
const countingTask = document.querySelector(".countingTask");
const logo = document.querySelector(".logo");
const activeButton = document.querySelector(".activeButton");



// Добавление задачи
// Добавление задачи
inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Всегда предотвращаем стандартное поведение
      
      if (inputTask.value.trim() !== "") {
        addTask(inputTask.value.trim());
        updateTaskCount();
        inputTask.value = "";
      }
      // Если поле пустое - просто ничего не делаем
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
    const completedTasks = document.querySelectorAll(".task.checked"); 
  completedTasks.forEach((task) => {
    task.remove();
    updateTaskCount();
  });
});


function updateTaskCount() {
    const tasks = document.querySelectorAll(".task")
    countingTask.textContent = tasks.length;
}


activeButton.addEventListener("click", () => {
  // Получаем все задачи
  const allTasks = document.querySelectorAll(".task");

  allTasks.forEach((task) => {
    if (task.classList.contains("checked")) {
      // Скрываем выполненные задачи
      task.style.display = "none";
    } else {
      // Показываем активные задачи
      task.style.display = "flex"; // Или "block", в зависимости от вашего CSS
    }
  });
});


document.querySelector(".allButton").addEventListener("click", () => {
  document.querySelectorAll(".task").forEach((task) => {
    task.style.display = "flex"; // Показываем все задачи
  });
});

document.querySelector(".completedButton").addEventListener("click", () => {
  document.querySelectorAll(".task").forEach((task) => {
    task.style.display = task.classList.contains("checked") ? "flex" : "none";
  });
});