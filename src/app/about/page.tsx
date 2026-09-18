import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the developer behind this portfolio: background, skills, and approach.",
};

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "ShadCn",
      "Ant Design",
      "Headless CMS",
      "Responsive Design",
      "Accessibility",
      "Hugo",
      "Web Performance Optimization",
      "SEO",
      "Charts & Data Visualization",
    ],
  },
  {
    label: "Backend",
    skills: [
      "Node.js",
      "FastAPI",
      "PostgreSQL",
      "Websocket",
      "REST APIs",
      "GraphQL",
      "Serverless Functions",
      "Cloudflare Workers",
      "Webhooks",
      "Authentication & Authorization",
      "AWS Cognito",
      "Stripe API",
    ],
  },
  {
    label: "Tools & Practices",
    skills: [
      "AI Augmented",
      "SDD - Spec-driven development",
      "TDD - Test-driven development",
      "Git",
      "CI/CD",
      "Testing",
      "Clean code",
      "Agile methodology",
      "Accessibility",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <p className="text-muted-foreground text-sm tracking-wide uppercase">
        About
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Building thoughtful web applications
      </h1>
      <div className="mt-8 flex flex-col gap-8">
        <section className="max-w-2xl">
          <p className="text-lg leading-relaxed">
            I am a software engineer focused on the web — from landing pages,
            product dashboards to client SaaS platforms. I care about clean
            interfaces, well-structured code, and shipping work that holds up in
            production.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            I focused on FE. However, I can also work on both FE and BE sides
            and fullstack as well. I have experience in building web
            applications, integrating with third-party APIs, and deploying to
            cloud platforms. I enjoy working on projects that require both
            technical skills and creative problem-solving.
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            Over the years I have worked on analytics platforms, e-commerce
            build-outs, CMS, and freelance contracts where requirements and
            timelines were as important as the code itself. This portfolio
            collects selected personal work across both web applications and
            freelance engagements.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">
            Skills &amp; experience
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {skillGroups.map((group) => (
              <Card key={group.label}>
                <CardHeader>
                  <CardTitle>{group.label}</CardTitle>
                  <CardDescription>
                    Technologies I work with daily.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
