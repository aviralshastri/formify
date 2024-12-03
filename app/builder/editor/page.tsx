"use client";
import React, { useEffect, useState } from "react";
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
  Settings,
  Eye,
  X,
  MessageCircleCode,
  HomeIcon,
  LayoutDashboard,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoadingScreen from "@/components/custom/LoadingScreen";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { addHours, setHours, setMinutes, isBefore, isEqual } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import Chatbot from "@/components/custom/Chatbot";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo-light.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <element.Component
          label={element.label}
          type={element.type}
          description={element.description}
        />
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
  const [loading, setLoading] = useState<boolean>(true);
  const [formElements, setFormElements] = useState<FormElement[]>([]);
  const [currentComponent, setCurrentComponent] = useState<
    (typeof FORM_COMPONENTS)[0] | null
  >(null);
  const [labelValue, setLabelValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const selectedCount = formElements.filter((el) => el.selected).length;
  const [publishScheduleEnabled, setPublishScheduleEnabled] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [useMarkdownFile, setUseMarkdownFile] = useState(false);

  const now = new Date();
  const minDateTime = addHours(now, 1);

  const [startDate, setStartDate] = React.useState<Date | undefined>(
    minDateTime
  );
  const [startHour, setStartHour] = React.useState(
    minDateTime.getHours().toString().padStart(2, "0")
  );
  const [startMinute, setStartMinute] = React.useState(
    minDateTime.getMinutes().toString().padStart(2, "0")
  );

  const [endDate, setEndDate] = React.useState<Date | undefined>(
    addHours(minDateTime, 1)
  );
  const [endHour, setEndHour] = React.useState(
    addHours(minDateTime, 1).getHours().toString().padStart(2, "0")
  );
  const [endMinute, setEndMinute] = React.useState(
    minDateTime.getMinutes().toString().padStart(2, "0")
  );

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const isStartTimeValid = (hour: string, minute: string) => {
    if (!startDate) return false;
    const selectedDateTime = setMinutes(
      setHours(startDate, parseInt(hour)),
      parseInt(minute)
    );
    return !isBefore(selectedDateTime, minDateTime);
  };

  const isEndTimeValid = (hour: string, minute: string) => {
    if (!endDate || !startDate) return false;
    const selectedDateTime = setMinutes(
      setHours(endDate, parseInt(hour)),
      parseInt(minute)
    );
    const startDateTime = setMinutes(
      setHours(startDate, parseInt(startHour)),
      parseInt(startMinute)
    );
    return (
      !isBefore(selectedDateTime, startDateTime) &&
      !isEqual(selectedDateTime, startDateTime)
    );
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (file && validTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage({
          file: file,
          preview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image (JPEG, PNG, GIF, WEBP)");
      e.target.value = null;
    }
  };

  const clearBannerImage = () => {
    setBannerImage(null);
    const fileInput = document.getElementById("banner-upload");
    if (fileInput) fileInput.value = null;
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem("formele");

    if (storedData) {
      const parsedData: FormElement[] = JSON.parse(storedData).map(
        (element) => ({
          ...element,
          Component: Dummy,
        })
      );

      if (parsedData && Array.isArray(parsedData)) {
        setFormElements(parsedData);
      }
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("formele", JSON.stringify(formElements));
  }, [formElements]);

  if (loading) {
    return (
      <LoadingScreen
        description="Fetching the form data..."
        heading="Please wait, we are preparing your form!"
      />
    );
  }

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

  const handlePreview = () => {
    sessionStorage.setItem("formele", JSON.stringify(formElements));
    const newTab = window.open("/builder/preview", "_blank");
    if (newTab) {
      newTab.focus();
    }
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
        <div className="flex flex-row space-x-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {" "}
                <Link
                  href={"/"}
                  className="flex items-center rounded-lg border p-1"
                >
                  <HomeIcon size={25} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={"/dashboard"}
                  className="flex items-center rounded-lg border p-1"
                >
                  <LayoutDashboard size={25} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            onClick={() => setIsComponentDialogOpen(true)}
          >
            <Plus className="h-5 w-5 text-blue-500 hidden md:flex" />
            <LayoutGrid className="h-5 w-5 text-blue-500 flex md:hidden" />
            <span className="hidden md:flex">Add Component</span>
          </Button>
        </div>

        <div
          className={`items-center space-x-6 px-4 py-1 border rounded-lg ${
            isSelectionMode ? "hidden" : "flex"
          }`}
        >
          <Sheet>
            <SheetTrigger asChild>
              <div className="border p-1 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer">
                <Settings className="h-5 w-5 text-black" />
              </div>
            </SheetTrigger>
            <SheetContent className="px-4 w-full">
              <SheetHeader>
                <SheetTitle className="text-2xl">Form Settings</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-full mb-10">
                <div className="flex flex-col py-4 space-y-4">
                  <div className="space-y-2">
                    <div>
                      <Label className="pl-1">Title</Label>
                      <Input placeholder="Enter Title" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="markdown-switch"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Use Markdown File
                        </Label>
                        <Switch
                          id="markdown-switch"
                          checked={useMarkdownFile}
                          onCheckedChange={setUseMarkdownFile}
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor={
                            useMarkdownFile ? "markdown-file" : "description"
                          }
                          className="pl-1"
                        >
                          Description
                        </Label>
                        {useMarkdownFile ? (
                          <Input
                            id="markdown-file"
                            type="file"
                            accept=".md"
                            className="mt-1"
                            aria-describedby="file-input-description"
                          />
                        ) : (
                          <Input
                            id="description"
                            placeholder="Enter Description"
                            className="mt-1"
                          />
                        )}
                      </div>
                      {useMarkdownFile && (
                        <p
                          id="file-input-description"
                          className="text-sm text-muted-foreground"
                        >
                          Please attach a .md file for the description.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Banner */}
                  <div className="space-y-1">
                    <Label className="pl-1 flex items-center">Banner</Label>
                    <Input
                      id="banner-upload"
                      placeholder="Choose a banner"
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleBannerChange}
                    />
                    {bannerImage && (
                      <div className="mt-2 relative">
                        <img
                          src={bannerImage.preview}
                          alt="Banner Preview"
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <button
                          onClick={clearBannerImage}
                          className="absolute top-2 right-2 bg-white/50 rounded-full p-1 hover:bg-white/75"
                        >
                          <X className="h-4 w-4 text-black" />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Publish Schedule</Label>
                      <Switch
                        checked={publishScheduleEnabled}
                        onCheckedChange={setPublishScheduleEnabled}
                      />
                    </div>
                    {publishScheduleEnabled && (
                      <div className="space-y-8">
                        <div className="space-y-2">
                          <Label className="pl-1">Start</Label>
                          <div className="flex space-x-4 items-end">
                            <div className="flex-1">
                              <Label className="pl-1 text-xs text-muted-foreground mb-2 block">
                                Date
                              </Label>
                              <DatePicker
                                date={startDate}
                                setDate={setStartDate}
                                minDate={minDateTime}
                              />
                            </div>
                            <div className="flex-1">
                              <Label className="pl-1 text-xs text-muted-foreground mb-2 block">
                                Time
                              </Label>
                              <div className="flex space-x-2">
                                <Select
                                  value={startHour}
                                  onValueChange={setStartHour}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="HH" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hours.map((hour) => (
                                      <SelectItem
                                        key={hour}
                                        value={hour}
                                        disabled={
                                          !isStartTimeValid(
                                            hour,
                                            startMinute,
                                            startDate
                                          )
                                        }
                                      >
                                        {hour}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={startMinute}
                                  onValueChange={setStartMinute}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="MM" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {minutes.map((minute) => (
                                      <SelectItem
                                        key={minute}
                                        value={minute}
                                        disabled={
                                          !isStartTimeValid(
                                            startHour,
                                            minute,
                                            startDate
                                          )
                                        }
                                      >
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="pl-1">End</Label>
                          <div className="flex space-x-4 items-end">
                            <div className="flex-1">
                              <Label className="pl-1 text-xs text-muted-foreground mb-2 block">
                                Date
                              </Label>
                              <DatePicker
                                date={endDate}
                                setDate={setEndDate}
                                minDate={startDate || minDateTime}
                              />
                            </div>
                            <div className="flex-1">
                              <Label className="pl-1 text-xs text-muted-foreground mb-2 block">
                                Time
                              </Label>
                              <div className="flex space-x-2">
                                <Select
                                  value={endHour}
                                  onValueChange={setEndHour}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="HH" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {hours.map((hour) => (
                                      <SelectItem
                                        key={hour}
                                        value={hour}
                                        disabled={
                                          !isEndTimeValid(
                                            hour,
                                            endMinute,
                                            startDate,
                                            endDate
                                          )
                                        }
                                      >
                                        {hour}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Select
                                  value={endMinute}
                                  onValueChange={setEndMinute}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="MM" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {minutes.map((minute) => (
                                      <SelectItem
                                        key={minute}
                                        value={minute}
                                        disabled={
                                          !isEndTimeValid(
                                            endHour,
                                            minute,
                                            startDate,
                                            endDate
                                          )
                                        }
                                      >
                                        {minute}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit" className="w-full mb-10">
                      Save Changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <button
            onClick={handlePreview}
            className="border p-1 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <Eye className="h-5 w-5 text-black" />
          </button>
          <Button>Publish</Button>
        </div>

        {isSelectionMode && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {selectedCount} item{selectedCount !== 1 ? "s" : ""} selected
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => setIsSelectionMode(!isSelectionMode)}
              className="flex items-center gap-2"
            >
              <MousePointer2 className="h-4 w-4" />
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

      <Dialog
        open={isComponentDialogOpen}
        onOpenChange={setIsComponentDialogOpen}
      >
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
      <div>
        <Chatbot />
      </div>
    </div>
  );
}
