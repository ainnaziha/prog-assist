"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AssessmentResult } from "@/defer/lib/models/contents";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";


export function History() {
  const [histories, setHistories] = useState<AssessmentResult[]>([]);
  const router = useRouter();
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    loadHistories();
  }, [])

  function loadHistories() {
      axios.get("/api/assessment/history")
      .then((response) => { 
          setHistories(response.data.data);
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

  return (
    <Table>
      <TableCaption> { isLoading ? <Skeleton className="h-4 w-3/5" /> 
        : histories.length === 0 ? 'No assessments found.' : 'A list of your recent assessment.'
      } </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Result</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {histories.map((history) => (
          <TableRow onClick={() => router.push(`/result/${history.id}`)} key={history.id}>
            <TableCell className="font-medium">{history.category}</TableCell>
            <TableCell>{history.recommendation.substring(0, 20) + "..."}</TableCell>
            <TableCell>{history.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
