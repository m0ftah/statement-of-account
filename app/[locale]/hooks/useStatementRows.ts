import { useState, useCallback } from "react";
import type { Cart, Product, StatementRow } from "../type";

export function useStatementRows() {
  const [rows, setRows] = useState<StatementRow[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStatement = useCallback(
    async (opts: {
      dateFrom?: string;
      dateTo?: string;
      selectedUserId?: number | "";
      t: (key: string) => string;
    }) => {
      const { dateFrom, dateTo, selectedUserId, t } = opts;
      setError(null);
      setLoading(true);
      setRows([]);
      setGrandTotal(0);

      try {
        const [cartsRes, productsRes] = await Promise.all([
          fetch("https://fakestoreapi.com/carts"),
          fetch("https://fakestoreapi.com/products"),
        ]);
        if (!cartsRes.ok || !productsRes.ok) {
          throw new Error("Fetch failed");
        }
        const carts: Cart[] = await cartsRes.json();
        const products: Product[] = await productsRes.json();

        const priceMap = new Map<number, number>();
        const titleMap = new Map<number, string>();
        products.forEach((p) => {
          priceMap.set(p.id, p.price);
          titleMap.set(p.id, p.title);
        });

        let fromDateObj: Date | null = null;
        let toDateObj: Date | null = null;
        if (dateFrom) fromDateObj = new Date(dateFrom + "T00:00:00");
        if (dateTo) toDateObj = new Date(dateTo + "T23:59:59");

        const filtered = carts.filter((cart) => {
          const cartDate = new Date(cart.date);
          if (fromDateObj && cartDate < fromDateObj) return false;
          if (toDateObj && cartDate > toDateObj) return false;
          if (selectedUserId !== "" && cart.userId !== selectedUserId)
            return false;
          return true;
        });

        const computed: StatementRow[] = filtered.map((cart) => {
          let totalAmount = 0;
          let totalItems = 0;
          const titles: string[] = [];

          cart.products.forEach((item) => {
            const unitPrice = priceMap.get(item.productId) ?? 0;
            totalItems += item.quantity;
            totalAmount += unitPrice * item.quantity;
            titles.push(titleMap.get(item.productId) ?? "Unknown");
          });

          return {
            orderId: cart.id,
            date: new Date(cart.date).toLocaleDateString(),
            amount: totalAmount,
            totalItems,
            productTitles: titles.join(", "),
          };
        });

        const sum = computed.reduce((acc, r) => acc + r.amount, 0);
        setRows(computed);
        setGrandTotal(sum);
      } catch (err) {
        console.error(err);
        setError(t("errorFetchStatement"));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { rows, grandTotal, loading, error, fetchStatement };
}
