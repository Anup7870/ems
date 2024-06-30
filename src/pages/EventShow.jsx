import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Spinner } from "@chakra-ui/react";
import classNames from "classnames";
import { GoCopy } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
export default function EventShow() {
   const navigate = useNavigate();
   const param = useParams();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const eventId = param.eventId;
   const queryType = queryParams.get("type");
   const [data, setData] = useState();
   const [fetch, setFetch] = useState(false);
   const buttons = classNames({
      "!border-red-600": true,
      "!bg-red-100": true,
      "hover:!bg-red-600": true,
      "hover:text-white": true,
   });
   useEffect(() => {
      try {
         const featch = async () => {
            setFetch(true);
            const data = await axios.get(
               `http://localhost:3000/event/get/${eventId}`,
               {
                  headers: {
                     access_token: Cookies.get("access_token"),
                     "Access-Control-Allow-Credentials": true,
                  },
               }
            );
            if (data.data.success) {
               setData(data.data.event);
               setFetch(false);
            }
         };
         featch();
      } catch (error) {
         setFetch(true);
      }
   }, []);

   return (
      <div className='mt-20 w-full'>
         {fetch ? (
            <div className='w-full h-screen flex items-center justify-center'>
               <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='blue.500'
                  size='xl'
               />
            </div>
         ) : (
            <div className=' px-8 w-full'>
               <div className='w-full'>
                  <h1 className={"md:text-4xl text-2xl font-bold"}>
                     {data?.eventName}
                  </h1>
               </div>
               <div>
                  <div>
                     <Button
                        leftIcon={<MdOutlineDelete />}
                        variant='outline'
                        className={buttons}>
                        Delete
                     </Button>{" "}
                     <Button variant='outline'>Extend</Button>
                  </div>
                  <div>
                     <GoCopy />
                     Registration Link
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
