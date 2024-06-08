import React from "react";

export default function VerfiyInfo({ getValues }) {
   return (
      <div>
         <h1 className=' font-semibold text-2xl md:text-4xl'>
            Verify Your Detail
         </h1>
         <div className='mt-5'>
            <p>
               <div className='  w-48 h-48 bg-background rounded-full flex justify-center items-center '>
                  <img
                     src={URL.createObjectURL(getValues("userImage"))}
                     alt=''
                     className='w-full h-full object-cover rounded-full '
                  />
               </div>
            </p>
            <p>
               <span className='font-semibold'>Name: </span>
               {getValues("firstName")} {getValues("lastName")}
            </p>
            <p>
               <span className='font-semibold'>Email: </span>
               {getValues("email")}
            </p>
            <p>
               <span className='font-semibold'>Phone: </span>
               {getValues("phone")}
            </p>
            <p>
               <span className='font-semibold'>College Name: </span>
               {getValues("collegeName")}
            </p>
            {/* <p>
               <span className='font-semibold'>College Logo: </span>
               <img
                  src={URL.createObjectURL(getValues("collegeLogo"))}
                  alt=''
               />
            </p> */}
         </div>
      </div>
   );
}
