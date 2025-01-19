import React, { useState } from "react";
import { LiaToggleOnSolid, LiaToggleOffSolid } from "react-icons/lia";
import { getRDB, setRDB } from "../../util/getRealTimeDb";
import { set } from "firebase/database";

const Valvecard = ({ name, room, deviceId, state }) => {
  const refPath = `SolenoidData/${deviceId}`;
  const [isToggled, setIsToggled] = useState(state);
  const handleToggleClick = () => {
    setIsToggled(!isToggled);
    console.log("Toggled: ", !isToggled);
    const data = { solenoid: !isToggled };
    setRDB(refPath, { data });
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg flex items-center justify-between dark:bg-gray-800 dark:border dark:border-gray-700 overflow-hidden">
      <div className="text-left flex-1">
        <p className="text-base font-semibold text-blue-500 uppercase dark:text-blue-400">
          {name}
        </p>
      </div>

      <div className="flex items-center space-x-0">
        <p className="text-xs dark:text-white text-gray-500">Unit: # {room}</p>

        <div
          onClick={handleToggleClick}
          className="flex items-center justify-center p-2 dark:border-gray-500 rounded-md cursor-pointer"
        >
          {isToggled ? (
            <LiaToggleOnSolid className="text-3xl text-blue-500 dark:text-blue-400" />
          ) : (
            <LiaToggleOffSolid className="text-3xl text-gray-500 dark:text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Valvecard;
