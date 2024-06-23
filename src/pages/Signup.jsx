import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@chakra-ui/react";
import axios from "axios";
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
import PersonalInfo from "../components/PersonalInfo.jsx";
import CollegeInfo from "../components/CollegeInfo.jsx";
import VerifyInfo from "../components/VerfiyInfo.jsx";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils/UploadImage.js";
import {
   signupStart,
   singupSucess,
   signupFailure,
} from "../redux/slice/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
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
      setValue,
   } = useForm();

   const dispatch = useDispatch();
   const { loading } = useSelector((state) => state.user);
   const naviagate = useNavigate();

   const { activeStep, setActiveStep } = useSteps({
      index: 0,
      count: steps.length,
   });
   const formSubmit = (data) => {
      if (activeStep === 2) {
         handleApi(data);
      } else {
         setActiveStep(activeStep + 1);
      }
   };
   const handleApi = async (data) => {
      try {
         dispatch(signupStart());
         console.log(data);
         const user = await uploadImage(data.userImage);
         const college = await uploadImage(data.collegeLogo);
         // update in the data
         data.userImage = user;
         data.collegeLogo = college;
         const api = await axios.post(
            "http://localhost:3000/auth/register",
            data
         );
         console.log(api);
         if (api.status === 201) {
            dispatch(singupSucess());
            naviagate("/login");
         }
      } catch (error) {
         dispatch(signupFailure(error));
      }
   };
   return (
      <div className='w-full h-[89%]  flex items-center justify-center mt-20'>
         <div className='w-full relative md:w-[80%] mt-5 h-full  border border-background shadow-xl rounded-xl  p-5 '>
            <Stepper size='lg' index={activeStep}>
               {steps.map((step, index) => (
                  <Step
                     key={index}
                     //  onClick={() => setActiveStep(index)}
                  >
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

            <div className=' '>
               {/* <p>Register</p> */}
               <form
                  className='mt-5 border-t  border-background overflow-auto'
                  onSubmit={handleSubmit(formSubmit)}>
                  {activeStep === 0 && (
                     <PersonalInfo
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        setValue={setValue}
                     />
                  )}
                  {activeStep === 1 && (
                     <CollegeInfo
                        register={register}
                        errors={errors}
                        getValues={getValues}
                        setValue={setValue}
                     />
                  )}
                  {activeStep === 2 && <VerifyInfo getValues={getValues} />}

                  <div className='w-full absolute bottom-0 left-0 flex justify-between px-3 pb-2'>
                     <Button
                        onClick={() => {
                           setActiveStep(activeStep - 1);
                        }}>
                        Back
                     </Button>
                     <Button
                        type='submit'
                        // onClick={handleNext}
                     >
                        {activeStep === 2 ? "Submit" : "Next"}
                     </Button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
}
