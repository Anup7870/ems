import React from "react";
import { GoCopy } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
export default function ({ data }) {
   return (
      <div className=' w-96 border  rounded-tr-xl rounded-bl-xl'>
         <div className='w-full bg-[#182848] rounded-tr-xl  text-white px-2 py-1 flex justify-between'>
            Dspmu Youth Fest 2021-24
            <div className='flex gap-1 items-center '>
               <GoDotFill fill='green' />
               <p className='text-sm font-thin'> Ongoing</p>
            </div>
         </div>
         <div className='flex '>
            <div className='w-full'>
               <p>Total Events: 0</p>
               <p>Total Teams: 0</p>
            </div>
            <div className='w-full liner text-white px-2 pt-1 '>
               <p className=''>
                  start date: <span>2021-09-01</span>{" "}
               </p>
               <p className=' '>
                  end date: <span>2021-09-02</span>{" "}
               </p>
               <p className=''>
                  venue:{" "}
                  <span className='font-thin text-sm text-ellipsis line-clamp-1 underline'>
                     Auditorium DSPMU
                  </span>
               </p>
               <div className=' flex gap-2'>
                  <p>Registration Link</p>
                  <p className=' w-7 h-7 rounded-full liner flex items-center justify-center cursor-pointer'>
                     <GoCopy />
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
