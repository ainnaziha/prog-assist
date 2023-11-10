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
import { Skeleton } from "@/components/ui/skeleton";

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
      setLoading(false);
    });
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
 }

  return (
    <Tabs defaultValue="overview" className="w-full md:w-[600px] mx-auto px-5 md:p-0">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="recommendation">Result</TabsTrigger>
        <TabsTrigger value="overview">Overview (TBA)</TabsTrigger>
      </TabsList>
      <TabsContent value="recommendation">
        { isLoading ? (
          <ResultSkeleton />
        ) : (
          <Card>
            <CardHeader>
            <CardTitle>{capitalizeFirstLetter(result?.category ?? '-')} Result</CardTitle>
              <CardDescription>
                Date: { result?.date }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="score" className="text-lg">Overall Score: TBA</Label>
              </div>
              <div className="space-y-1">
                <Label htmlFor="compatibility" className="text-lg">Compatibility: TBA</Label>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
      <TabsContent value="recommendation">
        { isLoading ? (
          <ResultSkeleton />
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>{capitalizeFirstLetter(result?.category ?? '-')} Result</CardTitle>
              <CardDescription>
                Date: { result?.date }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="1" className="text-lg">{ result?.recommendation }</Label>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  )
}

function ResultSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="space-y-2 mt-5">
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
      </CardContent>
    </Card>
  )
}