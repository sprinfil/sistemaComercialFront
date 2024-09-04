import * as React from "react";
import { cn } from "../../lib/utils";
import {  Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export interface DiameterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; label: string }[];
  placeholder?: string;
  className?: string;
}

const DiameterSelect: React.FC<DiameterSelectProps> = ({ value, onChange, options, placeholder, className }) => {
    return (
        <Select
          value={value}
          onValueChange={onChange}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <SelectTrigger className="flex h-full items-center justify-between px-2 py-1 border rounded-md bg-white text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            <SelectValue placeholder={placeholder || "Selecciona un diámetro"} />
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 9l4 4 4-4"
                />
              </svg>
            </span>
          </SelectTrigger>
          <SelectContent className="mt-1 rounded-md border border-gray-300 bg-white shadow-lg">
            {options.map(option => (
              <SelectItem
                key={option.id}
                value={option.id}
                className="px-4 py-2 text-sm hover:bg-gray-100"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
};

DiameterSelect.displayName = "DiameterSelect";

export { DiameterSelect };
