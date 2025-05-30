let tasks = [];

document.addEventListener('keydown', (e)=> {

    // console.log(event.key)
    if (e.key === "Enter") {
        e.preventDefault()
        const newObj = {
            id: Date.now(),
            text: inputTask.value,
            status: false
        }
        tasks.push(newObj)
        inputTask.value = ''
        renderTasks ()
        console.log(tasks)
    }
})

function renderTasks () {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        console.log(123)
        const cloneTask = tempalteTask.cloneNode(true)
        cloneTask.querySelector('.form__container-text').textContent = tasks[i].text
        const checkbox = cloneTask.querySelector('.circle')
        checkbox.addEventListener('click', ()=> {
            checkbox.checked = !tasks[i].status
        })
        taskList.prepend(cloneTask)
    }
}


renderTasks();

