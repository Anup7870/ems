import React from "react";

import { useForm } from "react-hook-form";
import { Input, Button } from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import {
   Box,
   Step,
   StepDescription,
   StepIcon,
   StepIndicator,
   StepNumber,
   StepSeparator,
   StepStatus,
   StepTitle,
   Stepper,
   useSteps,
} from "@chakra-ui/react";
const steps = [
   { title: "First", description: "Personal Info" },
   { title: "Second", description: "College Info" },
   { title: "Third", description: "Verify" },
];
export default function Signup() {
   const {
      handleSubmit,
      register,
      formState: { errors },
      getValues,
   } = useForm();
   const formSubmit = (data) => {
      console.log(data);
   };
   const { activeStep, setActiveStep } = useSteps({
      index: 0,
      count: steps.length,
   });
   return (
      <div className='w-full h-[89%]  flex items-center justify-center'>
         <div className='w-full relative md:w-[80%] mt-5 h-full  border border-background shadow-xl rounded-xl  p-5 '>
            <Stepper size='lg' index={activeStep}>
               {steps.map((step, index) => (
                  <Step key={index} onClick={() => setActiveStep(index)}>
                     <StepIndicator>
                        <StepStatus
                           complete={<StepIcon />}
                           incomplete={<StepNumber />}
                           active={<StepNumber />}
                        />
                     </StepIndicator>

                     <Box flexShrink='0'>
                        <StepTitle>{step.title}</StepTitle>
                        <StepDescription>{step.description}</StepDescription>
                     </Box>

                     <StepSeparator />
                  </Step>
               ))}
            </Stepper>

            <div>
               {/* <p>Register</p> */}
               <form
                  onSubmit={handleSubmit(formSubmit)}
                  className='mt-5 border-t  border-background overflow-auto'>
                  <div className='flex justify-between gap-2'>
                     <div className='mt-3 flex-1'>
                        <label className='font-semibold text-lg'>
                           First Name
                        </label>
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
                        <label className='font-semibold text-lg'>
                           Last Name
                        </label>
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
                           accept=''
                        />
                        <div className='w-full flex items-center justify-center'>
                           <div className=' w-36 h-36 rounded-full flex justify-center items-center place-items-center text-center bg-card'>
                              <BiImageAdd className='w-10 h-10' />
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
               <div className='w-full absolute bottom-0 left-0 flex justify-between px-3 pb-2'>
                  <Button
                     onClick={() => {
                        setActiveStep(activeStep - 1);
                     }}>
                     Back
                  </Button>
                  <Button
                     onClick={() => {
                        setActiveStep(activeStep + 1);
                     }}>
                     Next
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
