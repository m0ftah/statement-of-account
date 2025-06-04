
"use client";
import React from "react";
import { User } from "../type";
import { useTranslations } from "next-intl";

type Props = {
  users: User[];
  selectedUserId: number | "";
  onUserChange: (id: number | "") => void;

  dateFrom: string;
  onDateFromChange: (value: string) => void;

  dateTo: string;
  onDateToChange: (value: string) => void;

  onFetch: () => void;
  loading: boolean;
}

export default function StatementFilters({
  users,
  selectedUserId,
  onUserChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onFetch,
  loading,
}: Props) {
  const t = useTranslations();

  return (
    <div className="flex flex-wrap items-end gap-4 mb-6 mt-10">
      <div className="flex flex-col">
        <label htmlFor="user" className="text-sm font-semibold mb-1">
          {t("selectUser")}
        </label>
        <select
          id="user"
          value={selectedUserId}
          onChange={(e) => {
            const val = e.target.value === "" ? "" : Number(e.target.value);
            onUserChange(val);
          }}
          className="border rounded px-3 py-2 w-48"
        >
          <option value="">{t("allUsers")}</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name.firstname} {u.name.lastname}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label htmlFor="fromDate" className="text-sm font-semibold mb-1">
          {t("fromLabel")}
        </label>
        <input
          id="fromDate"
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="toDate" className="text-sm font-semibold mb-1">
          {t("toLabel")}
        </label>
        <input
          id="toDate"
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={onFetch}
        disabled={loading}
        className={`mt-4 sm:mt-0 px-5 py-2 rounded text-white font-semibold ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-700 hover:bg-green-800"
        }`}
      >
        {loading ? t("loading") : t("fetchButton")}
      </button>
    </div>
  );
}
