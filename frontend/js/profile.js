document.addEventListener('DOMContentLoaded', async function () {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: {
            'Authorization': ` Bearer ${token}`
        }
    });

    if (response.ok) {
        const user = await response.json();
        document.querySelector('input[name="first_name"]').value = user.first_name;
        document.querySelector('input[name="last_name"]').value = user.last_name;
        document.querySelector('input[name="gender"]').value = user.gender;
        document.querySelector('input[name="date_of_birth"]').value = user.date_of_birth;
        document.querySelector('input[name="email"]').value = user.email;
    } else {
        alert('Failed to load profile.');
        window.location.href = 'login.html';
    }
});

document.getElementById('editBtn').addEventListener('click', function () {
    document.querySelectorAll('input').forEach(input => input.disabled = false);
    document.getElementById('editBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'block';
});

document.getElementById('profileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const formData = new FormData(this);
    const plainFormData = Object.fromEntries(formData.entries());

    const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(plainFormData)
    });

    if (response.ok) {
        alert('Profile updated successfully!');
        window.location.reload();
    } else {
        alert('Failed to update profile. Please try again.');
    }
});

document.getElementById('deleteBtn').addEventListener('click', async function () {
    const token = localStorage.getItem('token');

    const response = await fetch('http://localhost:5000/api/profile', {
        method: 'DELETE',
        headers: {
            'Authorization': ` Bearer ${token}`
        }
    });

    if (response.ok) {
        alert('Account deleted successfully!');
        localStorage.removeItem('token');
        window.location.href = 'register.html';
    } else {
        alert('Failed to delete account. Please try again.');
    }
});

document.getElementById('logoutBtn').addEventListener('click', function () {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});