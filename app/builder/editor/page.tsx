"use client";
import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Dummy from "@/components/custom/Dummy";
import {
  TextCursorInput,
  AlignLeft,
  CalendarCheck,
  TimerReset,
  SquareCheck,
  CircleDot,
  SquareArrowDown,
  Upload,
  StarIcon,
  Minus,
  ImageIcon,
  FunctionSquare,
  Trash2,
  Plus,
  GripVertical,
  LayoutGrid,
  MousePointer2,
} from "lucide-react";

const FORM_COMPONENTS = [
  {
    id: "text-input",
    icon: TextCursorInput,
    name: "Text Input",
    component: Dummy,
  },
  { id: "text-area", icon: AlignLeft, name: "Text Area", component: Dummy },
  { id: "date", icon: CalendarCheck, name: "Date", component: Dummy },
  { id: "time", icon: TimerReset, name: "Time", component: Dummy },
  { id: "checkbox", icon: SquareCheck, name: "Checkbox", component: Dummy },
  { id: "radio", icon: CircleDot, name: "Radio Button", component: Dummy },
  { id: "dropdown", icon: SquareArrowDown, name: "Dropdown", component: Dummy },
  { id: "file-upload", icon: Upload, name: "File Upload", component: Dummy },
  { id: "star-rating", icon: StarIcon, name: "Star Rating", component: Dummy },
  { id: "separator", icon: Minus, name: "Separator", component: Dummy },
  {
    id: "markdown",
    icon: FunctionSquare,
    name: "Block Markdown",
    component: Dummy,
  },
  { id: "image", icon: ImageIcon, name: "Image Component", component: Dummy },
];

interface FormElement {
  id: string;
  type: string;
  Component: React.ElementType;
  label: string;
  description?: string;
  selected?: boolean;
}

function SortableItem({
  id,
  element,
  handleRemoveElement,
  isSelectionMode,
  toggleSelection,
}: {
  id: string;
  element: FormElement;
  handleRemoveElement: (id: string) => void;
  isSelectionMode: boolean;
  toggleSelection: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: element.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center bg-transparent group relative gap-3 mb-4"
    >
      {isSelectionMode && (
        <Checkbox
          checked={element.selected}
          onCheckedChange={() => toggleSelection(element.id)}
          className="mr-2"
        />
      )}
      <div
        {...listeners}
        {...attributes}
        className="cursor-move text-gray-400 hover:text-gray-600 transition-colors"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <div className="flex-grow">
        <element.Component label={element.label} type={element.type} description={element.description} />
      </div>
      {!isSelectionMode && (
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500"
          onClick={() => handleRemoveElement(element.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

export default function Editor() {
  const [isComponentDialogOpen, setIsComponentDialogOpen] = useState(false);
  const [isLabelDialogOpen, setIsLabelDialogOpen] = useState(false);
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [currentComponent, setCurrentComponent] = useState<
    (typeof FORM_COMPONENTS)[0] | null
  >(null);
  const [labelValue, setLabelValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  const selectedCount = formElements.filter((el) => el.selected).length;

  const toggleSelection = (id: string) => {
    setFormElements((prev) =>
      prev.map((element) =>
        element.id === id
          ? { ...element, selected: !element.selected }
          : element
      )
    );
  };

  const handleDeleteSelected = () => {
    setFormElements((prev) => prev.filter((el) => !el.selected));
    if (selectedCount === formElements.length) {
      setIsSelectionMode(false);
    }
  };

  const handleComponentSelect = (component: (typeof FORM_COMPONENTS)[0]) => {
    setCurrentComponent(component);
    setIsComponentDialogOpen(false);
    setIsLabelDialogOpen(true);
  };

  const handleAddElement = () => {
    if (currentComponent && labelValue) {
      const newElement = {
        id: `${currentComponent.id}-${Date.now()}`,
        type: currentComponent.name,
        Component: currentComponent.component,
        label: labelValue,
        description: descriptionValue,
        selected: false,
      };
      setFormElements((prev) => [...prev, newElement]);
      setIsLabelDialogOpen(false);
      setLabelValue("");
      setDescriptionValue("");
      setCurrentComponent(null);
    }
  };

  const handleRemoveElement = (elementId: string) => {
    setFormElements((prev) => prev.filter((el) => el.id !== elementId));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = formElements.findIndex((el) => el.id === active.id);
      const newIndex = formElements.findIndex((el) => el.id === over.id);
      setFormElements(arrayMove(formElements, oldIndex, newIndex));
    }
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 mx-auto text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <p className="text-gray-400">No components added yet</p>
        <div className="text-center items-center justify-center flex flex-col">
          <p className="text-xl text-gray-500 max-w-md mx-auto">
            Start building your form by clicking
          </p>
          <Button
            variant="outline"
            className="flex items-center gap-2 mt-4 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => setIsComponentDialogOpen(true)}
          >
            <Plus className="h-5 w-5 text-blue-500" />
            Add Component
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col w-full bg-gray-50">
      <div className="p-4 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center">
        <Button
          variant="outline"
          className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
          onClick={() => setIsComponentDialogOpen(true)}
        >
          <Plus className="h-5 w-5 text-blue-500 hidden md:flex" />
          <LayoutGrid className="h-5 w-5 text-blue-500 flex md:hidden" />
          <span className="hidden md:flex">Add Component</span>
        </Button>

        {isSelectionMode && selectedCount > 0 && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center p-4 w-full">
        <ContextMenu>
          <ContextMenuTrigger>
            <div className="w-full mx-auto border-2 rounded-lg min-h-[24rem] flex px-6 items-center justify-center py-4 border-dashed border-gray-300 bg-white shadow-sm">
              {formElements.length === 0 ? (
                <EmptyState />
              ) : (
                <DndContext
                  onDragEnd={handleDragEnd}
                  collisionDetection={closestCenter}
                >
                  <SortableContext
                    items={formElements.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="w-full max-w-4xl mx-auto">
                      {formElements.map((element) => (
                        <SortableItem
                          key={element.id}
                          id={element.id}
                          element={element}
                          handleRemoveElement={handleRemoveElement}
                          isSelectionMode={isSelectionMode}
                          toggleSelection={toggleSelection}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => setIsComponentDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Component
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className="flex items-center gap-2"
            >
              <MousePointer2 className="h-4 w-4" />
              {isSelectionMode ? "Exit Selection Mode" : "Select Components"}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      <Dialog open={isComponentDialogOpen} onOpenChange={setIsComponentDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Select Form Component</DialogTitle>
            <DialogDescription>
              Choose a component to add to your form
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {FORM_COMPONENTS.map((component) => (
              <Button
                key={component.id}
                variant="outline"
                className="flex flex-col h-24 w-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => handleComponentSelect(component)}
              >
                <component.icon className="h-6 w-6 mb-2 text-blue-500" />
                {component.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isLabelDialogOpen} onOpenChange={setIsLabelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {currentComponent && (
                <currentComponent.icon className="h-5 w-5 text-blue-500" />
              )}
              Configure {currentComponent?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <Input
                id="label"
                value={labelValue}
                onChange={(e) => setLabelValue(e.target.value)}
                className="col-span-3"
                placeholder={`Enter label for ${currentComponent?.name}`}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                className="col-span-3"
                placeholder="Enter field description (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleAddElement}
              disabled={!labelValue}
              className="w-full sm:w-auto"
            >
              Add Component
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}