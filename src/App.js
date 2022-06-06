import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { setToken } from './Components/token';

// Components
import Navbar from './Components/Navbar';

// Routes
import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Forumpage from './Pages/Forumpage';
import Dashboard from './Pages/Dashboard';
import ErrorPage from './Pages/ErrorPage';

// Context
import { LoginCtx } from './Contexts/LoginContext';


function App() {
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        const refreshToken = async () => {
            const url = "http://localhost:5000/api/v1/auth/refresh-token";
            const options = { 
                method: "POST",
                mode:"cors",
                credentials:"include",
            };
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            
            if(response.status === 200){
                setToken(result.token);
                setUser(result.user);
            };
        };
        refreshToken();
    }, [])
    
    return (
        <LoginCtx.Provider value={{ user, setUser }}>
            <BrowserRouter>
              <Navbar/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="login" element={<Login/>}/>
                  <Route path="signup" element={<Signup/>}/>
                  <Route path="forums/:slug" element={<Forumpage/>}/>
                    // TODO: Check if user is authenticated
                  <Route path="dashboard" element={<Dashboard/>}/>
                  <Route path="*" element={<ErrorPage/>}/>
              </Routes>
           </BrowserRouter>
        </LoginCtx.Provider>
  );
}

export default App;
