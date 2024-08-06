import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Button, Spinner } from "@chakra-ui/react";
import classNames from "classnames";
import { GoCopy } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";
import { LuRefreshCcw } from "react-icons/lu";
import AddProgram from "../components/AddProgram";
import ProgramCard from "../components/ProgramCard";
export default function EventShow() {
  const navigate = useNavigate();
  const param = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const eventId = param.eventId;
  const queryType = queryParams.get("type");
  const [data, setData] = useState();
  const [fetch, setFetch] = useState(false);
  const [addProgramClicked, setAddProgramClicked] = useState(false);
  const buttons = classNames({
    "!border-red-600": true,
    "!bg-red-100": true,
    "hover:!bg-red-600": true,
    "hover:text-white": true,
  });
  const activeColor = classNames({
    "bg-green-200": true,
  });
  const activeColorLight = classNames({
    "bg-green-50": true,
  });
  const refreshing = classNames({
    // "rotate-[360deg]": true,
    "animate-spin": false,
  });
  useEffect(() => {
    try {
      const featch = async () => {
        setFetch(true);
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
          console.log(data.data);
          setFetch(false);
        }
        // console.log(data.data.event);
      };

      featch();
    } catch (error) {
      setFetch(true);
    }
    // console.log(data);
  }, []);

  const handleCopy = () => {
    const el = document.createElement("textarea");
    el.value = `http://localhost:5173/registration/${eventId}`;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy"); // or 'cut'
    document.body.removeChild(el); // Remove the textarea
  };

  return (
    <div className="mt-20 w-full">
      {fetch ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <div className=" w-full ">
          <div className="w-full  px-8">
            <h1 className={"md:text-4xl text-2xl font-bold"}>
              {data?.eventName}
            </h1>
          </div>

          <div className="w-full  px-2 shadow-md flex justify-between items-center gap-2 border-t mt-5 py-2">
            <div
              className="flex gap-3  px-1 py-1 bg-green-50 rounded-sm"
              onClick={handleCopy}
            >
              <div className="w-8 h-8 cursor-pointer rounded-full flex items-center text-center justify-center bg-green-200">
                <GoCopy />
              </div>
              <p className="text-sm md:text-base"> Registration Link</p>
            </div>
            <div className="flex  gap-1">
              <Button
                leftIcon={<MdOutlineDelete />}
                variant="outline"
                className={buttons}
              >
                Delete
              </Button>{" "}
              <Button variant="outline">Extend</Button>
            </div>
          </div>
          <div className="w-full  px-2 mt-5">
            <div className="flex items-center gap-8 border-b pb-2">
              <AddProgram />
              <LuRefreshCcw className={` cursor-pointer ${refreshing} `} />
            </div>
            <section className="md:px-8">
              {data?.programs.map((program, index) => (
                <ProgramCard key={index} data={program} />
              ))}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
