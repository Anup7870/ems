import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { Input, Heading, Select, Avatar, Button } from "@chakra-ui/react";
import { uploadImage } from "../utils/UploadImage";
import toast, { Toaster } from "react-hot-toast";
export default function TeamRegistration({ setShowNavbar }) {
  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [displayImage, setDisplayImage] = useState(null);
  const eventId = window.location.pathname.split("/")[2];
  const [programs, setPrograms] = useState([]);
  const [data, setData] = useState();

  const onSubmit = async (data) => {
    // stroing all the memebers in an array

    // toast.loading("Please Wait.....");

    const members = [];
    for (let i = 1; i <= 8; i++) {
      if (getValues(`member${i}`)) {
        members.push(getValues(`member${i}`));
      }
    }

    // now adding the members array to the data object

    data.members = members;
    data.eventId = eventId;

    // upload image in cloudanary

    getValues("image");
    let image = await uploadImage(getValues("image"));

    data.image = image;
    console.log(data);
    const res = await axios
      .post("http://localhost:3000/program/create/team", data)
      .then(() => {
        reset();
        toast.success("Team Created Successfully.....");
      })
      .catch(() => {
        reset();
        toast.error("Something went Wrong....");
      });
  };

  useEffect(() => {
    try {
      const featch = async () => {
        // setFetch(true);
        // console.log(eventId);
        const data = await axios.get(
          `http://localhost:3000/event/get/${eventId}`,
          {
            headers: {
              access_token: Cookies.get("access_token"),
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        if (data.data.success) {
          setData(data.data.event);
          setPrograms(data.data.event.programs);
        }
        // console.log(data.data.event);
      };

      featch();
    } catch (error) {
      // setFetch(true);
    }
  }, []);
  return (
    <div className=" w-full px-5 md:px-24">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Heading as="h1" size="2xl" textAlign="center">
        Registration Form
      </Heading>
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-lg mb-1">Team name</p>
            <Input placeholder="eg - Team 1" {...register("teamName")} />
          </div>
          <div>
            <p className="font-semibold text-lg mb-1">Select Program</p>
            <Select
              placeholder="Select Event"
              {...register("ProgramId", { required: "Event name is required" })}
            >
              {programs.map((program) => (
                <option key={program._id} value={program._id}>
                  {program.programName}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <h2 className="text-xl font-bold my-3 ">Leader Details</h2>
        <div className=" grid md:grid-cols-3 gap-3 content-center">
          <div>
            <p className="font-semibold text-lg mb-1">Name</p>
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
          <div className="flex justify-center  items-center">
            <Input
              className=" content-center"
              type="file"
              onChange={(e) => {
                let image = e.target.files[0];
                setValue("image", image);
                setDisplayImage(URL.createObjectURL(image));
              }}
            />
          </div>
          <Avatar size="2xl" src={displayImage} />
        </div>
        <h2 className="text-xl font-bold my-3 ">Members</h2>
        <div className="mt-1">
          <p className=" font-medium text-base text-gray-500 mb-1">Member 1</p>
          <Input placeholder="eg - xyz" {...register("member1")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 2</p>
          <Input placeholder="eg - xyz" {...register("member2")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 3</p>
          <Input placeholder="eg - xyz" {...register("member3")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 4</p>
          <Input placeholder="eg - xyz" {...register("member4")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 5</p>
          <Input placeholder="eg - xyz" {...register("member5")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 6</p>
          <Input placeholder="eg - xyz" {...register("member6")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 7</p>
          <Input placeholder="eg - xyz" {...register("member7")} />
        </div>
        <div>
          <p className=" font-medium text-base text-gray-500 mb-1">Member 8</p>
          <Input placeholder="eg - xyz" {...register("member8")} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
