import React from 'react';
import HeroMessageDisplay from '@/components/HeroMessageDisplay';
import CountdownTimerDisplay from '@/components/CountdownTimerDisplay';
import SocialLinksGroup, { SocialLink } from '@/components/SocialLinksGroup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Label might not be needed if using shadcn FormField with FormLabel
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Toaster, toast } from 'sonner'; // For form submission feedback

// Define the schema for the email form
const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// Calculate a future date for the countdown, e.g., 7 days from now
const getFutureDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const MinimalistLandingPage = () => {
  console.log('MinimalistLandingPage loaded');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Subscription form submitted:", values);
    // Placeholder for actual submission logic
    toast.success(`Thank you for subscribing, ${values.email}!`);
    form.reset(); // Reset form after submission
  }

  const socialLinks: SocialLink[] = [
    { name: 'Twitter', url: 'https://twitter.com/example', icon: 'Twitter', ariaLabel: 'Follow us on Twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/example', icon: 'Linkedin', ariaLabel: 'Connect with us on LinkedIn' },
    { name: 'GitHub', url: 'https://github.com/example', icon: 'Github', ariaLabel: 'Check our GitHub' },
  ];

  const targetLaunchDate = getFutureDate(7).toISOString();

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-slate-50 p-4 sm:p-8 selection:bg-sky-500 selection:text-white">
        <main className="max-w-2xl w-full space-y-8 md:space-y-12 text-center">
          <section aria-labelledby="hero-message">
            <h2 id="hero-message" className="sr-only">Main Announcement</h2>
            <HeroMessageDisplay
              title="Something Amazing is Coming Soon"
              subtitle="We're working hard to bring you a new experience. Stay tuned for our launch!"
              titleClassName="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500"
              subtitleClassName="mt-4 text-lg md:text-xl text-slate-300 text-center max-w-xl mx-auto"
            />
          </section>

          <section aria-labelledby="countdown-timer">
            <h2 id="countdown-timer" className="sr-only">Launch Countdown</h2>
            <CountdownTimerDisplay
              targetDate={targetLaunchDate}
              endedMessage="We have launched! Check it out now."
              onCountdownEnd={() => console.log("Countdown finished!")}
            />
          </section>

          <section aria-labelledby="subscribe-heading" className="w-full max-w-md mx-auto">
            <h2 id="subscribe-heading" className="text-xl font-semibold mb-4 text-slate-200">
              Be the first to know
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:flex sm:space-y-0 sm:space-x-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel className="sr-only">Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                          className="bg-slate-700 border-slate-600 text-slate-50 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500 h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 text-left mt-1" />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white h-12 text-base">
                  Notify Me
                </Button>
              </form>
            </Form>
          </section>

          <section aria-labelledby="social-links-heading" className="pt-4">
             <h2 id="social-links-heading" className="sr-only">Follow us on social media</h2>
            <SocialLinksGroup links={socialLinks} iconSize={22} />
          </section>
        </main>
        <footer className="absolute bottom-4 text-center w-full text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} OurCompany. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default MinimalistLandingPage;