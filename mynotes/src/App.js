
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';




import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './contex/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

 function App() {
  return (
   
      <BrowserRouter>
     <div>
      <NoteState>
      <div style={{ }} className='h-auto' >
      <Navbar/>
      </div>
     
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home/>}/> 
          <Route exact path="/about" element={<About/>}/> 
          <Route exact path="/login" element={<Login/>}/> 
          <Route exact path="/signup" element={<Signup/>}/> 
        </Routes>
        </div>
      </NoteState>
      
      </div>
      </BrowserRouter>
   

  );
}

export default App;
