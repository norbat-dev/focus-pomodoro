window.addEventListener('DOMContentLoaded', async () => {
    const username = await window.api.getUsername();
    const userNameHolder = document.getElementById('user-name');
    userNameHolder.textContent = username;


    // const todayTasks = await window.api.getTodayTask();
    window.api.getTodayTask().then(tasks => {
        if (tasks.error) {
            console.error('Błąd:', tasks.error);
        } else {
            let taskWrapper = document.getElementById('task-list');
            let taskTemplate = document.getElementById('task-template');
            tasks.forEach( task => {
                const clone = taskTemplate.content.cloneNode(true);
                clone.querySelector('.task-item__text').textContent = task.title;
                clone.querySelector('.task-item__time').textContent = task.time;
                taskWrapper.appendChild(clone);
            });
        }
    });

});

document.getElementById('add-task-submit').addEventListener('click', async () => {
    const title = document.getElementById('add-task-input').value;
    const add = await window.api.addTask( title );
});