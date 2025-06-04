
export function downloadCsvFromRows(
  rows: Array<{
    orderId: number;
    date: string;
    amount: number;
    totalItems: number;
    productTitles: string;
  }>,
  filename = "statement.csv"
) {
  if (rows.length === 0) return false;

  const header = [
    "Order ID",
    "Posting Date",
    "Amount",
    "Dr/Cr",
    "Narrative 1",
    "Narrative 2",
  ];
  const csvRows: string[] = [];
  csvRows.push(header.join(","));

  const safe = (value: string | number) => {
    const str = String(value);
    if (str.includes('"') || str.includes(",")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  rows.forEach((row) => {
    const titles = row.productTitles.split(",").map((s) => s.trim());
    const narrative1 = titles[0] || "";
    const narrative2 = titles[1] || "";

    const drCr = row.totalItems > 0 ? "D" : "C";

    const rowArray = [
      safe(row.orderId),
      safe(row.date),
      safe(row.amount.toFixed(2)),
      safe(drCr),
      safe(narrative1),
      safe(narrative2),
    ];
    csvRows.push(rowArray.join(","));
  });

  const csvString = csvRows.join("\r\n");
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return true;
}
