import { useContext, useState } from "react";
import axios from 'axios';
import {UserContext} from './UserContext.jsx';

export default function RegisterandLoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
    const {setUsername: setLoggedInUsername, setId} = useContext(UserContext);

    async function register(ev) {
        ev.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const {data} = await axios.post(url, {username, password});
        setLoggedInUsername(username);
        setId(data.id);
    }

    return (
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto mb-12" onSubmit={register}>
                <input value={username} 
                    onChange={ev => setUsername(ev.target.value)} 
                    type="text" 
                    placeholder="username" 
                    className="block w-full p-2 mb-2 rounded-2xl border"/>
                <input value={password} 
                    onChange={ev => setPassword(ev.target.value)} 
                    type="password" 
                    placeholder="password" 
                    className="block w-full p-2 mb-2 rounded-2xl border" />
                <button className="bg-blue-500 text-white block w-full rounded-2xl p-2">
                 {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                <div className="text-center mt-2">
                {isLoginOrRegister === 'register' && (
                    <div>
                        Already a memeber?
                        <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>Login here
                        </button>
                    </div>
                )}
                {isLoginOrRegister === 'login' && (
                    <div>
                        Don't have an account?
                        <button onClick={() => setIsLoginOrRegister('register')}>Register
                        </button>
                    </div>
                )}
                </div>
            </form>
        </div>
    );
}