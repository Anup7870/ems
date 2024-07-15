import React from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import classNames from "classnames";

import { useState } from "react";
import EditTeacher from "./EditTeacher";

export default function ProgramCard() {
  const [displayNone, setDiasplayNone] = useState(true);
  const [coordinatorEmail, setCoordinatorEmail] = useState("A@email.com");
  const [coordinatorPhone, setCoordinatorPhone] = useState("98765432310");
  const [coordinatorName, setCoordinatorName] = useState("Anup");
  const sec = classNames({
    hidden: displayNone,
  });
  return (
    <div className="w-full shadow-md rounded-xl mt-10">
      <div className="h-16 bg-blue text-white rounded-t-xl md:px-3 px-1 flex items-center justify-between">
        <p>Dance</p>
        <div className="flex items-center gap-2 cursor-pointer">
          <EditTeacher
            coordinatorEmail={coordinatorEmail}
            coordinatorName={coordinatorName}
            coordinatorPhone={coordinatorPhone}
          />
        </div>
      </div>
      <section className={`${sec} `}>hii</section>
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
