import React, { useState, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import college from "../assets/college.jpg";
export default function CollegeInfo({ register, errors, getValues, setValue }) {
   const [collegeImage, setCollegeImage] = useState(null);
   const collegeImageRef = useRef(null);
   const handleImageInput = () => {
      collegeImageRef.current.click();
   };
   const handleImage = (e) => {
      let image = e.target.files[0];
      console.log(image);

      setCollegeImage(URL.createObjectURL(image));
      setValue("collegeLogo", image);
   };

   return (
      <div className='   mt-10 flex items-center'>
         <div className=' w-[0%] md:w-[50%]  hidden md:block'>
            <img src={college} alt='' className='w-[50%] mx-auto' />
         </div>

         <div className=' flex-1'>
            <h1 className=' font-bold text-2xl md:text-4xl pb-2 '>
               College Info
            </h1>
            <div className='w-full flex items-center justify-center mt-5'>
               <input
                  type='file'
                  accept='image/*'
                  name=''
                  id=''
                  className='hidden'
                  onChange={handleImage}
                  ref={collegeImageRef}
               />
               <div
                  className='  w-48 h-48 bg-background rounded-full flex justify-center items-center '
                  onClick={handleImageInput}>
                  {collegeImage ? (
                     <img
                        src={collegeImage}
                        alt=''
                        className='w-full h-full object-cover rounded-full '
                     />
                  ) : (
                     <BiImageAdd className='text-gray-500 text-5xl' />
                  )}
               </div>
            </div>

            <input
               type='text'
               className='mt-4 w-full p-2 rounded-md border border-gray-300'
               placeholder='College Name'
               {...register("collegeName", {
                  required: "College Name is required",
               })}
            />
            {errors.collegeName && <p>{errors.collegeName.message}</p>}
         </div>
      </div>
   );
}
