import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Updateuser from './Components/editemp';
import Adduser from './Components/addemp';
import Userlisting from './Components/emplist';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import Store from './Redux/store';
import Reg from './Components/signup';

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <BrowserRouter>
      {/* <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"Teal",fontFamily:"serif"}}>
  <a class="navbar-brand" href="/">HOME</a>
  <a class="navbar-brand" href="/user">EMPLOYEE</a>
  <a class="navbar-brand" href="/user/add">ADD</a>
  <a class="navbar-brand" href="/user/edit/:code">EDIT</a>
  </nav> */}
        {/* <div className='header'> */}
        {/* <nav class="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"Teal",fontFamily:"serif",fontSize:"25px"}}>
          <Link to={'/'} style={{marginLeft:"100px"}}>Home</Link>
          &nbsp;
          <Link to={'/user'}>Employees</Link>
          &nbsp;
          <Link to={'/user/add'}>AddEmployee</Link>
          &nbsp;
          <Link to={'/'}>Logout</Link>
          &nbsp;
          </nav> */}
        {/* </div> */}
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/signup' element={<Reg></Reg>}></Route>
          <Route path='/user' element={<Userlisting></Userlisting>}></Route>
          <Route path='/user/add' element={<Adduser></Adduser>}></Route>
          <Route path='/user/edit/:code' element={<Updateuser></Updateuser>}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer className="toast-position"
        position="bottom-right"></ToastContainer>
        
    </div>
    </Provider>
    
  );
}

export default App;
