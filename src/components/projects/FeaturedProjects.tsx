import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

const FEATURED_LIMIT = 3;

export function FeaturedProjects() {
  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, FEATURED_LIMIT);

  return (
    <section id="next" className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-muted-foreground text-sm tracking-wide uppercase">
            Selected work
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Featured projects
          </h2>
        </div>
        <Button asChild variant="outline">
          <Link href="/projects">
            View all projects
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
      {featuredProjects.length > 0 ? (
        <div className="flex flex-col gap-10">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} priority />
          ))}
        </div>
      ) : (
        <p className="border-border text-muted-foreground rounded-lg border border-dashed p-10 text-center">
          Featured projects are coming soon. In the meantime, browse the full
          collection.
        </p>
      )}
    </section>
  );
}
