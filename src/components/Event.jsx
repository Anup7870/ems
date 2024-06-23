import React, { useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { NavigationType, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import Ongoing from "../pages/Ongoing.jsx";
import Past from "../pages/Past.jsx";
import { useNavigate } from "react-router-dom";
import AllEvent from "../pages/AllEvent.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
   apiCalling,
   apiFailure,
   apiSucessfull,
} from "../redux/slice/eventsSlice.js";
export default function Event() {
   const [searchParams] = useSearchParams();
   const event = searchParams.get("event");
   const navigate = useNavigate();
   const [events, setEvents] = useState([]);
   const [change, setChange] = useState(false);
   useEffect(() => {
      const api = async () => {
         const data = await axios.get("http://localhost:3000/event/get", {
            headers: {
               access_token: Cookies.get("access_token"),
               "Access-Control-Allow-Credentials": true,
            },
         });
         setEvents(data.data.events);
      };
      // console.log("api called");

      api();
   }, [change]);
   return (
      <div className='w-full overflow-auto'>
         <Tabs variant='enclosed' colorScheme='green'>
            <TabList>
               <Tab
                  onClick={() => {
                     searchParams.set("event", "all");
                     // seting the url
                     navigate("/dashboard?event=all");
                     setChange(!change);
                  }}>
                  All
               </Tab>
               <Tab
                  onClick={() => {
                     searchParams.set("event", "ongoing");
                     // seting the url
                     navigate("/dashboard?event=ongoing");
                  }}>
                  Ongoing
               </Tab>
               <Tab
                  onClick={() => {
                     searchParams.set("event", "past");
                     navigate("/dashboard?event=ongoing");
                  }}>
                  past
               </Tab>
            </TabList>
         </Tabs>

         {
            {
               all: <AllEvent events={events} />,
               ongoing: <Ongoing events={events} />,
               past: <Past events={events} />,
            }[event]
         }
      </div>
   );
}
