"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectDropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
}

const SelectDropdown = React.forwardRef<HTMLButtonElement, SelectDropdownProps>(
  ({ className, label, options, value, onChange, placeholder }, ref) => {
    // Filter out empty string values and handle undefined for clear
    const filteredOptions = options.filter((opt) => opt.value !== "");
    const selectedValue = value === "" ? undefined : value;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-[11px] font-semibold uppercase tracking-wide text-gray-500 mb-1.5">
            {label}
          </label>
        )}
        <SelectPrimitive.Root value={selectedValue} onValueChange={(val) => onChange?.(val)}>
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              "flex w-full items-center justify-between min-h-[42px] border border-gray-200 bg-white text-gray-800 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all rounded-xl",
              className
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-800 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1">
                <ChevronUp className="h-4 w-4" />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.Viewport className="p-1">
                {filteredOptions.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-3 pr-8 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100 data-[state=checked]:bg-primary/10 data-[state=checked]:text-primary"
                  >
                    <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                    <span className="absolute right-2 flex h-4 w-4 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <Check className="h-4 w-4 text-primary" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1">
                <ChevronDown className="h-4 w-4" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    );
  }
);

SelectDropdown.displayName = "SelectDropdown";

export { SelectDropdown };