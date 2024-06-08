import React from "react";
import { Button, Input } from "@chakra-ui/react";
import login from "../assets/login.jpg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const navigate = useNavigate();
   const formSubmit = async (data) => {
      console.log(data);
      try {
         const api = await axios.post("http://localhost:3000/auth/login", data);

         if (api.status === 200) {
            console.log("Login successfull");
            navigate("/dashboard");
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className='w-full h-[89%] flex justify-center items-center place-items-center'>
         <div className='w-full md:w-[80%]  mx-auto border border-background shadow-xl rounded-xl  p-5 flex'>
            <div className='w-[0%] md:w-[50%] h-[30rem]'>
               <img
                  src={login}
                  alt=''
                  className='h-full w-full hidden md:block'
               />
            </div>
            <div className='w-full md:w-[50%] border-l border-background px-4'>
               <p className=' font-bold text-4xl text-blue'>Signin</p>
               <div className='mt-10 w-full h-full   items-center'>
                  <form
                     className='w-full flex flex-col gap-5'
                     onSubmit={handleSubmit(formSubmit)}>
                     <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-lg'>Email</label>
                        <Input
                           placeholder='xyz@email.com'
                           {...register("email", {
                              required: "Enter the email",
                              pattern: {
                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                 message: "Invalid email address",
                              },
                           })}
                        />
                        {errors.email && (
                           <p className='text-red-500 font-semibold text-sm'>
                              {errors.email.message}
                           </p>
                        )}
                     </div>
                     <div className='flex flex-col gap-3'>
                        <label className='font-semibold text-lg'>
                           Password
                        </label>
                        <Input
                           placeholder='********'
                           type='password'
                           {...register("password", {
                              required: "Enter your password",
                              minLength: {
                                 value: 6,
                                 message:
                                    "Password must have at least 6 characters",
                              },
                           })}
                        />
                        {errors.password && (
                           <p className='text-red-500 font-semibold text-sm'>
                              {errors.password.message}
                           </p>
                        )}
                     </div>
                     <Button type='submit' className='w-full '>
                        Sign In
                     </Button>
                  </form>
                  <p className='mt-6'>
                     already registered click{" "}
                     <Link to='/register' className='text-primary'>
                        <span className='font-semibold  text-primary cursor-pointer '>
                           here
                        </span>
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
