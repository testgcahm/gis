"use client";

import { useEffect, useState, useRef } from "react";
import { EventData } from "@/components/events/types";
import { motion } from "framer-motion";
import { arrayMove } from "@dnd-kit/sortable";
import DraggableEventsList from "@/components/admin/DraggableEventsList";
import EventForm from "@/components/admin/EventForm";
import { emptyEvent } from "@/components/admin/types";

export default function EventsManager() {
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState<Partial<EventData> | null>(null);
    const [form, setForm] = useState<Partial<EventData>>(emptyEvent);
    const [error, setError] = useState<string | null>(null);
    const [orderChanged, setOrderChanged] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

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

    // Force scroll to top with multiple approaches
    useEffect(() => {
        // Immediate scroll
        if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
            
            // Also try with a slight delay
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 0);
            
            // And again with a longer delay just to be sure
            setTimeout(() => {
                window.scrollTo(0, 0);
                
                // Also try to manually set scroll position of body and html
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                
                // Focus on container as a last resort
                if (containerRef.current) {
                    containerRef.current.focus();
                }
            }, 100);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, []);

    // Scroll to top on component mount
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
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

    // Handle form cancel
    const handleCancel = () => {
        setEditing(null);
        setForm(emptyEvent);
    };

    return (
        <motion.div
            ref={containerRef}
            tabIndex={-1} // Make it focusable
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center pb-[200px] mb-4 min-h-[85vh] text-primary p-8 max-[400px]:p-4 max-[352px]:p-2"
            style={{ scrollBehavior: 'auto' }}
        >
            <h1 className="text-4xl font-extrabold text-primary-700 mb-8 text-center">Events Admin</h1>
            {error && <div className="text-red-600 font-bold mb-4">{error}</div>}
            
            {/* Event Form Component */}
            <EventForm 
                form={form}
                editing={Boolean(editing)}
                loading={loading}
                error={error}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleSpeakerChange={handleSpeakerChange}
                handleAddSpeaker={handleAddSpeaker}
                handleRemoveSpeaker={handleRemoveSpeaker}
                handleCancel={handleCancel}
            />
            
            {/* Draggable Events List Component */}
            <DraggableEventsList
                events={events}
                loading={loading}
                orderChanged={orderChanged}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDragEnd={handleDragEnd}
                handleSaveOrder={handleSaveOrder}
            />
        </motion.div>
    );
}
