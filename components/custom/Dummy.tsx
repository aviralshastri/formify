import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Type,
  Calendar,
  Clock,
  CheckSquare,
  FileUp,
  Star,
  SeparatorHorizontal,
  FileEdit,
  Image,
  CircleDot,
  SquareArrowDown,
  TextCursorInput,
  AlignLeft,
} from "lucide-react";

interface DummyProps {
  label: string;
  type: string;
}

const COMPONENT_ICONS = {
  "Text Input": TextCursorInput,
  "Text Area": AlignLeft,
  Date: Calendar,
  Time: Clock,
  Checkbox: CheckSquare,
  "Radio Button": CircleDot,
  Dropdown: SquareArrowDown,
  "File Upload": FileUp,
  "Star Rating": Star,
  Separator: SeparatorHorizontal,
  "Block Markdown": FileEdit,
  "Image Component": Image,
};

const Dummy: React.FC<DummyProps> = ({ label, type }) => {
  const IconComponent = COMPONENT_ICONS[type] || Type;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <IconComponent className="h-6 w-6 text-primary" />
        <div>
          <CardTitle>{label}</CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            {type} Component
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Dummy;
