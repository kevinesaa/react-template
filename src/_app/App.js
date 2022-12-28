
import './App.css';
import Login from '../features/login/views/LoginView';
import LoginViewModel from "../features/login/viewModels/LoginViewModel"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from '../features/home/views/HomeView';

import MainMenu from '../_Resources/menu/mainMenu';



export default function App(props) {
  
  const location = useLocation();
  const currentPathIndex = MainMenu.findIndex(item => item.path == location.pathname);
  
  return (
   
    <>
      <Routes>
        <Route path="/login" element={<Login viewModel={new LoginViewModel()}/>}/> 
        
      </Routes>
      <Routes>
        
        <Route  path='/' element={<Home selectedItem = {currentPathIndex} menuItems = {MainMenu}/>} >
          
          {MainMenu.map( (item,index) => { return (<Route key={index} path={item.path} element={item.page} />) }) }
            
        </Route>
      </Routes>
    </>
  );
}
