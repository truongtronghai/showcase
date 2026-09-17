import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/components/projects/ProjectCard";
import type { Project } from "@/data/types";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="flex flex-col gap-10">
      {projects.map((project, index) => (
        <div key={project.slug} className="flex flex-col gap-10">
          {index > 0 && <Separator />}
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
