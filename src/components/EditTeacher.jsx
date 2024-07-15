import React, { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Box,
  IconButton,
  FocusLock,
  Stack,
  ButtonGroup,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
export default function EditTeacher({
  coordinatorName,
  coordinatorEmail,
  coordinatorPhone,
}) {
  return (
    <div className="">
      <PopoverForm
        coordinatorEmail={coordinatorEmail}
        coordinatorName={coordinatorName}
        coordinatorPhone={coordinatorPhone}
      />
    </div>
  );
}
const TextInput = React.forwardRef((props, ref) => {
  return (
    <FormControl className="text-black">
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

// 2. Create the form
const Form = ({
  firstFieldRef,
  coordinatorEmail,
  coordinatorName,
  coordinatorPhone,
  onCancel,
}) => {
  const coordinatorNameRef = useRef();
  const coordinatorEmailRef = useRef();
  const coordinatorPhoneRef = useRef();

  const handleSubmit = () => {
    const data = {
      coordinatorName: coordinatorNameRef.current.value,
      coordinatorEmail: coordinatorEmailRef.current.value,
      coordinatorPhone: coordinatorPhoneRef.current.value,
    };

    console.log(data);
  };

  return (
    <Stack spacing={4}>
      <TextInput
        ref={coordinatorNameRef}
        label="Coordinator Name"
        id="CoordinatorName"
        defaultValue={coordinatorName}
      />
      <TextInput
        ref={coordinatorEmailRef}
        label="Coordinator Email"
        id="coordinatorEmail"
        defaultValue={coordinatorEmail}
      />
      <TextInput
        ref={coordinatorPhoneRef}
        label="Coordinator Phone"
        id="coordinatorPhone"
        defaultValue={coordinatorPhone}
      />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="teal" onSubmit={handleSubmit}>
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

// 3. Create the Popover
// Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
const PopoverForm = ({
  coordinatorEmail,
  coordinatorName,
  coordinatorPhone,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = React.useRef(null);

  return (
    <>
      <Box display="inline-block" mr={3}>
        {coordinatorName}
      </Box>
      <Popover
        coordinatorEmail={coordinatorEmail}
        coordinatorPhone={coordinatorPhone}
        isOpen={isOpen}
        initialFocusRef={firstFieldRef}
        onOpen={onOpen}
        onClose={onClose}
        placement="left"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon={<FaRegEdit />} />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form
              firstFieldRef={firstFieldRef}
              coordinatorEmail={coordinatorEmail}
              coordinatorPhone={coordinatorPhone}
              coordinatorName={coordinatorName}
              onCancel={onClose}
            />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};
