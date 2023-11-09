import { AssessmentType, HeroHeader } from "@/lib/models/contents"
import { Code2, LayoutTemplate, Terminal } from "lucide-react"

/* ====================
[> CUSTOMIZING CONTENT <]
-- Setup image by typing `/image-name.file` (Example: `/header-image.jpg`)
-- Add images by adding files to /public folder
-- Leave blank `` if you don't want to put texts or images
 ==================== */

export const heroHeader: HeroHeader = {
  header: `Skill Assessment Simplified`,
  subheader: `Effortless Evaluation. Tailored Recommendations. Swift and Smart.`,
  image: `/hero-img.webp`,
}

export enum AssessmentCode {
  Frontend = 'frontend',
  Backend = 'backend',
  Framework = 'framework'
}

export const assessmentTypes: AssessmentType[] = [
  {
    icon: LayoutTemplate,
    code: AssessmentCode.Frontend,
    label: 'Frontend Development',
  },
  {
    icon: Terminal,
    code: AssessmentCode.Backend,
    label: 'Backend Skill',
  },
  {
    icon: Code2,
    code: AssessmentCode.Framework,
    label: 'Suitable Framework',
  }
]