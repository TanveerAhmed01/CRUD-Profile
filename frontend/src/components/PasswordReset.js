// PasswordReset.js
import React, { useState } from 'react';

const PasswordReset = ({ token, switchToLogin }) => {
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`http://localhost:5000/api/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newPassword }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('An error occurred while resetting the password.');
        }
    };

    return (
        <div className="password-reset-container">
            <form onSubmit={handleSubmit} className="password-reset-form">
                <h2>Reset Password</h2>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Reset Password</button>
                {message && <p>{message}</p>}
                <button type="button" onClick={switchToLogin} className="switch-button">
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default PasswordReset;
