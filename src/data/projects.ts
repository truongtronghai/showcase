import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "orbit-analytics-dashboard",
    title: "Orbit Analytics Dashboard",
    category: "web-app",
    description:
      "A real-time analytics platform that aggregates product usage events and surfaces retention, funnel, and cohort insights for product teams. Includes configurable dashboards, scheduled reports, and role-based access.",
    role: "Designed and built the full application: data ingestion pipeline, aggregation queries, dashboard builder, and the component library used across the product.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS"],
    screenshots: [],
    demoUrl: "https://example.com/orbit-analytics",
    githubUrl: "https://github.com/example/orbit-analytics",
    featured: true,
    year: 2025,
  },
  {
    slug: "northwind-store-commerce",
    title: "Northwind Store Commerce",
    category: "freelance",
    description:
      "A headless commerce storefront for an independent retailer, with product catalog, cart, checkout, and order tracking. Integrated with their existing inventory system and payment provider.",
    role: "Sole developer on a three-month contract: scoped the architecture, implemented the storefront and checkout, and handed off documentation to the client's team.",
    techStack: ["React", "Stripe", "Node.js", "Sanity", "Vercel"],
    screenshots: [],
    demoUrl: "https://example.com/northwind-store",
    featured: true,
    year: 2024,
  },
  {
    slug: "clinic-booking-system",
    title: "Clinic Booking System",
    category: "freelance",
    description:
      "An appointment scheduling system for a multi-location clinic, covering practitioner availability, patient self-booking, reminders, and an administrative calendar view.",
    role: "Led development from discovery to launch, including requirements workshops with clinic staff and accessibility review with patients.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Twilio", "Tailwind CSS"],
    screenshots: [],
    githubUrl: "https://github.com/example/clinic-booking",
    featured: true,
    year: 2024,
  },
  {
    slug: "wander-travel-planner",
    title: "Wander Travel Planner",
    category: "web-app",
    description:
      "A collaborative trip-planning app where groups build itineraries together, drop pins on a shared map, and track budgets in a single place.",
    role: "Built the collaborative editing layer, map integration, and the offline-first sync strategy.",
    techStack: ["Next.js", "Mapbox", "WebSockets", "Supabase", "TypeScript"],
    screenshots: [],
    githubUrl: "https://github.com/example/wander",
    featured: false,
    year: 2023,
  },
];
