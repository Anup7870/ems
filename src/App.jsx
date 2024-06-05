import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useSelector, useDispatch } from "react-redux";
function App() {
   const [count, setCount] = useState(0);
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch();
   console.log(user);
   return (
      <>
         <div className=' h-screen'>
            <Navbar />
            <Routes>
               <Route path='/' element={<Landing />} />
               <Route path='/login' element={<Login />} />
               <Route path='/register' element={<Signup />} />
            </Routes>
            {/* <Landing /> */}
         </div>
      </>
   );
}

export default App;
