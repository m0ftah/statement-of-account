
import { useTranslations } from "next-intl";
import React, { useState, useEffect, KeyboardEvent } from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const [inputValue, setInputValue] = useState(String(currentPage));
  const t = useTranslations();

  
  useEffect(() => {
    setInputValue(String(currentPage));
  }, [currentPage]);

  const atFirst = currentPage <= 1;
  const atLast = currentPage >= totalPages;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const val = Number(inputValue);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
        onPageChange(val);
      } else {
        setInputValue(String(currentPage));
      }
    }
  };

  const handleBlur = () => {
    const val = Number(inputValue);
    if (!isNaN(val) && val >= 1 && val <= totalPages) {
      onPageChange(val);
    } else {
      setInputValue(String(currentPage));
    }
  };

  return (
    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={atFirst}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full
            ${
              atFirst
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-info-dark text-white hover:bg-green-800"
            }
          `}
        >
          &laquo;
        </button>

        
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={atFirst}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full
            ${
              atFirst
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-info-dark text-white hover:bg-green-800"
            }
          `}
        >
          &lsaquo;
        </button>

       
        <span className="px-3 text-sm font-medium text-gray-800 whitespace-nowrap">
         {t(`page ${currentPage} of ${totalPages}`)}
        </span>

       
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={atLast}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full
            ${
              atLast
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-info-dark text-white hover:bg-green-800"
            }
          `}
        >
          &rsaquo;
        </button>

       
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={atLast}
          className={`
            h-8 w-8 flex items-center justify-center rounded-full
            ${
              atLast
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-info-dark text-white hover:bg-green-800"
            }
          `}
        >
          &raquo;
        </button>
      </div>

      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="
            w-14 border border-gray-300 rounded 
            px-2 py-1 text-center text-sm text-gray-700
            focus:outline-none focus:ring-2 focus:ring-green-300
          "
        />
      </div>
    </div>
  );
}
