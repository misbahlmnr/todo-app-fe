import { useEffect, useRef, useState } from "react";
import { cn, getInitialName } from "../utils";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-[66px] w-full max-w-[466px] bg-white rounded-full p-4 flex items-center justify-between">
      <h1 className="text-base font-bold text-slate-900">Todo App</h1>
      <div className="relative">
        <button
          type="button"
          className="flex items-center gap-3 h-10 w-10 bg-[#F4EBD3] rounded-full justify-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {getInitialName(user.name)}
        </button>

        <div
          ref={dropdownRef}
          className={cn(
            "absolute min-w-[150px] bg-white top-16 -right-5 md:-right-14 p-3 rounded-lg flex flex-col justify-between shadow-lg z-10 transition-all duration-200 ease-in-out origin-top-right",
            {
              "opacity-100 scale-100 pointer-events-auto": isOpen,
              "opacity-0 scale-95 pointer-events-none": !isOpen,
            }
          )}
        >
          <h3 className="text-xs text-textcolor mb-3">
            Login as: <b className="text-[#288DFF]">@{user.name}</b>
          </h3>
          <button
            onClick={handleLogout}
            className="px-3 py-2 bg-red-100 text-red-500 rounded-sm text-xs font-semibold cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
