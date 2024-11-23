import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
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
  description: string;
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

const Dummy: React.FC<DummyProps> = ({ label, description = "None", type }) => {
  const IconComponent = COMPONENT_ICONS[type] || Type;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center space-x-4">
        <IconComponent className="h-6 w-6 text-primary" />
        <div>
          <CardTitle className="text-lg">{label}</CardTitle>
          <CardDescription>
            <p className="text-muted-foreground text-md">{description}</p>
            <p className="text-sm">({type} Component)</p>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Dummy;
