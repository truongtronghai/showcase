import Link from "next/link";
import { Code, Briefcase, Mail } from "lucide-react";

const footerLinks = [
  {
    label: "GitHub",
    href: "https://github.com/truongtronghai",
    icon: Code,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/truongtronghai/",
    icon: Briefcase,
  },
  {
    label: "Email",
    href: "mailto:truongtronghai@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="border-border border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-3">
            {footerLinks.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="size-4" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
