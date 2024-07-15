import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
export default function CreateEvent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const { user } = useSelector((state) => state.user);
  function convertDate(inputFormat) {
    let parts = inputFormat.split("-");
    return new Date(parts[0], parts[2] - 1, parts[1]);
  }

  const formSubmit = async (data) => {
    if (data.start && data.end) {
      let start = convertDate(data.start);
      let end = convertDate(data.end);
      data.start = start;
      data.end = end;
    }
    // add the user id
    // data.userId = user.rest._id;
    // console.log(data);
    const apiCall = await axios.post(
      "http://localhost:3000/event/create",
      data,
      {
        withCredentials: true,

        headers: {
          access_token: Cookies.get("access_token"),
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    if (apiCall.status === 201) {
      onClose();
      console.log("Event created successfully");
    }
  };
  return (
    <>
      <Button
        leftIcon={<FiPlus />}
        colorScheme="teal"
        className="mt-2 "
        onClick={onOpen}
      >
        Create Event
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(formSubmit)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new Event
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="username">Event Name</FormLabel>
                  <Input
                    ref={firstField}
                    id="username"
                    placeholder="Please enter name"
                    {...register("eventName", {
                      required: "Event name is required",
                    })}
                  />
                  {errors.eventName && (
                    <p className="text-red-500 font-semibold text-sm mt-1">
                      {errors.eventName.message}
                    </p>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="url">Start</FormLabel>
                  <InputGroup>
                    <Input type="date" {...register("startDate")} />
                  </InputGroup>
                </Box>
                <Box>
                  <FormLabel htmlFor="url">End</FormLabel>
                  <InputGroup>
                    <Input type="date" {...register("endDate")} />
                  </InputGroup>
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea id="desc" {...register("disc")} />
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
