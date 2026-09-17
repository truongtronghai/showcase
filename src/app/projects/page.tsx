import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of web applications and freelance work, with details on role, tech stack, and links.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16">
      <div className="mb-12 flex flex-col items-start gap-3">
        <p className="text-muted-foreground text-sm tracking-wide uppercase">
          Portfolio
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground max-w-2xl">
          A selection of web applications and freelance work I have designed and
          built.
        </p>
      </div>
      <ProjectList projects={projects} />
    </main>
  );
}
