import React, { useState } from "react";
import Options from "./Options";
import dateRange from "../assets/date-range.png";
import dots from "../assets/dots.png";
import { FcRating } from "react-icons/fc";
import { PiCheckCircle } from "react-icons/pi";
// import "./todoCard.css";

const TodoCard = ({ todo, onUpdate }) => {
  const [show, setShow] = useState(false);
  const showOptions = (e) => {
    e.stopPropagation();
    setShow(!show);
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return;
    return dateValue.slice(0, 10).replaceAll("-", "/");
  };

  return (
    <div
      className={`relative p-4 flex flex-col w-[252px] h-[282px] rounded-[10px] gap-2.5 overflow-hidden ${
        todo.important
          ? "bg-[#E3EBFC]"
          : todo.complate
          ? "bg-[#FBF0E4]"
          : "bg-[#E4F6FC]"
      }`}
    >
      <div className="flex items-center justify-center gap-2.5 w-[130px] h-[30px] rounded-full bg-[#FDF8F2] mb-4 px-3 py-1">
        <img className="w-[22px] h-[22px]" src={dateRange} alt="daterange" />
        <div className="text-sm leading-5 text-[#252931]">
          {formatDate(todo.created_at)}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-[220px] h-[160px] text-sm leading-5 text-[#252931]">
        <div className="flex items-center gap-1.5">
          {todo.important && <FcRating className="w-[22px] h-[22px]" />}
          {todo.complate && <PiCheckCircle className="w-[22px] h-[22px]" />}
        </div>
        <div>{todo.description}</div>
      </div>
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={showOptions}
      >
        <img className="w-5 h-5" src={dots} alt="toggle" />
        {show && <Options todo={todo} onUpdate={onUpdate} />}
      </div>
    </div>
  );
};

export default TodoCard;
