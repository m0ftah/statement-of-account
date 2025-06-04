// app/[locale]/statement/components/StatementTable.tsx
"use client";

import React from "react";
import { StatementRow } from "../type";
import { useTranslations } from "next-intl";

type Props = {
  rows: StatementRow[];
};

export default function StatementTable({ rows }: Props) {
  const t = useTranslations();

  const headerKeys = [
    "postingDate",
    "amount",
    "drCr",
    "narrative1",
    "narrative2",
    "narrative3",
  ] as const;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr className="bg-info-light">
            {headerKeys.map((key) => {
              // Choose alignment class based on which column:
              let alignmentClass = "text-left";
              if (key === "amount") alignmentClass = "text-right";
              else if (key === "drCr") alignmentClass = "text-center";

              return (
                <th
                  key={key}
                  className={`px-4 py-2 ${alignmentClass} text-sm font-medium text-gray-800`}
                >
                  {t(key)}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.map((row, idx) => {
            const titles = row.productTitles.split(",").map((s) => s.trim());

            return (
              <tr
                key={row.orderId}
                className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-2 text-sm text-gray-700">{row.date}</td>
                <td className="px-4 py-2 text-sm text-gray-700 text-right">
                  {row.amount.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>

                <td className="px-4 py-2 text-sm text-gray-700 text-center">
                  {row.totalItems > 0 ? "D" : "C"}
                </td>
                {[0, 1, 2].map((i) => (
                  <td key={i} className="px-4 py-2 text-sm text-gray-700">
                    {titles[i] || ""}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
