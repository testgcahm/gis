import React, { useState } from "react";
import { EventData } from "@/components/events/types";
import SpeakersSection from "./SpeakersSection";
import SubeventsSection from "./SubeventsSection";
import { FolderType } from "@/types/googleDrive";
import { arrayMove } from "@dnd-kit/sortable";
import { SimpleSpinner } from "../Spinner";

// Define a local interface for subevents with imageError
interface SubeventWithError {
    time: string;
    title: string;
    description?: string;
    imageUrl?: string;
    speakers?: { name: string; bio: string }[];
    imageError?: string;
    order?: number; // For drag-and-drop reordering
}

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
    // Use subevents as SubeventWithError[] for all operations
    const subevents: SubeventWithError[] = (form.subevents as SubeventWithError[]) || [];
    // Local state for subevent image uploading and errors
    const [subeventUploading, setSubeventUploading] = useState<boolean[]>(Array(subevents.length).fill(false));
    const [subeventImageErrors, setSubeventImageErrors] = useState<string[]>(Array(subevents.length).fill(""));

    // Main event image upload state
    const [mainImageUploading, setMainImageUploading] = useState(false);
    const [mainImageError, setMainImageError] = useState("");

    // Sync state arrays if subevents length changes
    React.useEffect(() => {
        setSubeventUploading(arr => arr.length === subevents.length ? arr : Array(subevents.length).fill(false));
        setSubeventImageErrors(arr => arr.length === subevents.length ? arr : Array(subevents.length).fill(""));
    }, [subevents.length]);

    // Dedicated handler for subevent image upload
    const handleSubeventImageChange = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        let updated = [...(form.subevents || [])] as SubeventWithError[];
        if (!allowedTypes.includes(file.type)) {
            updated[idx] = { ...updated[idx], imageError: 'Only PNG, JPG, and JPEG formats are supported.' };
            setSubeventImageErrors(errors => {
                const arr = [...errors]; arr[idx] = 'Only PNG, JPG, and JPEG formats are supported.'; return arr;
            });
            handleChange({ target: { name: 'subevents', value: updated } } as any);
            return;
        }
        if (file.size > 250 * 1024) {
            updated[idx] = { ...updated[idx], imageError: 'File size must be less than 250KB.' };
            setSubeventImageErrors(errors => {
                const arr = [...errors]; arr[idx] = 'File size must be less than 250KB.'; return arr;
            });
            handleChange({ target: { name: 'subevents', value: updated } } as any);
            return;
        }
        setSubeventUploading(arr => { const copy = [...arr]; copy[idx] = true; return copy; });
        setSubeventImageErrors(errors => { const arr = [...errors]; arr[idx] = ''; return arr; });
        updated[idx] = { ...updated[idx], imageUrl: 'uploading', imageError: '' };
        handleChange({ target: { name: 'subevents', value: updated } } as any);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folderType', FolderType.Events);
            const res = await fetch('/api/image-upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            updated = [...(form.subevents || [])] as SubeventWithError[];
            if (data.success && data.url) {
                updated[idx] = { ...updated[idx], imageUrl: data.url, imageError: '' };
                setSubeventImageErrors(errors => { const arr = [...errors]; arr[idx] = ''; return arr; });
            } else {
                updated[idx] = { ...updated[idx], imageUrl: '', imageError: 'Image upload failed: ' + (data.error || 'Unknown error') };
                setSubeventImageErrors(errors => { const arr = [...errors]; arr[idx] = 'Image upload failed: ' + (data.error || 'Unknown error'); return arr; });
            }
        } catch (err) {
            updated = [...(form.subevents || [])] as SubeventWithError[];
            updated[idx] = { ...updated[idx], imageUrl: '', imageError: 'Image upload failed.' };
            setSubeventImageErrors(errors => { const arr = [...errors]; arr[idx] = 'Image upload failed.'; return arr; });
        }
        setSubeventUploading(arr => { const copy = [...arr]; copy[idx] = false; return copy; });
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    // Subevent state and handlers remain
    // Subevent speaker handlers
    const handleSubeventChange = (idx: number, field: string, value: any) => {
        const updated = [...(form.subevents || [])];
        updated[idx] = { ...updated[idx], [field]: value };
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    const handleAddSubevent = () => {
        const updated = [...(form.subevents || []), { time: '', title: '', description: '', speakers: [] }];
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    const handleRemoveSubevent = (idx: number) => {
        const updated = [...(form.subevents || [])];
        updated.splice(idx, 1);
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    const handleSubeventSpeakerChange = (subIdx: number, sIdx: number, field: "name" | "bio", value: string) => {
        const updated = [...(form.subevents || [])];
        const speakers = [...(updated[subIdx].speakers || [])];
        speakers[sIdx] = { ...speakers[sIdx], [field]: value };
        updated[subIdx] = { ...updated[subIdx], speakers };
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    const handleAddSubeventSpeaker = (subIdx: number) => {
        const updated = [...(form.subevents || [])];
        const speakers = [...(updated[subIdx].speakers || []), { name: '', bio: '' }];
        updated[subIdx] = { ...updated[subIdx], speakers };
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    const handleRemoveSubeventSpeaker = (subIdx: number, sIdx: number) => {
        const updated = [...(form.subevents || [])];
        const speakers = [...(updated[subIdx].speakers || [])];
        speakers.splice(sIdx, 1);
        updated[subIdx] = { ...updated[subIdx], speakers };
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };
    // Main event image upload handler
    const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setMainImageError('Only PNG, JPG, and JPEG formats are supported.');
            return;
        }
        if (file.size > 250 * 1024) {
            setMainImageError('File size must be less than 250KB.');
            return;
        }
        setMainImageUploading(true);
        setMainImageError("");
        handleChange({ target: { name: 'image', value: 'uploading' } } as any);
        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('folderType', FolderType.Events);
            const res = await fetch('/api/image-upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success && data.url) {
                handleChange({ target: { name: 'image', value: data.url } } as any);
                setMainImageError("");
            } else {
                setMainImageError('Image upload failed: ' + (data.error || 'Unknown error'));
                handleChange({ target: { name: 'image', value: '' } } as any);
            }
        } catch (err) {
            setMainImageError('Image upload failed.');
            handleChange({ target: { name: 'image', value: '' } } as any);
        }
        setMainImageUploading(false);
    };

    // Handle subevent drag end (reorder)
    const handleSubeventDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = parseInt(active.id, 10);
        const newIndex = parseInt(over.id, 10);
        const updated = arrayMove(subevents, oldIndex, newIndex).map((sub, i) => ({ ...sub, order: i }));
        handleChange({ target: { name: 'subevents', value: updated } } as any);
    };

    // Slug auto-update logic
    React.useEffect(() => {
        // Only update slug if user hasn't manually changed it
        const autoSlug = (form.title || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, "");
        if (
            (form.slug === undefined || form.slug === "" || form.slug === autoSlug) &&
            form.title &&
            form.title.trim() !== ""
        ) {
            handleChange({
                target: {
                    name: "slug",
                    value: autoSlug,
                    type: "text"
                }
            } as any);
        }
    }, [form.title]);

    return (
        <form onSubmit={handleSubmit} className="bg-white border-l-4 border-secondary rounded-2xl shadow-[2px_2px_8px_2px_rgba(102,102,153,0.15)] p-8 mb-10 w-full max-w-2xl space-y-5 transition-all duration-700">
            <h2 className="text-2xl font-extrabold text-primary mb-4 drop-shadow-sm">{editing ? "Edit Event" : "Add Event"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="title" className="block text-primary font-semibold mb-1">Title <span className='text-red-500'>*</span></label>
                    <input id="title" name="title" value={form.title || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>
                <div>
                    <label htmlFor="slug" className="block text-primary font-semibold mb-1">Url <span className='text-red-500'>*</span></label>
                    <input
                        id="slug"
                        name="slug"
                        value={form.slug || ""}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                        placeholder="Auto-generated from title or set manually"
                        required
                    />
                    <span className="text-xs text-gray-500">If you want to auto-update the url from the title, clear this field.</span>
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
                <div className="w-full sm:col-span-2">
                    <label htmlFor="audience" className="block text-primary font-semibold mb-1">Audience <span className='text-red-500'>*</span></label>
                    <input id="audience" name="audience" value={form.audience || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" required />
                </div>

            </div>
            <div>
                <label htmlFor="image-upload" className="block text-primary font-semibold mb-1">Event Image <span className='text-red-500'>*</span></label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    style={{ display: 'none' }}
                    onChange={handleMainImageChange}
                    disabled={mainImageUploading}
                />
                <label htmlFor="image-upload" className="w-full flex items-center justify-start px-4 py-3 bg-white border rounded-lg cursor-pointer focus:outline-none transition-all duration-300 focus:ring-1 border-gray-300 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 text-gray-500">
                    {form.image && form.image !== 'uploading' ? 'Change Image' : 'Click to select image (jpg, jpeg, png)'}
                </label>
                <p className="text-xs text-gray-600 mt-1">
                    Max size: 250KB. Supported formats: jpg, jpeg, png
                </p>
                <p className="text-xs text-gray-600 mt-1">
                    If your image is too large, compress it at <a href="https://imagecompressor.11zon.com/en/image-compressor/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">this link</a>.
                </p>
                {mainImageError && (
                    <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">{mainImageError}</p>
                )}
                {mainImageUploading && <div className="p-1"><SimpleSpinner className='w-5 h-5' /></div>}
                {form.image && form.image !== 'uploading' && (
                    <img src={form.image} title="Event" className="mt-2 max-h-24 max-w-24 rounded w-full" />
                )}
            </div>
            <div>
                <div className="flex items-center mt-2">
                    <input
                        id="register"
                        name="register"
                        type="checkbox"
                        checked={!!form.register}
                        onChange={e => handleChange({
                            target: {
                                name: 'register',
                                value: e.target.checked,
                                type: 'checkbox',
                            }
                        } as any)}
                        className="mr-2 h-5 my-3 w-5 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                    <label htmlFor="register" className="text-primary font-semibold select-none cursor-pointer">Enable registration for this event</label>
                </div>
                {/* {form.register && (
                    <div>
                        <label htmlFor="registrationLink" className="block text-primary font-semibold mb-1 mt-2">Registration Link <span className='text-red-500'>*</span></label>
                        <input
                            id="registrationLink"
                            name="registrationLink"
                            value={form.registrationLink || '/register'}
                            onChange={handleChange}
                            className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                            placeholder="/page name"
                            required
                        />
                    </div>
                )} */}
            </div>
            <div>
                <label htmlFor="activities" className="block text-primary font-semibold mb-1">Activities <span className='text-red-500'>*</span></label>
                <textarea id="activities" name="activities" value={form.activities || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" rows={2} required />
            </div>
            <div>
                <label htmlFor="description" className="block text-primary font-semibold mb-1">Description <span className='text-red-500'>*</span></label>
                <textarea id="description" name="description" value={form.description || ""} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black" rows={3} required />
            </div>

            <SpeakersSection
                speakers={form.speakers || []}
                handleSpeakerChange={handleSpeakerChange}
                handleAddSpeaker={handleAddSpeaker}
                handleRemoveSpeaker={handleRemoveSpeaker}
            />
            <SubeventsSection
                subevents={subevents}
                subeventUploading={subeventUploading}
                subeventImageErrors={subeventImageErrors}
                handleSubeventImageChange={handleSubeventImageChange}
                handleSubeventChange={handleSubeventChange}
                handleAddSubevent={handleAddSubevent}
                handleRemoveSubevent={handleRemoveSubevent}
                handleSubeventSpeakerChange={handleSubeventSpeakerChange}
                handleAddSubeventSpeaker={handleAddSubeventSpeaker}
                handleRemoveSubeventSpeaker={handleRemoveSubeventSpeaker}
                onSubeventDragEnd={handleSubeventDragEnd}
            />
            <div className="flex gap-4 mt-2">
                <button type="submit" className="w-full bg-primary cursor-pointer font-semibold text-white p-3 rounded-lg hover:bg-secondary hover:text-primary-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{editing ? "Update" : "Add"} Event</button>
                {editing && <button type="button" className="w-full bg-gray-200 hover:bg-gray-300 text-primary-700 font-bold p-3 rounded-lg shadow-md" onClick={handleCancel}>Cancel</button>}
            </div>
            {error && <div className="text-red-500 text-sm mt-2 animate-[pulse_0.5s_ease-in-out]">{error}</div>}
        </form>
    );
}