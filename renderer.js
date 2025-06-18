window.addEventListener('DOMContentLoaded', async () => {
    const username = await window.api.getUsername();
    const userNameHolder = document.getElementById('user-name');
    userNameHolder.textContent = username;
});