import React from "react";
import { EventData } from "@/components/events/types";
import { Trash2 } from "lucide-react";

type EventFormProps = {
    form: Partial<EventData>;
    editing: boolean;
    loading: boolean;
    error: string | null;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleSpeakerChange: (idx: number, field: "name" | "bio", value: string) => void;
    handleAddSpeaker: () => void;
    handleRemoveSpeaker: (idx: number) => void;
    handleCancel: () => void;
};

export default function EventForm({
    form,
    editing,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleSpeakerChange,
    handleAddSpeaker,
    handleRemoveSpeaker,
    handleCancel,
}: EventFormProps) {
    return (
        <form onSubmit={handleSubmit} className="bg-white border-l-4 border-secondary rounded-2xl shadow-[2px_2px_8px_2px_rgba(102,102,153,0.15)] p-8 mb-10 w-full max-w-2xl space-y-5 transition-all duration-700">
            <h2 className="text-2xl font-extrabold text-primary mb-4 drop-shadow-sm">{editing ? "Edit Event" : "Add Event"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="title" className="block text-primary font-semibold mb-1">Title <span className='text-red-500'>*</span></label>
                    <input id="title" name="title" value={form.title || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="date" className="block text-primary font-semibold mb-1">Date <span className='text-red-500'>*</span></label>
                    <input id="date" name="date" value={form.date || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="time" className="block text-primary font-semibold mb-1">Time <span className='text-red-500'>*</span></label>
                    <input id="time" name="time" value={form.time || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="venue" className="block text-primary font-semibold mb-1">Venue <span className='text-red-500'>*</span></label>
                    <input id="venue" name="venue" value={form.venue || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="audience" className="block text-primary font-semibold mb-1">Audience <span className='text-red-500'>*</span></label>
                    <input id="audience" name="audience" value={form.audience || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="image" className="block text-primary font-semibold mb-1">Image URL <span className='text-red-500'>*</span></label>
                    <input id="image" name="image" value={form.image || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
            </div>
            <div>
                <label htmlFor="activities" className="block text-primary font-semibold mb-1">Activities <span className='text-red-500'>*</span></label>
                <textarea id="activities" name="activities" value={form.activities || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" rows={2} required />
            </div>
            <div>
                <label htmlFor="description" className="block text-primary font-semibold mb-1">Description <span className='text-red-500'>*</span></label>
                <textarea id="description" name="description" value={form.description || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" rows={3} required />
            </div>
            
            <div>
                <label className="block text-secondary font-semibold text-xl mb-2">Speakers</label>
                <div className="space-y-2">
                    {(form.speakers || []).map((speaker, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row gap-2 max-sm:mb-5 items-center">
                            <input
                                type="text"
                                value={speaker?.name || ""}
                                onChange={e => handleSpeakerChange(idx, "name", e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                                placeholder={`Speaker #${idx + 1} Name`}
                                required
                            />
                            <input
                                type="text"
                                value={speaker?.bio || ""}
                                onChange={e => handleSpeakerChange(idx, "bio", e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                                placeholder={`Speaker #${idx + 1} Bio`}
                                required
                            />
                            <button type="button" onClick={() => handleRemoveSpeaker(idx)} className="text-red-600 max-sm:py-2 hover:bg-red-100 hover:rounded-2xl hover:p-2 font-bold px-2" aria-label="Remove speaker">
                                <Trash2 size={18} />
                            </button>
                            <div className="min-sm:hidden w-full h-[1px] my-1 bg-primary-100" />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddSpeaker} className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold px-4 py-1 rounded shadow mt-1">Add Speaker</button>
                </div>
            </div>
            
            <div className="flex gap-4 mt-2">
                <button type="submit" className="w-full bg-primary cursor-pointer font-semibold text-white p-3 rounded-lg hover:bg-secondary hover:text-primary-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{editing ? "Update" : "Add"} Event</button>
                {editing && <button type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-primary-700 font-bold p-3 rounded-lg shadow-md" onClick={handleCancel}>Cancel</button>}
            </div>
            {error && <div className="text-red-500 text-sm mt-2 animate-[pulse_0.5s_ease-in-out]">{error}</div>}
        </form>
    );
}