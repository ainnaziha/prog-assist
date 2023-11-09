"use client"

import AssessmentQuestions from '@/components/pages/assessment-question';
import { useSearchParams } from 'next/navigation'

export default function Dashboard() {
  const searchParams = useSearchParams();
 
  return (
    <main>
      <section className="container flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-4 lg:px-40 ">
        <h3 className="text-lg font-light lg:text-2xl">
          Test for { searchParams.get('category') ?? '-' }
        </h3>
        <AssessmentQuestions />
      </section>
    </main>
  )
}