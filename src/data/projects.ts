import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "stripe-fe-integration",
    title: "Frontend Stripe Integration",
    category: "web-app",
    description:
      "A frontend integration with Stripe's API for a SaaS analytics platform, including subscription management.",
    role: "Designed and built the full application: implemented the frontend in Next.js, integrated with Stripe's API, and set up the backend with FastAPI for subscription management.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Websocket",
      "Webhook",
      "Tailwind CSS",
      "Stripe",
      "FastAPI",
    ],
    screenshots: [{ src: "/images/stripe-fe.png", alt: "stripe integration" }],
    demoUrl: "",
    githubUrl: "https://github.com/truongtronghai/stripe-sandbox-fe",
    featured: true,
  },
  {
    slug: "logistics-website",
    title: "Multi-page Website",
    category: "freelance",
    description:
      "A multi-page website for a logistics company, featuring a homepage, services page, and contact form.",
    role: "Sole developer: scoped the architecture, implemented.",
    techStack: ["Typescript", "Next.js", "Cloudflare Pages", "Tailwind CSS"],
    screenshots: [
      {
        src: "/images/logistic-website.png",
        alt: "logistics website",
      },
    ],
    demoUrl: "https://logistic-landing-site.truongtronghai.workers.dev/",
    featured: true,
  },
  {
    slug: "showcase-website",
    title: "Showcase products and services",
    category: "freelance",
    description:
      "A showcase website for a company to display their products and services, with a focus on visual appeal and user experience.",
    role: "Sole developer: scoped the architecture, implemented.",
    techStack: ["Hugo", "Cloudflare Pages"],
    screenshots: [
      {
        src: "/images/showcase-product.png",
        alt: "showcase website",
      },
    ],
    demoUrl: "https://justmenu.truongtronghai.workers.dev/",
    featured: true,
  },
];
