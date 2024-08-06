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
import PrivateRoute from "./pages/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EventShow from "./pages/EventShow.jsx";
import TeamRegistration from "./pages/TeamRegistration.jsx";
function App() {
  const [count, setCount] = useState(0);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <>
      <div className=" h-screen relative">
        {/* <Navbar className="" /> */}
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events/:eventId" element={<EventShow />} />
          </Route>
          <Route
            path="/registration/:eventId"
            element={<TeamRegistration setShowNavbar={setShowNavbar} />}
          />
        </Routes>
        {/* <Landing /> */}
      </div>
    </>
  );
}

export default App;
