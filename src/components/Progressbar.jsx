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
export default function ProgressBar() {
   const { activeStep, setActiveStep } = useSteps({
      index: 0,
      count: steps.length,
   });
   return (
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
   );
}
