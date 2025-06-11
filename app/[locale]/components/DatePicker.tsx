
import React from "react";

type DatePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
};


export default function DatePicker({
  id,
  label,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div className="flex flex-col w-auto md:w-1/4">
      <label htmlFor={id} className="text-sm text-text-light mb-1">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white text-text-dark text-sm rounded px-3 py-2 focus:outline-none"
      />
    </div>
  );
}
