"use client";
import { GlobeAltIcon } from "@heroicons/react/16/solid";
import { useLocale } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function LocaleToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const otherLocale = locale === "en" ? "ar" : "en";

  const nextPathname = pathname.replace(
    /^\/(en|ar)(\/|$)/,
    `/${otherLocale}$2`
  );

  const qs = searchParams.toString();
  const href = qs ? `${nextPathname}?${qs}` : nextPathname;

  const label = otherLocale === "en" ? "English" : "العربية";

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="
              p-2 rounded-md border-2 border-white
              bg-white text-green-700 hover:bg-green-100
            "
    >
      <GlobeAltIcon className="w-5 h-5" />
    </button>
  );
}
