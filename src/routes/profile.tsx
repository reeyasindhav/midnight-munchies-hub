import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, LogOut, Lock, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedHeading } from "@/components/animated-heading";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequireAuth } from "@/components/require-auth";
import { useStore } from "@/lib/store";

const profileSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().email("Enter a valid email"),
});

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — NightOwl" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user, hydrated, signIn, signOut } = useStore();
  const navigate = useNavigate();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24">
        <div className="h-64 animate-pulse rounded-2xl bg-surface" />
      </div>
    );
  }

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    signIn(data.name, data.email, "customer");
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-5">
        <Link
          to="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Dashboard
        </Link>

        <div className="card-night rounded-3xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="size-5" />
            </div>
            <div>
              <AnimatedHeading className="text-2xl font-display font-bold">Your profile</AnimatedHeading>
              <p className="text-sm text-muted-foreground">
                Manage your NightOwl account.
              </p>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-surface border-border"
                        {...field}
                      />
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
                      <Input
                        type="email"
                        className="bg-surface border-border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"
              >
                Save changes
              </Button>
              <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="size-4 mr-2" /> Sign out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="card-night">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Sign out of NightOwl?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will need to sign in again to access your orders, cart, and dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => { signOut(); setLogoutOpen(false); navigate({ to: "/" }); }}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sign out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
