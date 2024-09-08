import React from "react";
import { supabase } from "../utils/supabaseInitial";
import { useNavigate } from "react-router-dom";
import Complete from "../assets/complete.png";
import Checkmark from "../assets/checkmark.svg";
import Importance from "../assets/importance.png";
import Edit from "../assets/edit.png";
import Delete from "../assets/delete.png";
import { FcRating } from "react-icons/fc";
// import "./options.css";

const Options = ({ todo, onUpdate }) => {
  const navigate = useNavigate();

  const handleImportant = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ important: !todo.important })
      .eq("id", todo.id)
      .select();

    if (error) {
      console.error("Error updating importance:", error);
    } else {
      onUpdate();
    }
    console.log(data);
  };
  const handleComplete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ complate: !todo.complate })
      .eq("id", todo.id)
      .select();

    if (error) {
      console.error("Error updating completion status:", error);
    } else {
      onUpdate();
    }

    console.log(data, "1");
  };

  const handleEdit = () => {
    navigate(`/edit/${todo.id}`);
  };

  const handleDelete = async () => {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);

    if (error) {
      console.error("Error deleting todo:", error);
    } else {
      onUpdate();
    }
  };

  return (
    <div className="absolute top-[70px] right-[18px] w-[192px] h-[196px] p-2 bg-[#F6F6F7] rounded-lg shadow-md z-10">
      <div className="flex items-center gap-3 w-[160px] h-10 py-1 cursor-pointer" onClick={handleImportant}>
        {todo.important ? (
          <FcRating className="w-[22px] h-[22px]" />
        ) : (
          <img
            className="w-[22px] h-[22px]"
            src={Importance}
            alt="Importance"
          />
        )}
        <span className="text-sm leading-[17px] text-[#252931]">Importance</span>
      </div>
      <div className="flex items-center gap-3 w-[160px] h-10 py-1 cursor-pointer" onClick={handleComplete}>
        {todo.complate ? (
          <img className="w-[22px] h-[22px]" src={Checkmark} alt="Checkmark" />
        ) : (
          <img className="w-[22px] h-[22px]" src={Complete} alt="Complete" />
        )}
        <span className="text-sm leading-[17px] text-[#252931]">Complete</span>
      </div>
      <div className="flex items-center gap-3 w-[160px] h-10 py-1 cursor-pointer" onClick={handleEdit}>
        <img className="w-[22px] h-[22px]" src={Edit} alt="Edit" />
        <span className="text-sm leading-[17px] text-[#252931]">Edit</span>
      </div>
      <div className="flex items-center gap-3 w-[160px] h-10 py-1 cursor-pointer" onClick={handleDelete}>
        <img className="w-[22px] h-[22px]" src={Delete} alt="Delete" />
        <span className="text-sm leading-[17px] text-[#252931]">Delete</span>
      </div>
    </div>
  );
};

export default Options;
