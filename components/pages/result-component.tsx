"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AssessmentResult } from "@/lib/models/contents";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation'
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

export function ResultTabs() {
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const params = useParams();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [])

function loadQuestions() {
    const id = params.id;
    axios.get(`/api/assessment/${id}`)
    .then((response) => { 
        setResult(response.data.data);
    }).catch((error) => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.response.data.message,
        });
    }).finally(() => {
    });
  }

  return (
    <Tabs defaultValue="overview" className="w-full md:w-[600px] mx-auto px-5 md:p-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="recommendation">Recommendation</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>{result?.category} Result</CardTitle>
            <CardDescription>
              Date: { result?.date }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="score" className="text-lg">Overall Score: { result?.score }</Label>
            </div>
            <div className="space-y-1">
              <Label htmlFor="compatibility" className="text-lg">Compatibility: { result?.compatibility }%</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="recommendation">
        <Card>
          <CardHeader>
            <CardTitle>Here's how you can improve</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="1" className="text-lg">{ result?.recommendation }</Label>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
