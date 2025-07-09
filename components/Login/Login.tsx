"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowRight, Eye, EyeOff, LoaderCircle, Shield } from "lucide-react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/store/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schema/userSchema"
import type { z } from "zod"
import Cookies from 'js-cookie';
import { adminLogin } from "@/store/features/auth-slice"
import { useToast } from "@/hooks/use-toast"

export default function Login() {
  const { toast } = useToast();
  const route = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")


  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    try {
      setIsLoading(true);
      const res = await dispatch(adminLogin(data)).unwrap();
      console.log(res);
      if (res.status === 200) {
        Cookies.set("token", res.data.accessToken);
        route.push("/dashboard");
        toast({ variant: "success", title: "Login Successful!" });
      } else {
        throw new Error(res.data.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.log("Error logging in: ", error);
      toast({ variant: "destructive", title: "Login failed!", description: error?.message || "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Access the Zappy administration panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                id="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>LogIn
              {isLoading ? <LoaderCircle className='animate-spin h-4 w-4 ml-2' /> : <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Demo Credentials:</strong>
              <br />
              Email: admin@gmail.com
              <br />
              Password: 12345678
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
