"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import SignUp from "@/app/(auth)/sign-up/page";
import { useRouter } from "next/navigation";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    console.log(values);
    try {
      //sign up with Appwrite & create plaid token
      if (type === "sign-up") {
        // const newUser = await SignUp(values)
        // setUser(newUser)
      }
      if (type === "sign-in") {
        // const response = await SignIn({
        //   email: values.email,
        //   password: values.password,
        // });
        // if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className="cursor-pointer items-center gap-1 flex ">
          <Image
            src={"/icons/logo.svg"}
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign in" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600 mt-2">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-2 w-full">
                    <CustomInput
                      name="firstName"
                      label={"First Name"}
                      control={form.control}
                      placeholder={"ex:John"}
                      type=""
                    />
                    <CustomInput
                      name="lastName"
                      label={"Last Name"}
                      control={form.control}
                      placeholder={"ex:Doe"}
                      type=""
                    />
                  </div>
                  <CustomInput
                    name="address1"
                    label={"Address"}
                    control={form.control}
                    placeholder={"Enter your specific address"}
                    type=""
                  />
                  <CustomInput
                    name="city"
                    label={"City"}
                    control={form.control}
                    placeholder={"Enter your city"}
                    type=""
                  />
                  <div className="flex gap-2 w-full ">
                    <CustomInput
                      name="state"
                      label={"State"}
                      control={form.control}
                      placeholder={"ex:Kumasi"}
                      type=""
                    />
                    <CustomInput
                      name="postCode"
                      label={"Post Code"}
                      control={form.control}
                      placeholder={"ex:11101"}
                      type="number"
                    />
                  </div>
                  <div className="flex gap-2 w-full ">
                    <CustomInput
                      name="dateOfBirth"
                      label={"Date of Birth"}
                      control={form.control}
                      placeholder={""}
                      type="date"
                    />
                    <CustomInput
                      name="ssn"
                      label={"SSN"}
                      control={form.control}
                      placeholder={"ex:1234"}
                      type="number"
                    />
                  </div>
                </>
              )}
              <CustomInput
                name="email"
                label={"Email"}
                control={form.control}
                placeholder={"Enter your email"}
                type=""
              />
              <CustomInput
                name="password"
                label={"Password"}
                control={form.control}
                placeholder={"Enter your password"}
                type="password"
              />
              <div className=" flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      &nbsp; Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
