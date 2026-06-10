document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const btn = document.getElementById('login-btn');

    // Show loading state
    btn.textContent = 'Logging in...';
    btn.disabled = true;
    errorMsg.textContent = '';

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('crm_token', data.token);
            window.location.href = '/dashboard.html';
        } else {
            errorMsg.textContent = data.message || 'Login failed. Please try again.';
        }
    } catch (err) {
        errorMsg.textContent = 'Connection error. Is the server running?';
    } finally {
        btn.textContent = 'Login';
        btn.disabled = false;
    }
});