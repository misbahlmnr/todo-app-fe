import { useState } from "react";
import { useCreateTodo } from "../hooks/todoHooks";
import { toast } from "react-toastify";
import { FaCircleNotch } from "react-icons/fa6";

const FormTodo = () => {
  const [todo, setTodo] = useState("");

  const { mutate, isPending } = useCreateTodo();

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todo) {
      toast("Please fill in the todo field", { type: "error" });
      return;
    }

    const todoPayload = {
      title: todo,
      description: "",
      archived: false,
    };

    mutate(todoPayload, {
      onSuccess: (res) => {
        const { message } = res.data;
        toast(message, { type: "success" });
        setTodo("");
      },
      onError: (err) => {
        console.log("error", err);
      },
    });
  };
  return (
    <form
      onSubmit={onHandleSubmit}
      className="flex items-center justify-between bg-[#F4F4F4] h-[45px] p-2 rounded-[10px] gap-2 focus-within:ring-2 focus-within:ring-blue-500"
    >
      <input
        type="text"
        placeholder="Type todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="text-xs text-textcolor pl-2 flex-1 h-full outline-0"
      />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 w-10 bg-[#288DFF] flex items-center justify-center rounded-[10px] text-xs text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <FaCircleNotch className="text-white animate-spin" />
        ) : (
          "Add"
        )}
      </button>
    </form>
  );
};

export default FormTodo;
