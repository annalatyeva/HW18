let taskList;
window.onload = function() {
    taskList = window.localStorage.getItem('taskList');
    if (taskList && taskList != '' && taskList != '[]') {
        taskList = JSON.parse(taskList);
        document.querySelector('.task-container').innerText = '';
        showTasks(taskList);
    }
}

function addTask () {
    let errorDivCheck = document.querySelector('.error-div');
    if (errorDivCheck) {
        errorDivCheck.remove();
    }

    let task = document.querySelector('.task-input').value.trim();
    taskList = window.localStorage.getItem('taskList');
    taskList = taskList ? JSON.parse(taskList) : [];
    let errorDiv = document.createElement('div');
    errorDiv.innerText = 'Введите задачу!';
    errorDiv.className = 'error-div';
    if (task != '') {
        taskList.push(task);
    }
    else {
        document.forms[0].append(errorDiv);
    }

    document.querySelector('.task-container').innerText = '';
if (taskList && taskList != '' && taskList != '[]') {
    showTasks(taskList);
}}

document.querySelector('.add-task').addEventListener('click', addTask);

document.querySelector('input').addEventListener('keydown', function(e) {
    if (e.keyCode === 13) {
        addTask();
    }
});


function clearTasks () {
    window.localStorage.removeItem('taskList');
    document.querySelector('.task-container').innerText = '';
    let noTask = document.querySelector('.no-task');
    noTask.style.display = 'block';
    document.querySelector('.clear-task').disabled = true;
}

document.querySelector('.clear-task').addEventListener('click', clearTasks);

function showTasks (taskList) {
    for (let i = 0; i < taskList.length; i++) {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task-div';
        taskDiv.innerHTML = `<input type="checkbox" class="checkbox" id="task${i+1}" name="task${i+1}"/>
        <label for="task${i+1}"><span>${i+1}. ${taskList[i]}</span></label>`;
        document.querySelector('.task-container').append(taskDiv);
    }
    let noTask = document.querySelector('.no-task');
    noTask.style.display = 'none';
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
    document.querySelector('.task-input').value = '';
    document.querySelector('.clear-task').disabled = false;
}