import React from "react";
import {BrowserRouter as Router , Routes, Route}from "react-router-dom"
import Home from "./pages/home";
import AuthPage from "./pages/auth"

const App = ()=>{
    return (
        <Router>
            <Routes>
                <Route path = "/" element = {<Home />} />
                <Route path = "/auth" element = {<AuthPage />} />
            </Routes>
        </Router>
    )
}

export default App;