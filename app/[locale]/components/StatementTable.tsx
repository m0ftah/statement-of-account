'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import { StatementRow } from '../type'


interface Props {
  rows: StatementRow[]
}


export default function StatementTable({ rows }: Props) {
  const t = useTranslations()  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-green-200">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-800">
              {t('postingDate')}
            </th>
            <th className="px-4 py-2 text-right text-sm font-medium text-gray-800">
              {t('amount')}
            </th>
            <th className="px-4 py-2 text-center text-sm font-medium text-gray-800">
              {t('drCr')}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-800">
              {t('narrative1')}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-800">
              {t('narrative2')}
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-800">
              {t('narrative3')}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rows.map((row, idx) => (
            <tr
              key={row.orderId}
              className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
            >
              <td className="px-4 py-2 text-sm text-gray-700">
                {row.date}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 text-right">
                {row.amount.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700 text-center">
                {row.totalItems > 0 ? 'D' : 'C'}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {row.productTitles.split(', ')[0] || ''}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {row.productTitles.split(', ')[1] || ''}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {row.productTitles.split(', ')[2] || ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
