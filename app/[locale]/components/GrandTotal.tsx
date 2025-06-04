'use client'
import React from 'react'

interface Props {
  value: number             
  formatCurrency: (n: number) => string
}

export default function GrandTotal({ value, formatCurrency }: Props) {
  return (
    <div className="mt-4 flex justify-end">
      <span className="text-lg font-semibold text-gray-800">
        {formatCurrency(value)}
      </span>
    </div>
  ) 
  
}
