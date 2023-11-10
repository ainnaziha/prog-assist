'use client'

import { useSearchParams } from 'next/navigation'

export default function AssessmentHeader() {
  const searchParams = useSearchParams();
 
  return (
    <h3 className="text-lg font-light lg:text-2xl">
        Test for { searchParams.get('category') ?? '-' }
    </h3>
  )
}