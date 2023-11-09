"use client"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Assessment } from "@/lib/models/contents"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { toast } from "@/components/ui/use-toast"

export default function AssessmentQuestions() {
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const searchParams = useSearchParams();

    useEffect(() => {
        loadQuestions();
    }, [])

    function loadQuestions() {
        const category = searchParams.get('category') ?? '-';
        axios.get("/api/assessment", { params: { category: category } })
        .then((response) => { 
            setAssessments(response.data.data);
        }).catch((error) => {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.response.data.message,
            });
        }).finally(() => {
        });
    }
    
    function validateAssessments() {
        const newAssessments = assessments.map(assessment => {
            return { ...assessment, error: assessment.answer === null ? "This question must be answered." : null };
        });
        setAssessments(newAssessments);
    }

    function onSubmit() {
        validateAssessments();
        for (let i = 0; i < assessments.length; i++) {
            if (assessments[i].error !== null) {
                return;
            }
        }
    }

    return (
        <div>
            { assessments.map((assessment, index) => (
            <div key={assessment.id} className="text-left">
                <div className="mt-5 mb-2">
                    <Label>{`Question ${index + 1}: ${assessment.question}`}</Label>
                </div>
                <RadioGroup
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
            <Button className="w-2/5 mt-12" onClick={onSubmit}>Submit</Button>
        </div>
    )
}
