import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface TextInputProps {
  label: string;
  description?: string;
  required?: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}

function TextInput({
  label,
  description,
  required = false,
  value,
  onChange,
  id,
  ...props
}: TextInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={inputId}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </Label>
      <Input
        id={inputId}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      />
    </div>
  );
}

export default TextInput;
