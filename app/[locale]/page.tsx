"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import GrandTotal from "./components/GrandTotal";
import HeaderBar from "./components/HeaderBar";
import Pagination from "./components/Pagination";
import StatementTable from "./components/StatementTable";
import { useStatementRows } from "./hooks/useStatementRows";
import { User } from "./type";
import { downloadCsvFromRows } from "./utils/downloadCsv";

export default function StatementPage() {
  const t = useTranslations();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | "">("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  const { rows, grandTotal, loading,  fetchStatement } =
    useStatementRows();

  useEffect(() => {
    setCurrentPage(1);
  }, [rows]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users");
        return res.json();
      })
      .then((data: User[]) => setUsers(data))
      
  }, [t]);

  useEffect(() => {
    fetchStatement({ dateFrom, dateTo, selectedUserId, t });
  }, [ dateFrom, dateTo, fetchStatement, selectedUserId, t]);

  const handleDownload = () => {
    if (!downloadCsvFromRows(rows)) {
      alert(t("noDataToDownload"));
    }
  };

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const startIdx = (currentPage - 1) * pageSize;
  const paginatedRows = rows.slice(startIdx, startIdx + pageSize);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mb-10">
        <HeaderBar
          users={users}
          selectedUserId={selectedUserId}
          onUserChange={setSelectedUserId}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
          onSearch={() =>
            fetchStatement({ dateFrom, dateTo, selectedUserId, t })
          }
          onDownload={handleDownload}
          loading={loading}
        />
      </div>

      <div className="max-w-6xl mx-auto mb-6 overflow-x-auto bg-white shadow-sm rounded-lg">
        <StatementTable rows={paginatedRows} />

        {rows.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {rows.length > 0 && (
          <div className="px-6 pb-6">
            <GrandTotal
              value={grandTotal}
              formatCurrency={(v) =>
                new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(v)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}


