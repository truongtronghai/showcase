import Image from "next/image";
import { ArrowUpRight, Code, Briefcase, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project, ProjectCategory } from "@/data/types";

const categoryLabels: Record<ProjectCategory, string> = {
  "web-app": "Web Application",
  freelance: "Freelance",
};

const categoryIcons: Record<ProjectCategory, typeof Briefcase> = {
  "web-app": Globe,
  freelance: Briefcase,
};

function EmptyScreenshotPlaceholder() {
  return (
    <div className="border-border bg-muted/40 text-muted-foreground flex aspect-video w-full items-center justify-center rounded-lg border border-dashed text-sm">
      Screenshot coming soon
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const firstScreenshot = project.screenshots[0];
  const CategoryIcon = categoryIcons[project.category];

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="gap-1">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary" className="gap-1">
            <CategoryIcon aria-hidden />
            {categoryLabels[project.category]}
          </Badge>
          <span className="text-muted-foreground text-sm">{project.year}</span>
        </div>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            {firstScreenshot ? (
              <div className="border-border relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image
                  src={firstScreenshot.src}
                  alt={firstScreenshot.alt}
                  fill
                  priority={priority}
                  className="object-cover"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
            ) : (
              <EmptyScreenshotPlaceholder />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-3">
            <div>
              <p className="text-sm font-medium">My role</p>
              <p className="text-muted-foreground mt-1 text-sm">
                {project.role}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((technology) => (
                <Badge key={technology} variant="outline">
                  {technology}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.demoUrl && (
                <Button asChild size="sm">
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    View demo
                    <ArrowUpRight aria-hidden />
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild variant="outline" size="sm">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    <Code aria-hidden />
                    Source
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
