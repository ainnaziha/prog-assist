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
import axios from "axios";
import { AuthRequest } from "@/defer/lib/models/request";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterForm() {
  const router = useRouter();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({ 
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required", })
      .email("Email is invalid"), 
    password: z.string().min(1, { message: "Password is required", })
      .min(8, { message: "Password must be at least 8 characters"}), 
    confirmPassword: z.string().min(1, { message: "Confirm Password is required", }),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ['confirmPassword']
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const request: AuthRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    axios.post("/api/auth/register", request)
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Confirm your password" {...field} />
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
            Register
          </Button>
          )}
        </form>
      </Form>
      <div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="terms">Already have an account? </Label>
          <Button variant="outline" onClick={() => router.push('/login')}>
            Login
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  )
}