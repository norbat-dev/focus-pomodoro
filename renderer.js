window.addEventListener('DOMContentLoaded', async () => {
    const username = await window.api.getUsername();
    const userNameHolder = document.getElementById('user-name');
    userNameHolder.textContent = username;
});

document.getElementById('add-task-submit').addEventListener('click', async () => {
    const title = document.getElementById('add-task-input').value;
    const add = await window.api.addTask( title );
});