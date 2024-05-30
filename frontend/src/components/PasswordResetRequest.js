// PasswordResetRequest.js
import React, { useState } from 'react';

const PasswordResetRequest = ({ switchToLogin }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('An error occurred while requesting the password reset.');
        }
    };

    return (
        <div className="password-reset-request-container">
            <form onSubmit={handleSubmit} className="password-reset-request-form">
                <h2>Reset Password</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Send Reset Link</button>
                {message && <p>{message}</p>}
                <button type="button" onClick={switchToLogin} className="switch-button">
                    Back to Login
                </button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;
