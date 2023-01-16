
import './App.css';
import Login from '../features/login/views/LoginView';
import LoginViewModel from "../features/login/viewModels/LoginViewModel"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../features/home/views/HomeView';

import MainMenu from '../_Resources/menu/mainMenu';
import { SessionProvider } from '../sessionManager/views/SessionContext';
import SessionViewModel from '../sessionManager/viewModels/SessionViewModel'


export default function App(props) {
  
  const location = window.location;
  const currentPathIndex = MainMenu.findIndex(item => item.path === location.pathname);
  
  return (
   
    <BrowserRouter>
      <SessionProvider currentPath={location.pathname} viewModel={new SessionViewModel()}>
        <Routes>
          <Route path="/login" element={<Login viewModel={new LoginViewModel()}/>}/> 
          
        </Routes>
        <Routes>
          
          <Route  path='/app' element={<Home selectedItem = {currentPathIndex} menuItems = {MainMenu}/>} >
            
            {MainMenu.map( (item,index) => { return (<Route key={index} path={item.path} element={item.page} />) }) }
              
          </Route>
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  );
}
