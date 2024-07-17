import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
export default function AddProgram() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = location.pathname.split("/")[2];
  const createProgram = async (d) => {
    const data = { ...d, eventId };
    const api = await axios.post("http://localhost:3000/program/create/", data);
    // console.log(api);
  };

  return (
    <div>
      <Popover isLazy>
        <PopoverTrigger>
          <Button leftIcon={<IoAddCircleOutline />}>Add Program</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Program Detail</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <form onSubmit={handleSubmit(createProgram)}>
              <div>
                <label htmlFor="">Program Name</label>
                <Input
                  placeholder="eg:- Dance"
                  {...register("programName", {
                    required: "please enter the progrn name",
                  })}
                />
                {errors.programName && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.programName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="">Coordinator Name</label>
                <Input
                  placeholder="eg:- Dance"
                  {...register("coordinatorName", {
                    required: "Enter the coordinator",
                  })}
                />
                {errors.coordinatorName && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.coordinatorName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="">Coordninator Email</label>
                <Input
                  placeholder="eg:- xyz@email.com"
                  type="coordinatorEmail"
                  {...register("coordinatorEmail", {
                    required: "Enter the email",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.coordinatorEmail && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.coordinatorEmail.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="">Phone</label>
                <InputGroup>
                  <InputLeftAddon>+91</InputLeftAddon>
                  <Input
                    type="tel"
                    placeholder="phone number"
                    {...register("coordinatorPhone", {
                      required: "Enter the phone number",
                    })}
                  />
                </InputGroup>
                {errors.coordinatorPhone && (
                  <p className="text-red-500 font-semibold text-sm">
                    {errors.coordinatorPhone.message}
                  </p>
                )}
              </div>
              <Button className="mt-4" type="submit">
                Create
              </Button>
            </form>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
}
