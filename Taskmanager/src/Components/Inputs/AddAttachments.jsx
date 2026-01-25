import React, { useState } from "react";
import { HiPlus, HiOutlineTrash } from "react-icons/hi";
import { LuPaperclip } from "react-icons/lu";

const AddAttachments = ({ attachments = [], setAttachments }) => {
    const [option, setOption] = useState("");

    const handleAddOption = () => {
        if (!option.trim()) return;
        setAttachments([...attachments, option.trim()]);
        setOption("");
    };

    const handleDeleteOption = (index) => {
        const updated = attachments.filter((_, i) => i !== index);
        setAttachments(updated);
    };

    return (
        <div className="mt-2 space-y-3">

            {/* Attachment list */}
            <div className="space-y-2">
                {attachments.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 border border-slate-200 transition"
                    >
                        <div className="flex items-center gap-3">
                            <LuPaperclip className="text-slate-400 text-base" />
                            <p className="text-sm text-slate-700 truncate">
                                {item}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleDeleteOption(index)}
                            className="text-rose-500 hover:text-rose-600 transition"
                            title="Remove attachment"
                        >
                            <HiOutlineTrash className="text-base" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add attachment */}
            <div className="flex items-center gap-2 pt-1">
                <div className="flex-1 flex items-center gap-3 border border-slate-200 rounded-md px-3 py-2 bg-white">
                    <LuPaperclip className="text-slate-400 text-base" />
                    <input
                        type="text"
                        placeholder="Add file link..."
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddOption()}
                        className="w-full text-sm text-slate-700 placeholder:text-slate-400 outline-none bg-transparent"
                    />
                </div>

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

export default AddAttachments;
