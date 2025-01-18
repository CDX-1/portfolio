"use client";

import { FadeText } from "@/components/ui/fade-text";
import { Separator } from "@/components/ui/separator";
import RetroGrid from "@/components/ui/retro-grid";
import { Navbar } from "@/components/navbar";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Check } from "lucide-react";

export default function Contact() {
    const [lastSubmission, setLastSubmission] = useState<number>(0);

    const formSchema = z.object({
        email: z.string().email(),
        message: z.string().max(300)
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            message: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (new Date().getTime() - lastSubmission < 1000 * 60 * 5) return;
        fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        console.log("sent");
        setLastSubmission(new Date().getTime());
    }

    return (
        <div className="mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8">
            <Navbar />

            <div className="mb-16 mt-6 sm:mb-8 sm:mt-12 w-full relative text-center">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <RetroGrid />
                </div>
                <FadeText
                    className="text-5xl font-bold"
                    text="Contact"
                    direction="down"
                    framerProps={{
                        show: { transition: { delay: 0.2 } },
                    }}
                />
                <div className="pt-2">
                    <FadeText
                        className="text-l text-silent"
                        text="Get in touch!"
                        direction="left"
                        framerProps={{
                            show: { transition: { delay: 0.2 } },
                        }}
                    />
                </div>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex justify-center items-center w-full p-4">
                {new Date().getTime() - lastSubmission < 1000 * 60 * 5 ? (
                    <div className="flex space-x-2">
                        <Check />
                        <p className="text-xl">Message sent</p>
                    </div>
                ) : (
                    <div className="w-1/2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="contact@cdx.lol" {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your contact email
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Input placeholder="I would like..." {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your message
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
}
