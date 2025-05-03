"use client";

import { useEffect, useState } from "react";
import { EventData } from "@/components/events/types";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Spinner from "@/components/Spinner";

const emptyEvent: Partial<EventData> = {
    slug: "",
    title: "",
    date: "",
    time: "",
    venue: "",
    activities: "",
    audience: "",
    description: "",
    image: "",
    register: false,
    speakers: [],
};

// Sortable event card component
function SortableEventItem({ event, listeners, attributes, setNodeRef, style, onEdit, onDelete }: any) {
    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white border border-primary-100 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-move">
            <div>
                <div className="font-bold text-lg text-primary-700">{event.title}</div>
                <div className="text-sm text-primary-500">{event.date} | {event.time} | {event.venue}</div>
                <div className="text-sm text-gray-700 mt-1">{event.description?.slice(0, 80)}{event.description && event.description.length > 80 ? "..." : ""}</div>
            </div>
            <div className="flex gap-2">
                <button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-4 py-2 rounded shadow" onClick={() => onEdit(event)}>Edit</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded shadow" onClick={() => onDelete(event.id)}>Delete</button>
            </div>
        </div>
    );
}

function DraggableEvent({ event, onEdit, onDelete }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: event.slug });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };
    return (
        <SortableEventItem
            event={event}
            listeners={listeners}
            attributes={attributes}
            setNodeRef={setNodeRef}
            style={style}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    );
}

export default function EventsManager() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<Partial<EventData> | null>(null);
    const [form, setForm] = useState<Partial<EventData>>(emptyEvent);
    const [error, setError] = useState<string | null>(null);
    const [orderChanged, setOrderChanged] = useState(false);

    // Fetch events
    const fetchEvents = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/events");
            const data = await res.json();
            setEvents(data.eventsArray || []);
        } catch (e) {
            setError("Failed to load events");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Speaker management handlers
    const handleSpeakerChange = (idx: number, field: "name" | "bio", value: string) => {
        const speakers = Array.isArray(form.speakers) ? [...form.speakers] : [];
        speakers[idx] = { ...speakers[idx], [field]: value };
        setForm({ ...form, speakers });
    };
    const handleAddSpeaker = () => {
        const speakers = Array.isArray(form.speakers) ? [...form.speakers] : [];
        speakers.push({ name: "", bio: "" });
        setForm({ ...form, speakers });
    };
    const handleRemoveSpeaker = (idx: number) => {
        const speakers = Array.isArray(form.speakers) ? [...form.speakers] : [];
        speakers.splice(idx, 1);
        setForm({ ...form, speakers });
    };

    // Add or update event
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const method = editing ? "PUT" : "POST";
            const res = await fetch("/api/events", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editing ? form : { ...form, slug: form.slug?.trim() || form.title?.toLowerCase().replace(/\s+/g, "-") }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Unknown error");
            setForm(emptyEvent);
            setEditing(null);
            fetchEvents();
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    // Edit event
    const handleEdit = (event: EventData) => {
        setEditing(event);
        setForm(event);
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Delete event
    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this event?")) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/events", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Unknown error");
            fetchEvents();
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    // Handle drag end
    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = events.findIndex(e => e.slug === active.id);
            const newIndex = events.findIndex(e => e.slug === over.id);
            const newEvents = arrayMove(events, oldIndex, newIndex);
            setEvents(newEvents);
            setOrderChanged(true);
        }
    };

    // Save new order to backend
    const handleSaveOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            // Send the new order (array of slugs) to the backend
            const res = await fetch('/api/events', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order: events.map((e, i) => ({ id: (e as any).id, order: i })) }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Unknown error');
            setOrderChanged(false);
            fetchEvents();
        } catch (e: any) {
            setError(e.message);
        }
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center pb-[200px] mb-4 min-h-[85vh] text-primary p-8 max-[400px]:p-4 max-[352px]:p-2"
        >
            <h1 className="text-4xl font-extrabold text-primary-700 mb-8 text-center">Events Admin</h1>
            {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
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
                                <div className="w-full h-[1px] my-1 bg-primary-100" />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddSpeaker} className="bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold px-4 py-1 rounded shadow mt-1">Add Speaker</button>
                    </div>
                </div>
                <div className="flex gap-4 mt-2">
                    <button type="submit" className="w-full bg-primary cursor-pointer font-semibold text-white p-3 rounded-lg hover:bg-secondary hover:text-primary-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{editing ? "Update" : "Add"} Event</button>
                    {editing && <button type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-primary-700 font-bold p-3 rounded-lg shadow-md" onClick={() => { setEditing(null); setForm(emptyEvent); }}>Cancel</button>}
                </div>
                {error && <div className="text-red-500 text-sm mt-2 animate-[pulse_0.5s_ease-in-out]">{error}</div>}
            </form>
            <div className="w-full max-w-4xl">
                <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-4">All Events
                    {orderChanged && (
                        <button onClick={handleSaveOrder} className="ml-4 text-base bg-primary-600 hover:bg-primary-700 text-white font-bold px-2 py-1 rounded shadow transition-all">Save Order</button>
                    )}
                </h2>
                {loading ? <div className="text-primary-700 pl-20 pt-10"><Spinner /></div> : (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={events.map(e => e.slug)} strategy={verticalListSortingStrategy}>
                            <div className="grid gap-6">
                                {events.length === 0 && <div className="text-gray-500">No events found.</div>}
                                {events.map((event) => (
                                    <DraggableEvent key={event.slug} event={event} onEdit={handleEdit} onDelete={handleDelete} />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </motion.div>
    );
}
