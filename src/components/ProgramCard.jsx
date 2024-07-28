import React, { useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import classNames from "classnames";
import axios from "axios";
import { useState } from "react";
import EditTeacher from "./EditTeacher";
import Cookies from "js-cookie";
import AddTeam from "./AddTeam";
import ShowTeam from "./ShowTeam";
export default function ProgramCard({ data }) {
  const [displayNone, setDiasplayNone] = useState(true);
  const [coordinatorEmail, setCoordinatorEmail] = useState("A@email.com");
  const [coordinatorPhone, setCoordinatorPhone] = useState("98765432310");
  const [coordinatorName, setCoordinatorName] = useState("Anup");
  const [programName, setProgramName] = useState("Dance");
  const [teams, setTeams] = useState([]);
  const sec = classNames({
    hidden: displayNone,
  });
  const programId = data;
  const deleteTeam = (teamId) => {
    setTeams(teams.filter((team) => team._id !== teamId));
  };
  useEffect(() => {
    try {
      const fetch = async () => {
        const res = await axios.get(
          `http://localhost:3000/program/get?programId=${programId}`,
          {
            headers: {
              access_token: Cookies.get("access_token"),
              "Access-Control-Allow-Credentials": true,
            },
          }
        );
        if (res.data.status === "success") {
          setCoordinatorEmail(res.data.data[0].coordinatorEmail);
          setCoordinatorPhone(res.data.data[0].coordinatorPhone);
          setCoordinatorName(res.data.data[0].coordinatorName);
          setProgramName(res.data.data[0].programName);
          setTeams(res.data.data[0].teams);
        }
        // console.log(res.data);
      };
      fetch();
    } catch (err) {
      console.log(err);
    }
  }, []);
  console.log(coordinatorEmail);
  return (
    <div className="w-full shadow-md rounded-xl mt-10">
      <div className="h-16 bg-blue text-white rounded-t-xl md:px-3 px-1 flex items-center justify-between">
        <p className="font-semibold text-xl">{programName}</p>
        <div className="flex items-center gap-2 cursor-pointer">
          <EditTeacher
            coordinatorEmail={coordinatorEmail}
            coordinatorName={coordinatorName}
            coordinatorPhone={coordinatorPhone}
          />
        </div>
      </div>
      <section className={`${sec} px-4 bg-gray-100 h-full `}>
        <nav className="w-full border-b py-1">
          <ul className="w-full flex justify-between ">
            <li>
              total students <span>20</span>
            </li>
            <li>
              total team <span>10</span>
            </li>
          </ul>
        </nav>
        <AddTeam programId={programId} />
        {teams.map((team) => (
          <ShowTeam key={team._id} data={team} deleteTeam={deleteTeam} />
        ))}
      </section>
      <div
        className=" h-16 rounded-full flex items-center justify-center w-full cursor-pointer "
        onClick={() => setDiasplayNone(!displayNone)}
      >
        {displayNone ? (
          <MdKeyboardArrowUp size="2em" />
        ) : (
          <MdKeyboardArrowDown size="2em" />
        )}
      </div>
    </div>
  );
}
