'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { assessmentTypes } from "@/config/contents";
import { useRouter } from "next/navigation";

export default function AssessmentMenu() {
  const router = useRouter();

  const menus = assessmentTypes.map((item) => {
    const Icon = item.icon;
    return (
      <DropdownMenuItem key={item.code} onClick={() => {
        const url = new URL('/assessment', window.location.origin);
        url.searchParams.append('category', item.code);
        router.push(url.toString());
       }}>
        <Icon className="mr-2 h-4 w-4" />
        <span>{ item.label }</span>
      </DropdownMenuItem>
    )
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test your skills</CardTitle>
        <CardDescription>Please choose category</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="items-center justify-between space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Click Me</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            { menus }
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        </CardContent>
    </Card>
  )
}