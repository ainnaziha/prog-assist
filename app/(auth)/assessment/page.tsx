import AssessmentHeader from '@/components/pages/assessment-header';
import AssessmentQuestions from '@/components/pages/assessment-question';

export const metadata = {
  title: "Assessment",
}

export default function AssessmentTest() {
 
  return (
    <main>
      <section className="container flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-4 lg:px-40 ">
        <AssessmentHeader />
        <AssessmentQuestions />
      </section>
    </main>
  )
}