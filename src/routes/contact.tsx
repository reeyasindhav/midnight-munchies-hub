import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [{ title: "Contact — NightOwl" }],
  }),
  component: Contact,
});

function Contact() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });
  const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    setSubmitted({ name: data.name, email: data.email });
    form.reset();
  };

  useEffect(() => {
    if (submitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [submitted]);

  return (
    <div className="py-12 night-grad min-h-screen">
      <div className="mx-auto max-w-5xl px-5">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Back to NightOwl
        </Link>

        {submitted ? (
          <div className="card-night animate-rise rounded-3xl p-10 sm:p-14 text-center">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10">
              <CheckCircle2 className="size-8 text-primary" />
            </span>
            <AnimatedHeading className="mt-6 text-3xl font-display font-bold">
              Thanks {submitted.name}!
            </AnimatedHeading>
            <p className="mt-3 text-sm text-muted-foreground">
              We&apos;ll get back to you at <span className="text-primary">{submitted.email}</span>.
            </p>
            <Button
              onClick={() => setSubmitted(null)}
              className="mt-8 rounded-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90"
            >
              Send another message
            </Button>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">Get in touch</p>
              <AnimatedHeading className="mt-3 text-3xl font-display font-bold sm:text-4xl">
                Contact us
              </AnimatedHeading>
              <p className="mt-3 text-sm text-muted-foreground">
                Questions, feedback, or partnership ideas — we&apos;d love to hear from you.
              </p>

              <div className="mt-10 space-y-4">
                <div className="card-night rounded-2xl p-4 flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary">
                    <Mail className="size-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm font-medium">hello@nightowldelivery.com</p>
                  </div>
                </div>
                <div className="card-night rounded-2xl p-4 flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary">
                    <Phone className="size-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium">+1 555 0199</p>
                  </div>
                </div>
                <div className="card-night rounded-2xl p-4 flex items-center gap-4">
                  <span className="grid size-10 place-items-center rounded-full bg-secondary">
                    <MapPin className="size-4 text-primary" />
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">Office</p>
                    <p className="text-sm font-medium">Austin, TX</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-night rounded-3xl p-8 sm:p-10">
              <h3 className="text-xl font-semibold mb-6">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Alex Chen" className="bg-surface border-border" {...field} />
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
                          <Input type="email" placeholder="you@nightshift.dev" className="bg-surface border-border" {...field} />
                        </FormControl>
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
                          <Textarea placeholder="Tell us what's on your mind..." className="bg-surface border-border min-h-[140px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full rounded-full bg-primary py-3 text-primary-foreground hover:bg-primary/90">
                    Send message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
