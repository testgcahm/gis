import React from "react";
import SubeventSpeakersSection from "./SubeventSpeakersSection";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MoveVertical } from "lucide-react";

interface SubeventWithError {
    time: string;
    title: string;
    description?: string;
    imageUrl?: string;
    speakers?: { name: string; bio: string }[];
    imageError?: string;
}

interface SubeventsSectionProps {
    subevents: SubeventWithError[];
    subeventUploading: boolean[];
    subeventImageErrors: string[];
    handleSubeventImageChange: (e: React.ChangeEvent<HTMLInputElement>, idx: number) => void;
    handleSubeventChange: (idx: number, field: string, value: any) => void;
    handleAddSubevent: () => void;
    handleRemoveSubevent: (idx: number) => void;
    handleSubeventSpeakerChange: (subIdx: number, sIdx: number, field: "name" | "bio", value: string) => void;
    handleAddSubeventSpeaker: (subIdx: number) => void;
    handleRemoveSubeventSpeaker: (subIdx: number, sIdx: number) => void;
    onSubeventDragEnd: (event: any) => void; // <-- new prop for handling drag end
}

const SubeventsSection: React.FC<SubeventsSectionProps> = ({
    subevents,
    subeventUploading,
    subeventImageErrors,
    handleSubeventImageChange,
    handleSubeventChange,
    handleAddSubevent,
    handleRemoveSubevent,
    handleSubeventSpeakerChange,
    handleAddSubeventSpeaker,
    handleRemoveSubeventSpeaker,
    onSubeventDragEnd // <-- new prop
}) => {
    // Sortable subevent card
    function SortableSubeventItem({ sub, idx, listeners, attributes, setNodeRef, style, ...props }: any) {
        return (
            <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="border-l-4 border-primary-400 pl-4 p-3 py-2 bg-[#f6f6ff] rounded mb-2 flex flex-col">
                <div className="flex items-center mb-2 cursor-move text-gray-400"><MoveVertical size={18} className="mr-2" /> <span className="text-primary font-bold">Segment: {idx + 1}</span></div>
                {props.children}
            </div>
        );
    }

    // Give each subevent a unique id for dnd-kit
    const items = subevents.map((_, idx) => idx.toString());
    return (
        <div>
            <label className="block text-primary font-semibold text-xl mb-2">Event Segments (Subevents)</label>
            <DndContext collisionDetection={closestCenter} onDragEnd={onSubeventDragEnd}>
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                        {subevents.map((sub, idx) => {
                            const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: idx.toString() });
                            const style = {
                                transform: CSS.Transform.toString(transform),
                                transition,
                                opacity: isDragging ? 0.5 : 1,
                            };
                            return (
                                <SortableSubeventItem key={idx} sub={sub} idx={idx} setNodeRef={setNodeRef} attributes={attributes} listeners={listeners} style={style}>
                                    <div className="flex flex-col sm:flex-row gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={sub.time || ""}
                                            onChange={e => handleSubeventChange(idx, "time", e.target.value)}
                                            className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                                            placeholder="Time (e.g. 10:00 AM)"
                                            required
                                        />
                                        <input
                                            type="text"
                                            value={sub.title || ""}
                                            onChange={e => handleSubeventChange(idx, "title", e.target.value)}
                                            className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                                            placeholder="Segment Title"
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col my-3">
                                        <input
                                            id={`subevent-image-${idx}`}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg"
                                            style={{ display: 'none' }}
                                            onChange={e => handleSubeventImageChange(e, idx)}
                                        />
                                        <label htmlFor={`subevent-image-${idx}`} className="w-full flex items-center justify-start px-4 py-3 bg-white border rounded-lg cursor-pointer focus:outline-none transition-all duration-300 focus:ring-1 border-gray-300 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 text-gray-500">
                                            {sub.imageUrl && sub.imageUrl !== 'uploading' ? 'Change Image' : 'Click to select image (jpg, jpeg, png)'}
                                        </label>
                                        <p className="text-xs text-gray-600 mt-1">
                                            Max size: 250KB. Supported formats: jpg, jpeg, png
                                        </p>
                                        <p className="text-xs text-gray-600 mt-1">
                                            If your image is too large, compress it at <a href="https://imagecompressor.11zon.com/en/image-compressor/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">this link</a>.
                                        </p>
                                        {subeventImageErrors[idx] && (
                                            <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">
                                                {subeventImageErrors[idx]}
                                            </p>
                                        )}
                                        {subeventUploading[idx] && <span className="text-xs text-gray-500">Uploading...</span>}
                                        {sub.imageUrl && sub.imageUrl !== 'uploading' && (
                                            <img src={sub.imageUrl} alt="Segment" className="mt-2 max-h-24 rounded" />
                                        )}
                                    </div>
                                    <textarea
                                        value={sub.description || ""}
                                        onChange={e => handleSubeventChange(idx, "description", e.target.value)}
                                        className="w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 border-gray-300 text-black"
                                        placeholder="Segment Description"
                                        rows={2}
                                        required
                                    />
                                    <SubeventSpeakersSection
                                        speakers={sub.speakers || []}
                                        onChange={(sidx, field, value) => handleSubeventSpeakerChange(idx, sidx, field, value)}
                                        onAdd={() => handleAddSubeventSpeaker(idx)}
                                        onRemove={sidx => handleRemoveSubeventSpeaker(idx, sidx)}
                                    />
                                    <button type="button" onClick={() => handleRemoveSubevent(idx)} className="text-red-600 mt-2 px-2 font-bold">Remove Segment</button>
                                </SortableSubeventItem>
                            );
                        })}
                        <button type="button" onClick={handleAddSubevent} className="bg-secondary text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-secondary-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50 mt-2">Add Segment</button>
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default SubeventsSection;
