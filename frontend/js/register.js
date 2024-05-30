document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page on success
    } else {
        alert('Registration failed. Please try again.');
    }
});
