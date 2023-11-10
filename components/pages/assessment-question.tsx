"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Assessment } from "@/defer/lib/models/contents"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { AssessmentCode, DataEngineerings, backEnds, frontEnds } from "@/config/contents"
import axios from "axios"
import { AssessmentRequest } from "@/defer/lib/models/request"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"

export default function AssessmentQuestions() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const searchParams = useSearchParams();
    const [isLoading, setLoading] = useState(true);
    const router = useRouter();
    const [isSubmitting, setSubmit] = useState(false);

    useEffect(() => {
        loadQuestions();
    }, [])

    function loadQuestions() {
        const category = searchParams.get('category') ?? '-';
        if (category == AssessmentCode.Frontend) {
            setAssessments(frontEnds);
        } else if (category == AssessmentCode.Backend) {
            setAssessments(backEnds);
        } else {
            setAssessments(DataEngineerings);
        }

        setLoading(false);
    }
    
    function validateAssessments() {
        const newAssessments = assessments.map(assessment => {
            return { ...assessment, error: assessment.answer === null ? "This question must be answered." : null };
        });
        setAssessments(newAssessments);
    }

    function onSubmit() {
        validateAssessments();
        let request: AssessmentRequest = {
            type: searchParams.get('category') ?? '-',
            questions: [],
        };

        for (let i = 0; i < assessments.length; i++) {
            if (assessments[i].error !== null) {
                return;
            } else {
                request.questions.push({
                    question: assessments[i].question,
                    answer: assessments[i].options[assessments[i].answer ?? 0],
                });
            }
        }

        setSubmit(true);

        axios.post("/api/assessment", request)
        .then((response) => { 
            router.push(`/result/${response.data.data.id}`)
        }).catch((error) => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.response.data.message,
        });
        }).finally(() => {
            setSubmit(false);
        });
    }

    return isLoading ? (
        <QuestionSkeleton />
    ) : (
        <div>
            { assessments.map((assessment, index) => (
            <div key={index} className="text-left">
                <div className="mt-5 mb-2">
                    <Label>{`Question ${index + 1}: ${assessment.question}`}</Label>
                </div>
                <RadioGroup
                disabled={isSubmitting}
                onValueChange={(e) => {
                    assessments[index].answer = Number(e.split('-')[1]);
                    setAssessments(assessments);
                }}
                >
                    { assessment.options.map((option, optionIndex) => (
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value={`${index}-${optionIndex}`} id={`r-${index}-${optionIndex}`} />
                        <Label htmlFor={`r-${index}-${optionIndex}`}>{option}</Label>
                    </div>
                    )) }
                </RadioGroup>
                
                {assessment.error && <p className="text-red-500">{assessment.error}</p>}
            </div>
            )) }
            {isSubmitting ? (
            <Button disabled className="w-2/5 mt-12">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            ) : (
            <Button className="w-2/5 mt-12" onClick={onSubmit}>Submit</Button>
            )}
        </div>
    )
}

function QuestionSkeleton() {
    return (
        <div className="space-y-2 mt-10">
            <div className="mx-auto w-2/4">
               <Skeleton className="h-4" />
           </div>
           <div className="mx-auto w-2/5">
               <Skeleton className="h-4" />
           </div>
           <div className="mx-auto w-2/3">
               <Skeleton className="h-4" />
           </div>
           <div className="mx-auto w-3/5">
               <Skeleton className="h-4" />
           </div>
        </div>
    )
}