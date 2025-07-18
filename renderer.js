window.addEventListener('DOMContentLoaded', async () => {
    const username = await window.api.getUsername();
    const userNameHolder = document.getElementById('user-name');
    userNameHolder.textContent = username;
    const taskList = document.getElementById('task-list')


    // const todayTasks = await window.api.getTodayTask();
    window.api.getTodayTask().then(tasks => {
        if (tasks.error) {
            console.error('Błąd:', tasks.error);
        } else {
            const taskWrapper = document.getElementById('task-list');
            const taskTemplate = document.getElementById('task-template');
            tasks.forEach( task => {
                const clone = taskTemplate.content.cloneNode(true);
                clone.querySelector('.task-item__text').textContent = task.title;
                clone.querySelector('.task-item__time').textContent = task.time;
                // taskWrapper.appendChild(clone);
                taskWrapper.insertBefore(clone, taskWrapper.firstChild);
            });
        }
    });

    taskList.addEventListener("click", (event) => {
        console.log(event.target);
        // if(event.target.tagName === 'BUTTON') {
        //     console.log(event.target);
        // }
    })
});

document.getElementById('add-task-submit').addEventListener('click', async () => {
    const taskWrapper = document.getElementById('task-list');
    const taskTemplate = document.getElementById('task-template');
    const title = document.getElementById('add-task-input').value;
    const add = await window.api.addTask( title );
    const clone = taskTemplate.content.cloneNode(true);
    clone.querySelector('.task-item__text').textContent = title;
    clone.querySelector('.task-item__time').textContent = '00:00:00';
    // taskWrapper.appendChild(clone);
    taskWrapper.insertBefore(clone, taskWrapper.firstChild);
});