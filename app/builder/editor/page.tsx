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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
}

function SortableItem({
  id,
  element,
  handleRemoveElement,
}: {
  id: string;
  element: FormElement;
  handleRemoveElement: (id: string) => void;
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
      <div
        {...listeners}
        {...attributes}
        className="cursor-move text-gray-400 hover:text-gray-600 transition-colors"
      >
        <GripVertical className="h-5 w-5" />
      </div>
      <div
        className="flex-grow"
      >
        <element.Component label={element.label} type={element.type} />
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-red-500"
        onClick={() => handleRemoveElement(element.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
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
      };
      setFormElements((prev) => [...prev, newElement]);
      setIsLabelDialogOpen(false);
      setLabelValue("");
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

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="p-4 bg-white shadow-sm border-b border-gray-200">
        <Dialog
          open={isComponentDialogOpen}
          onOpenChange={setIsComponentDialogOpen}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Plus className="h-5 w-5 text-blue-500 hidden md:flex" />
              <LayoutGrid className="h-5 w-5 text-blue-500 flex md:hidden" />
              <span className="hidden md:flex">Add Component</span>
            </Button>
          </DialogTrigger>
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
          <DialogContent className="sm:max-w-[425px] w-[95%] max-w-full mx-auto rounded-lg sm:rounded-xl p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
                {currentComponent && (
                  <currentComponent.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                )}
                Enter Label for {currentComponent?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="label"
                  className="text-right text-sm sm:text-base"
                >
                  Label
                </Label>
                <Input
                  id="label"
                  value={labelValue}
                  onChange={(e) => setLabelValue(e.target.value)}
                  className="col-span-3"
                  placeholder={`Enter label for ${currentComponent?.name}`}
                  autoComplete="off"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleAddElement}
                disabled={!labelValue}
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600"
              >
                Add Component
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl border-2 rounded-lg min-h-[24rem] flex px-6 items-center justify-center py-4 border-dashed border-gray-300 bg-white shadow-sm">
          {formElements.length === 0 ? (
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
                <div className="text-center items-center justify-center flex flex-col ">
                  <p className="text-xl text-gray-500 max-w-md mx-auto">
                    Start building your form by clicking
                  </p>
                  <Dialog
                    open={isComponentDialogOpen}
                    onOpenChange={setIsComponentDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 mt-4 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        <Plus className="h-5 w-5 text-blue-500 hidden md:flex" />
                        <LayoutGrid className="h-5 w-5 text-blue-500 flex md:hidden" />
                        <span className="hidden md:flex">Add Component</span>
                      </Button>
                    </DialogTrigger>
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
                </div>
              </div>
            </div>
          ) : (
            <DndContext
              onDragEnd={handleDragEnd}
              collisionDetection={closestCenter}
            >
              <SortableContext
                items={formElements.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="w-full">
                  {formElements.map((element) => (
                    <SortableItem
                      key={element.id}
                      id={element.id}
                      element={element}
                      handleRemoveElement={handleRemoveElement}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
}
