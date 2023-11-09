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
import { AssessmentResult } from "@/lib/models/contents";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";


export function History() {
  const [histories, setHistories] = useState<AssessmentResult[]>([]);
  const router = useRouter();
  
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
      });
  }

  return (
    <Table>
      <TableCaption>A list of your recent assessment.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Compatibility</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {histories.map((history) => (
          <TableRow onClick={() => router.push(`/result/${history.id}`)} key={history.id}>
            <TableCell className="font-medium">{history.category}</TableCell>
            <TableCell>{history.compatibility}</TableCell>
            <TableCell>{history.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
