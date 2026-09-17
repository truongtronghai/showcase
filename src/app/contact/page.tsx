import type { Metadata } from "next";
import { ArrowUpRight, Code, Briefcase, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch — email and social profiles for the developer behind this portfolio.",
};

const contactEmail = "hello@example.com";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/example",
    icon: Code,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/example",
    icon: Briefcase,
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <p className="text-muted-foreground text-sm tracking-wide uppercase">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Get in touch
      </h1>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Interested in my work or have a project in mind? Reach out by email or
        find me on my social profiles.
      </p>
      <div className="mt-8 flex max-w-md flex-col gap-6">
        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <p className="text-sm font-medium">Email</p>
            <Button asChild variant="outline" className="justify-start">
              <a href={`mailto:${contactEmail}`}>
                <Mail aria-hidden />
                {contactEmail}
              </a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-3 p-6">
            <p className="text-sm font-medium">Social profiles</p>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Button
                    key={link.href}
                    asChild
                    variant="ghost"
                    className="justify-start"
                  >
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <Icon aria-hidden />
                      {link.label}
                      <ArrowUpRight className="ml-auto" aria-hidden />
                    </a>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
