import React from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import { ThemeContxt } from "../../context/ThemeContextProvider";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

const TNavbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContxt);
  const location = useLocation();

  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white pl-8">
      {location.pathname === "/live-feed" && (
        <h1 className="text-base font-semibold sm:block md:hidden">
          Live Feed
        </h1>
      )}
      {location.pathname === "/historic-feed" && (
        <h1 className="text-base font-semibold sm:block md:hidden">
          Historic Feed
        </h1>
      )}
      {location.pathname === "/current-bill" && (
        <h1 className="text-base font-semibold sm:block md:hidden">
          Current Bill
        </h1>
      )}

      <button
        className="text-base ml-auto text-dark mr-4"
        onClick={toggleTheme}
      >
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default TNavbar;
