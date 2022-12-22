import logo from './logo.svg';
import './App.css';
import Login from './features/login/views/LoginView';
import LoginViewModel from "./features/login/viewModels/LoginViewModel"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/views/HomeView';

function App() {
  return (
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<Login viewModel={new LoginViewModel()}/>}/> 
          <Route path='/home' element={<Home/>} />
        </Routes>
      
    </BrowserRouter>
  );
}

export default App;
