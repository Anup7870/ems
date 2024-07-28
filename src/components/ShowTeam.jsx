import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
export default function ShowTeam({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(data);

  return (
    <div className="mt-5 pb-3">
      <div className="flex justify-between bg-sky-100 rounded-lg px-2 items-center py-1">
        <p className=" font-semibold text-xl">{data.teamName}</p>
        <div className="flex gap-5 text-center items-center">
          <p>{data.leader}</p>
          <Avatar name={data.leader} src={data.image} />
          <Button onClick={onOpen} colorScheme="green">
            View Team
          </Button>
          <Button colorScheme="red">Delete</Button>
        </div>
      </div>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Memebers of {data.teamName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              {data.members.map((member, index) => (
                <div key={index} className="border-b mt-1">
                  <p>{member}</p>
                </div>
              ))}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
