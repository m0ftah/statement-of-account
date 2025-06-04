"use client";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { User } from "../type";
import LocaleToggle from "./LocaleToggle";

interface HeaderBarProps {
  users: User[];
  selectedUserId: number | "";
  onUserChange: (id: number | "") => void;

  dateFrom: string;
  onDateFromChange: (val: string) => void;

  dateTo: string;
  onDateToChange: (val: string) => void;

  onSearch: () => void;
  onDownload: () => void;

  loading: boolean; // whether the search is in progress
}

export default function HeaderBar({
  users,
  selectedUserId,
  onUserChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onSearch,
  onDownload,
  loading,
}: HeaderBarProps) {
  const t = useTranslations();

  return (
    <div className="bg-green-700 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-4">
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="account" className="text-sm text-white mb-1">
            {t("selectUser")}
          </label>
          <select
            id="account"
            value={selectedUserId}
            onChange={(e) => {
              const val = e.target.value === "" ? "" : Number(e.target.value);
              onUserChange(val);
            }}
            className="bg-white text-gray-700 text-sm rounded px-3 py-2 focus:outline-none"
          >
            <option value="">{t("allUsers")}</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name.firstname} {u.name.lastname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="fromDate" className="text-sm text-white mb-1">
            {t("fromLabel")}
          </label>
          <input
            id="fromDate"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="bg-white text-gray-700 text-sm rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="toDate" className="text-sm text-white mb-1">
            {t("toLabel")}
          </label>
          <input
            id="toDate"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="bg-white text-gray-700 text-sm rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex gap-2 mt-2 md:mt-0 ">
          <button
            onClick={onSearch}
            disabled={loading}
            className={`
              p-2 rounded-md border-2 border-white
              ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-green-700 hover:bg-green-100"
              }
            `}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onDownload}
            className="
              p-2 rounded-md border-2 border-white
              bg-white text-green-700 hover:bg-green-100
            "
          >
            <ArrowDownTrayIcon className="w-5 h-5" />
          </button>
          <LocaleToggle />
        </div>
      </div>
    </div>
  );
}
