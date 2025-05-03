import React from "react";
import { EventData } from "@/components/events/types";
import { MoveVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Spinner from "@/components/Spinner";

// Sortable event card component
function SortableEventItem({ event, listeners, attributes, setNodeRef, style, onEdit, onDelete }: any) {
    return (
        <div className="bg-white border border-primary-100 rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Draggable area */}
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="flex-grow flex items-center gap-3 cursor-move"
            >
                <div className="text-gray-400">
                    <MoveVertical size={20} />
                </div>
                <div className="flex-grow">
                    <div className="font-bold text-lg text-primary-700">{event.title}</div>
                    <div className="text-sm text-primary-500">{event.date} | {event.time} | {event.venue}</div>
                    <div className="text-sm text-gray-700 mt-1">{event.description?.slice(0, 80)}{event.description && event.description.length > 80 ? "..." : ""}</div>
                </div>
            </div>

            {/* Action buttons - outside the draggable area */}
            <div className="flex gap-2">
                <button
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold px-4 py-2 rounded shadow"
                    onClick={() => onEdit(event)}
                >Edit</button>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded shadow"
                    onClick={() => onDelete(event.id)}
                >Delete</button>
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

type DraggableEventsListProps = {
    events: EventData[];
    loading: boolean;
    orderChanged: boolean;
    handleEdit: (event: EventData) => void;
    handleDelete: (id: string) => void;
    handleDragEnd: (event: any) => void;
    handleSaveOrder: () => void;
};

export default function DraggableEventsList({
    events,
    loading,
    orderChanged,
    handleEdit,
    handleDelete,
    handleDragEnd,
    handleSaveOrder,
}: DraggableEventsListProps) {
    // Create a reversed copy of events for display
    const reversedEvents = [...events].reverse();
    
    return (
        <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-4">All Events
                {orderChanged && (
                    <button onClick={handleSaveOrder} className="ml-4 text-base bg-primary-600 hover:bg-primary-700 text-white font-bold px-2 py-1 rounded shadow transition-all">Save Order</button>
                )}
            </h2>
            {loading ? <div className="text-primary-700 pl-20 pt-10"><Spinner /></div> : (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={reversedEvents.map(e => e.slug)} strategy={verticalListSortingStrategy}>
                        <div className="grid gap-6">
                            {reversedEvents.length === 0 && <div className="text-gray-500">No events found.</div>}
                            {reversedEvents.map((event) => (
                                <DraggableEvent key={event.slug} event={event} onEdit={handleEdit} onDelete={handleDelete} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    );
}