import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/useAuthStore";
import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

export default function Authentication() {
  const [isLogin, SetIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    age: 16,
    email: "",
    password: "",
  });

  const login = useAuthStore((state) => state.login);
  const signup = useAuthStore((state) => state.signup);
  let isLoading = useAuthStore((state) => state.isLoading);

  const authenticate = () => {
    if (isLogin) {
      login(formData.email, formData.password);
    } else {
      console.log("Email: ", formData.email);
      signup(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.age
      );
    }
  };
  return (
    <div className="min-h-dvh flex items-center justify-center px-6">
      <Card className="w-full max-w-sm my-auto">
        <CardHeader>
          <CardTitle>
            {isLogin ? "Login to your account" : "Create an account"}
          </CardTitle>
          <CardDescription>
            {isLogin
              ? "Enter your email below to login to your account"
              : "Enter your information below to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  placeholder="taskative@example.com"
                  required
                />
              </div>
              {!isLogin && (
                <>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="firstName">First Name</Label>
                    </div>
                    <Input
                      id="firstName"
                      type="text"
                      min={1}
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          firstName: e.target.value,
                        }));
                      }}
                      placeholder="Jason"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="lastName">Last Name</Label>
                    </div>
                    <Input
                      id="lastName"
                      type="text"
                      min={1}
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          lastName: e.target.value,
                        }));
                      }}
                      placeholder="Edward"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="age">Age</Label>
                    </div>
                    <Input
                      id="age"
                      type="number"
                      min={1}
                      value={formData.age}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          age: parseInt(e.target.value),
                        }));
                      }}
                      required
                    />
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              authenticate();
            }}
            disabled={isLoading}
          >
            {!isLogin ? "Sign Up" : "Login"}
          </Button>
          <Button
            variant={"ghost"}
            className="w-full"
            onClick={() => {
              SetIsLogin(!isLogin);
            }}
            disabled={isLoading}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
