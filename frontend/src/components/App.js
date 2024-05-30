// import React, { useState } from 'react';
// import Login from './Login';
// import Register from './Register';
// import Profile from './Profile';

// const App = () => {
//     const [token, setToken] = useState(localStorage.getItem('token'));
//     const [isLogin, setIsLogin] = useState(true);

//     const handleSetToken = (token) => {
//         if (token) {
//             localStorage.setItem('token', token);
//         } else {
//             localStorage.removeItem('token');
//         }
//         setToken(token);
//     };

//     return (
//         <div>
//             {!token ? (
//                 isLogin ? (
//                     <Login setToken={handleSetToken} switchToRegister={() => setIsLogin(false)} />
//                 ) : (
//                     <Register switchToLogin={() => setIsLogin(true)} />
//                 )
//             ) : (
//                 <Profile token={token} setToken={handleSetToken} />
//             )}
//         </div>
//     );
// };

// export default App;

import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import PasswordResetRequest from './PasswordResetRequest';
import PasswordReset from './PasswordReset';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [view, setView] = useState('login'); // possible values: 'login', 'register', 'passwordResetRequest', 'passwordReset'
    const [resetToken, setResetToken] = useState(null);

    const handleSetToken = (token) => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
        setToken(token);
    };

    const switchToView = (view, resetToken = null) => {
        setView(view);
        setResetToken(resetToken);
    };

    return (
        <div>
            {!token ? (
                view === 'login' ? (
                    <Login 
                        setToken={handleSetToken} 
                        switchToRegister={() => switchToView('register')} 
                        switchToResetPasswordRequest={() => switchToView('passwordResetRequest')}
                    />
                ) : view === 'register' ? (
                    <Register switchToLogin={() => switchToView('login')} />
                ) : view === 'passwordResetRequest' ? (
                    <PasswordResetRequest switchToLogin={() => switchToView('login')} />
                ) : view === 'passwordReset' ? (
                    <PasswordReset token={resetToken} switchToLogin={() => switchToView('login')} />
                ) : null
            ) : (
                <Profile token={token} setToken={handleSetToken} />
            )}
        </div>
    );
};

export default App;
