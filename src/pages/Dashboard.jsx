import React, { useEffect } from "react";
import CreateEvent from "../components/CreateEvent";
import { useSelector } from "react-redux";
import Event from "../components/Event.jsx";
import { Divider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
   const { user } = useSelector((state) => state.user);
   const navigate = useNavigate();
   useEffect(() => {
      navigate("/dashboard?event=all");
   }, []);
   return (
      <div className='px-8 w-full pt-2 mt-20'>
         <h1 className=' font-bold text-2xl md:text-4xl'>
            Welcome Back <span className='text-blue'>{user.firstName}</span>
         </h1>
         <CreateEvent />
         <Divider className='mt-2' />
         <Event />
      </div>
   );
}
