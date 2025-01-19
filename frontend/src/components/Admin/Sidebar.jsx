import React from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaFaucetDrip } from "react-icons/fa6";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { IoLogOutSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { logOut } from "../../util/log";

const menuOptions = [
  { icon: <MdDashboardCustomize />, label: "Dashboard", link: "/admin" },
  { icon: <FaFaucetDrip />, label: "Valve Settings", link: "/valve-settings" },
  {
    icon: <BsDatabaseFillAdd />,
    label: "Rate Settings",
    link: "/rate-settings",
  },
];

const Sidebar = () => {
  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white flex flex-col">
      <div className="flex justify-center items-center mt-4">
        <img
          src="src/assets/logo2.png"
          alt="Logo"
          className="w-5 h-6 md:hidden" // collapsed
        />
        <img
          src="src/assets/logotr.png"
          alt="Logo"
          className="hidden md:block w-15 h-15" // expanded
        />
      </div>

      {/* Menu options */}
      <ul className="flex flex-col mt-5 text-xl flex-grow">
        {menuOptions.map((option, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={option.link}
              className="flex items-center w-full py-3 px-2 space-x-4 stroke-gray-900 hover:rounded hover:cursor-pointer hover:bg-blue-700 hover:text-white"
            >
              {option.icon}
              <span className="hidden md:inline">{option.label}</span>
            </Link>
          </li>
        ))}

        <li className="flex items-center w-full py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer hover:bg-blue-700 hover:text-white mb-5 mt-6 border-t border-gray-300 dark:border-gray-600">
          <Link
            to="/"
            className="flex items-center w-full"
            onClick={() => {
              logOut();
              localStorage.removeItem("userData");
            }}
          >
            <IoLogOutSharp className="text-xl" />
            <span className="md:inline hidden ml-2">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
