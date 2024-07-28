import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { redirect } from "react-router-dom";
import axios from "axios";
import { uploadImage } from "../utils/UploadImage";
export default function AddTeam({ programId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    // stroing all the memebers in an array
    const members = [];
    for (let i = 1; i <= 8; i++) {
      if (getValues(`member${i}`)) {
        members.push(getValues(`member${i}`));
      }
    }
    // now adding the members array to the data object
    data.members = members;
    data.programId = programId;
    //upload image in cloudanary
    getValues("image");
    let image = await uploadImage(getValues("image"));

    data.image = image;

    console.log(getValues("image"));
    const res = await axios.post(
      "http://localhost:3000/program/create/team",
      data
    );

    // if sucessfull then close the model and reload the page
    if (res.data.status === "success") {
      onClose();
    }
  };
  return (
    <div>
      <Button onClick={onOpen} className="mt-3 !bg-gray-300">
        Add Team
      </Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Add Student</ModalHeader>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <p className="font-semibold text-lg mb-1">Team name</p>
                <Input placeholder="eg - Team 1" {...register("teamName")} />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Leader Name</p>
                <Input
                  placeholder="eg - xyz"
                  {...register("leader", { required: "Leader is required" })}
                />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Phone</p>
                <Input
                  placeholder="eg - 123456789"
                  {...register("phone", { required: "Phone is required" })}
                />
              </div>
              <div>
                <p className="font-semibold text-lg mb-1">Email</p>
                <Input
                  placeholder="eg - xyz@email.com"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              <div className="mt-1">
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 1
                </p>
                <Input placeholder="eg - xyz" {...register("member1")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 2
                </p>
                <Input placeholder="eg - xyz" {...register("member2")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 3
                </p>
                <Input placeholder="eg - xyz" {...register("member3")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 4
                </p>
                <Input placeholder="eg - xyz" {...register("member4")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 5
                </p>
                <Input placeholder="eg - xyz" {...register("member5")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 6
                </p>
                <Input placeholder="eg - xyz" {...register("member6")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 7
                </p>
                <Input placeholder="eg - xyz" {...register("member7")} />
              </div>
              <div>
                <p className=" font-medium text-base text-gray-500 mb-1">
                  Member 8
                </p>
                <Input placeholder="eg - xyz" {...register("member8")} />
              </div>
              <div className="mt-2">
                <Input
                  type="file"
                  onChange={(e) => {
                    let image = e.target.files[0];
                    setValue("image", image);
                  }}
                />
              </div>
            </ModalBody>

            <ModalFooter className="flex gap-2">
              <Button colorScheme="blue" type="submit">
                Add
              </Button>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
