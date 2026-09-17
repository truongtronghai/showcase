export type ProjectCategory = "web-app" | "freelance";

export interface Screenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  role: string;
  techStack: string[];
  screenshots: Screenshot[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
}
