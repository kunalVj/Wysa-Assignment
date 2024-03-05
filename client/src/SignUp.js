import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSignUp = async () => {
        try {
            // Call your signup API with username, email, password, and API token
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            // Handle response
            const data = await response.json();
            console.log(data);

            if (response.ok) {
                // If signup is successful, set isSuccess to true
                setIsSuccess(true);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (isSuccess) {
        // If signup is successful, redirect to the login page
        window.location.href = '/';
    }

    return (
        <div className="signup-container">
            <div className="form-box">
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={handleSignUp}>Sign Up</button>
            </div>
        </div>
    );
};

export default SignUp;
