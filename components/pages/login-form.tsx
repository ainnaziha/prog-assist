"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import axios from "axios";
import { AuthRequest } from "@/defer/lib/models/request";

export default function LoginForm() {
  const router = useRouter();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({ 
    email: z.string().min(1, { message: "Email is required", })
      .email("Email is invalid"), 
    password: z.string().min(1, { message: "Password is required", })
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const request: AuthRequest = {
      name: null,
      email: values.email,
      password: values.password,
    };

    axios.post("/api/auth/login", request)
    .then(() => { 
      router.replace('/dashboard');
      form.reset();
    }).catch((error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.response.data.message,
      });
    }).finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 py-8 sm:w-[24rem]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter your password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoading ? (
            <Button disabled className="w-full mt-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            ) : (
            <Button className="w-full mt-3" type="submit">
              Login
            </Button>
          )}
        </form>
      </Form>
      <div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="terms">Don't have an account? </Label>
          <Button variant="outline" onClick={() => router.push('/register')}>
            Register
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}