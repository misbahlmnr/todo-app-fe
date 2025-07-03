import { useState } from "react";
import { Link } from "react-router-dom";
import type { LoginPayload } from "../api/auth";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { ImNotification } from "react-icons/im";
import { LiaTimesSolid } from "react-icons/lia";
import { FaCircleNotch } from "react-icons/fa6";

const FormLogin = ({
  isLoading,
  onSubmitHandler,
}: {
  isLoading: boolean;
  onSubmitHandler: (data: LoginPayload) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.email || !formState.password) {
      setError("Please fill in all fields!");
      return;
    }

    onSubmitHandler(formState);
  };

  return (
    <div className="md:max-w-[441px] w-full bg-white h-auto p-5 rounded-[20px]">
      <h1 className="text-center text-2xl mt-3 text-slate-950 font-semibold">
        Sign In
      </h1>
      <p className="text-textcolor text-center text-xs mt-2">
        Sign in to app, for create your todo task
      </p>

      <div className="border border-[#EEEEEE] mt-5 rounded-[10px]" />

      {error && (
        <div className="p-5 bg-red-100 rounded-[10px] text-red-500 text-xs my-3 flex items-center justify-center gap-2 relative">
          <div
            className="absolute top-1 right-1 cursor-pointer p-1 hover:bg-red-200 transition-all duration-200 rounded-full ease-in-out"
            onClick={() => setError("")}
          >
            <LiaTimesSolid />
          </div>
          <ImNotification /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mt-5 mb-3">
          <label htmlFor="email" className="text-xs font-semibold">
            Email
          </label>
          <input
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            placeholder="Type email"
            className="bg-[#F4F4F4] text-xs p-2 rounded-[10px] text-textcolor h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="password" className="text-xs font-semibold">
            Password
          </label>
          <div className="flex items-center justify-between rounded-[10px] bg-[#F4F4F4] text-textcolor h-[44px] focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              placeholder="Type password"
              className="flex-1 text-xs p-2 outline-0 h-full bg-transparent"
            />
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="p-2 h-[40px] bg-[#288DFF] rounded-[10px] text-xs font-semibold text-white text-center w-full cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading && <FaCircleNotch className="text-white animate-spin" />}
          <span>{isLoading ? "Logging in..." : "Login"}</span>
        </button>
      </form>

      <p className="text-textcolor text-xs text-center mt-5">
        Don't have an account?{" "}
        <Link to="/register" className="font-semibold text-[#288DFF]">
          Register
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
