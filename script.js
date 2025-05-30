const taskList = document.querySelector(".taskList");
const inputTask = document.querySelector(".inputTask");




// При нажатии энтер добовдляется задача и Проверка на пустой ввод
inputTask.addEventListener("keydown", (e)=>{
    if (e.key === "Enter" && inputTask.value != "") {
        e.preventDefault(); // недаем странице сделать перезагрузку 
        addTask(inputTask.value.trim());
        inputTask.value = "";
    }else{
        return
    }
});


//Шаблон задачи 
function addTask(taskText) {
  const taskHTML = `
    <li class = "task">
        <label>
            <span class = "circle">
            <img class="checkmark" src="img/tick.png" alt="check" />
            </span>
            <span class="form__container-text">${taskText}</span>
        </label>
        <button class = "cross-btn">
         <img class="cross" src="img/cross.png" alt="remove task" />
        </button>
    </li>
    `;
    
  taskList.insertAdjacentHTML("beforeend", taskHTML);
  //добовляет в конец задачу 
}

taskList.addEventListener('click', (e) =>{
    const deleteBtn = e.target.closest('.cross-btn');
    if (deleteBtn){
        deleteBtn.closest('li').remove();
    }
})
