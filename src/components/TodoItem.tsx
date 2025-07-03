import { useEffect, useRef, useState } from "react";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import { cn } from "../utils";
import type { Todo } from "../api/todos";
import { FaCircleNotch } from "react-icons/fa6";
import { toast } from "react-toastify";

const TodoItem = ({
  todo,
  onEdit,
  onDelete,
  // isLoadingEdit,
  isLoadingDelete,
}: {
  todo: Todo;
  onEdit: (id: string, data: any) => void;
  onDelete: (id: string) => void;
  isLoadingEdit: boolean;
  isLoadingDelete: boolean;
}) => {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isChecked, setIsChecked] = useState(todo.archived);
  const [isEdit, setIsEdit] = useState(false);
  const editWrapperRef = useRef<HTMLDivElement>(null);

  const handleCheck = () => {
    setIsChecked(!isChecked);
    onEdit(todo.id, { title: todo.title, archived: !isChecked });
  };

  const handleDelete = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                onDelete(todo.id);
                closeToast();
              }}
              className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-2 py-1 bg-gray-300 rounded cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  useEffect(() => {
    if (!isEdit && todoTitle !== todo.title) {
      onEdit(todo.id, { title: todoTitle });
    }
  }, [isEdit]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        editWrapperRef.current &&
        !editWrapperRef.current.contains(e.target as Node)
      ) {
        setIsEdit(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={editWrapperRef}
      className="bg-[#F9F9F9] h-[63px] p-4 rounded-[10px] flex items-center gap-2"
    >
      <div className="flex-1 flex items-center gap-3">
        <input
          type="checkbox"
          className="w-[30px] h-[30px] appearance-none rounded-full accent-green-600 text-white border border-gray-300 checked:bg-green-500 checked:border-green-500 relative cursor-pointer before:content-[''] before:absolute before:inset-0 after:content-['✓'] after:absolute after:text-white after:text-lg after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 checked:after:opacity-100 after:opacity-0"
          checked={isChecked}
          onChange={handleCheck}
        />
        {isEdit ? (
          <input
            type="text"
            placeholder="Type todo"
            className="text-xs text-textcolor pl-2 flex-1 outline-0 bg-white h-[40px] rounded-[10px]"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setIsEdit(false)}
          />
        ) : (
          <p
            className={cn("text-xs text-textcolor", {
              "italic line-through": isChecked,
            })}
          >
            {todo.title}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button
          className="h-[30px] w-[30px] bg-[#FFFDFA] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#FFF2DD] flex items-center justify-center rounded-[10px]"
          title="Edit todo"
          onClick={() => setIsEdit(!isEdit)}
        >
          <img src={EditIcon} alt="" />
        </button>
        <button
          onClick={handleDelete}
          className="h-[30px] w-[30px] bg-[#FDF5F5] cursor-pointer transition-all duration-200 ease-in-out hover:bg-[#FFDDDD] flex items-center justify-center rounded-[10px]"
          title="Delete todo"
        >
          {isLoadingDelete ? (
            <FaCircleNotch className="text-red-500 animate-spin" />
          ) : (
            <img src={DeleteIcon} alt="" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
