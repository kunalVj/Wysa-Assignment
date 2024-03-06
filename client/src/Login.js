import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const RenderSignup = ()=> {
        window.location.href = '/signup'
    }
    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        try {
            // Call your login API with username, password, and API token
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                setError('Invalid username or password');
                return;
            }

            // Reset error state if login is successful
            setError('');

            // Handle response
            const data = await response.json();
            if (data.ok) {
                // Redirect to home page upon successful login
                window.location.href = '/chat';
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while logging in');
        }
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setError('');
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setError('');
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <img src="https://blogs.wysa.io/wp-content/uploads/2019/12/logo.png" alt="Logo" className="login-logo" />
            <div className="form-box">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div>
                    <input
                        type="checkbox"
                        id="showPassword"
                        checked={showPassword}
                        onChange={toggleShowPassword}
                    />
                    <label htmlFor="showPassword">Show Password</label>
                </div>
                <button onClick={handleLogin}>Login</button>
            </div>
            <button onClick ={RenderSignup}>Signup</button>
        </div>
    );
};

export default Login;




















// import React, { useState } from 'react';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');

//     const handleLogin = async () => {
//         if (!username || !password) {
//             setError('Please enter both username and password');
//             return;
//         }

//         try {
//             // Call your login API with username, password, and API token
//             const response = await fetch('http://localhost:8080/api/auth/signin', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ username, password })
//             });

//             if (!response.ok) {
//                 setError('Invalid username or password');
//                 return;
//             }

//             // Reset error state if login is successful
//             setError('');

//             // Handle response
//             const data = await response.json();
//             console.log(data);
//             if (data.ok) {
//                 // Redirect to home page upon successful login
//                 window.location.href = '/chat'; // or any other desired path
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setError('An error occurred while logging in');
//         }
//     };

//     const handleUsernameChange = (event) => {
//         setUsername(event.target.value);
//         setError('');
//     };

//     const handlePasswordChange = (event) => {
//         setPassword(event.target.value);
//         setError('');
//     };

//     const toggleShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     return (
//         <div className="login-container">

//             <img src="https://blogs.wysa.io/wp-content/uploads/2019/12/logo.png" alt="Logo" className="login-logo" />
//             <div className="form-box">
                
//                 {error && <p className="error-message">{error}</p>}
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={handleUsernameChange}
//                 />
//                 <input
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                 />
//                 <div>
//                     <input
//                         type="checkbox"
//                         id="showPassword"
//                         checked={showPassword}
//                         onChange={toggleShowPassword}
//                     />
//                     <label htmlFor="showPassword">Show Password</label>
//                 </div>
//                 <button onClick={handleLogin}>Login</button>
//             </div>
//         </div>
//     );
// };

// export default Login;
