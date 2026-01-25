import React, { useState } from "react";
import { HiPlus, HiOutlineTrash } from "react-icons/hi";

const TodoListInput = ({ todoList = [], setTodoList }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (!option.trim()) return;
        setTodoList([...todoList, option.trim()]);
        setOption("");
    };

    const handleDeleteOption = (index) => {
        const updated = todoList.filter((_, i) => i !== index);
        setTodoList(updated);
    };

    return (
        <div className="mt-2 space-y-3">

            {/* Tasks */}
            <div className="space-y-2">
                {todoList.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-100 border border-slate-200 hover:bg-slate-200 transition"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-slate-400">
                                {index < 9 ? `0${index + 1}` : index + 1}
                            </span>
                            <p className="text-sm text-slate-700">
                                {item}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleDeleteOption(index)}
                            className="text-rose-500 hover:text-rose-600 transition"
                            title="Delete task"
                        >
                            <HiOutlineTrash className="text-base" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add task */}
            <div className="flex items-center gap-2 pt-1">
                <input
                    type="text"
                    placeholder="Add a checklist item..."
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
                    className="flex-1 text-sm text-slate-700 placeholder:text-slate-400 outline-none border border-slate-200 rounded-md px-3 py-2 focus:ring-0"
                />

                <button
                    type="button"
                    onClick={handleAddOption}
                    className="flex items-center gap-1.5 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded-md hover:bg-slate-200 transition"
                >
                    <HiPlus className="text-base" />
                    Add
                </button>
            </div>

        </div>
    );
};

export default TodoListInput;
