// import React, { useState } from 'react';
// import '../styles/login.css';

// const Login = ({ setToken, switchToRegister }) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null); // Clear previous errors

//         try {
//             const response = await fetch('http://localhost:5000/api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setToken(data.token);
//             } else {
//                 setError(data.message);
//             }
//         } catch (error) {
//             setError('An unexpected error occurred.');
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit} className="login-form">
//                 <h2>Login</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 <div className="form-group">
//                     <label>Email</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Password</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="submit-button">Login</button>
//                 <p>
//                     Don't have an account?{' '}
//                     <button type="button" onClick={switchToRegister} className="switch-button">
//                         Register
//                     </button>
//                 </p>
//             </form>
//         </div>
//     );
// };

// export default Login;

// Login.js
import React, { useState } from 'react';
import '../styles/login.css';

const Login = ({ setToken, switchToRegister, switchToResetPasswordRequest }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Login</button>
                <p>
                    Don't have an account?{' '}
                    <button type="button" onClick={switchToRegister} className="switch-button">
                        Register
                    </button>
                </p>
                <p>
                    <button type="button" onClick={switchToResetPasswordRequest} className="switch-button">
                        Forgot Password?
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Login;
