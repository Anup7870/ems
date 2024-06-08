import React, { useState, useRef } from "react";
import { Input } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
export default function PersonalInfo({
   register,
   errors,
   getValues,
   setValue,
}) {
   const [image, setImage] = useState(null);
   const imageRef = useRef(null);
   return (
      <>
         <div className='flex justify-between gap-2'>
            <div className='mt-3 flex-1'>
               <label className='font-semibold text-lg'>First Name</label>
               <Input
                  type='text'
                  className='mt-2'
                  placeholder='First Name'
                  {...register("firstName", {
                     required: "First Name is required",
                  })}
               />
               {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            <div className='mt-3 flex-1'>
               <label className='font-semibold text-lg'>Last Name</label>
               <Input
                  type='text'
                  className='mt-2'
                  values={getValues("lastName")}
                  placeholder='Last Name'
                  {...register("lastName", {
                     required: "last Name is required",
                  })}
               />
               {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
         </div>

         <div className='mt-3'>
            <label className='font-semibold text-lg'>Email</label>
            <Input
               type='email'
               placeholder='Email'
               className='mt-2'
               {...register("email", {
                  required: "Email is required",
                  pattern: {
                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                     message: "Invalid email address",
                  },
               })}
            />
            {errors.email && <p>{errors.email.message}</p>}
         </div>
         <div className='mt-3'>
            <label className='font-semibold text-lg'>Password</label>
            <Input
               type='password'
               placeholder='Password'
               className='mt-2'
               {...register("password", {
                  required: "Password is required",
                  minLength: {
                     value: 6,
                     message: "Password must be atleast 6 characters",
                  },
               })}
            />
            {errors.password && <p>{errors.password.message}</p>}
         </div>
         <div className='mt-3'>
            <label htmlFor='' className='font-semibold text-lg'>
               Uplaod your image
            </label>
            <div className='flex flex-col md:flex-row items-center '>
               <Input
                  type='file'
                  className='w-full md:!w-[50%]'
                  accept='image/*'
                  ref={imageRef}
                  onChange={(e) => {
                     let image = e.target.files[0];
                     setValue("userImage", image);
                     setImage(URL.createObjectURL(image));
                  }}
               />
               <div
                  className='w-full flex items-center justify-center'
                  onClick={() => imageRef.current.click()}>
                  <div className=' w-36 h-36 rounded-full flex justify-center items-center place-items-center text-center bg-card'>
                     {image ? (
                        <img
                           src={image}
                           alt=''
                           className='w-full h-full object-cover rounded-full '
                        />
                     ) : (
                        <BiImageAdd className='text-gray-500 text-5xl' />
                     )}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
