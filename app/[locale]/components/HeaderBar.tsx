
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { User } from "../type";
import LocaleToggle from "./LocaleToggle";
import DatePicker from "./DatePicker";

type HeaderBarProps = {
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
};

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
    <div className="bg-info-dark px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-4">
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="account" className="text-sm text-text-light mb-1">
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

        <DatePicker
          id="fromDate"
          label={t("fromLabel")}
          value={dateFrom}
          onChange={onDateFromChange}
        />

        <DatePicker
          id="toDate"
          label={t("toLabel")}
          value={dateTo}
          onChange={onDateToChange}
        />

        <div className="flex gap-2 mt-2 md:mt-0 ">
          <button
            onClick={onSearch}
            disabled={loading}
            className={`
              p-2 rounded-md border-2 border-white
              ${
                loading
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white text-info-dark hover:bg-green-100"
              }
            `}
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>

          <button
            onClick={onDownload}
            className="
              p-2 rounded-md border-2 border-white
              bg-white text-info-dark hover:bg-green-100
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
