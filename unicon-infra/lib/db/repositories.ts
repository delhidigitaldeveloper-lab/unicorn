import { readJSON, writeJSON, generateId } from "./store";
import {
  Project,
  BlogPost,
  TeamMember,
  Testimonial,
  GalleryImage,
  VideoItem,
  FounderProfile,
  SiteSettings,
  SeoSetting,
  ContactSubmission,
  ThemeSettings,
  JointVenture,
} from "@/lib/types";

/* ----------------------------- Projects ----------------------------- */

const PROJECTS_FILE = "projects.json";

export async function getAllProjects(): Promise<Project[]> {
  const items = await readJSON<Project[]>(PROJECTS_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const items = await getAllProjects();
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getProjectById(id: string): Promise<Project | null> {
  const items = await getAllProjects();
  return items.find((p) => p.id === id) ?? null;
}

export async function createProject(data: Omit<Project, "id">): Promise<Project> {
  const items = await getAllProjects();
  const project: Project = { ...data, id: generateId("proj") };
  await writeJSON(PROJECTS_FILE, [...items, project]);
  return project;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id">>
): Promise<Project | null> {
  const items = await getAllProjects();
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(PROJECTS_FILE, items);
  return updated;
}

export async function deleteProject(id: string): Promise<boolean> {
  const items = await getAllProjects();
  const filtered = items.filter((p) => p.id !== id);
  await writeJSON(PROJECTS_FILE, filtered);
  return filtered.length !== items.length;
}

/* ----------------------------- Blog Posts ---------------------------- */

const BLOG_FILE = "blog.json";

export async function getAllBlogPosts(opts?: { publishedOnly?: boolean }): Promise<BlogPost[]> {
  const items = await readJSON<BlogPost[]>(BLOG_FILE, []);
  const sorted = [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
  return opts?.publishedOnly ? sorted.filter((p) => p.published) : sorted;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  const items = await getAllBlogPosts();
  return items.find((p) => p.slug === slug) ?? null;
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  const items = await getAllBlogPosts();
  return items.find((p) => p.id === id) ?? null;
}

export async function createBlogPost(data: Omit<BlogPost, "id">): Promise<BlogPost> {
  const items = await getAllBlogPosts();
  const post: BlogPost = { ...data, id: generateId("post") };
  await writeJSON(BLOG_FILE, [...items, post]);
  return post;
}

export async function updateBlogPost(
  id: string,
  data: Partial<Omit<BlogPost, "id">>
): Promise<BlogPost | null> {
  const items = await getAllBlogPosts();
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(BLOG_FILE, items);
  return updated;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const items = await getAllBlogPosts();
  const filtered = items.filter((p) => p.id !== id);
  await writeJSON(BLOG_FILE, filtered);
  return filtered.length !== items.length;
}

/* ---------------------------- Team Members --------------------------- */

const TEAM_FILE = "team.json";

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const items = await readJSON<TeamMember[]>(TEAM_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const items = await getAllTeamMembers();
  return items.find((t) => t.id === id) ?? null;
}

export async function createTeamMember(data: Omit<TeamMember, "id">): Promise<TeamMember> {
  const items = await getAllTeamMembers();
  const member: TeamMember = { ...data, id: generateId("team") };
  await writeJSON(TEAM_FILE, [...items, member]);
  return member;
}

export async function updateTeamMember(
  id: string,
  data: Partial<Omit<TeamMember, "id">>
): Promise<TeamMember | null> {
  const items = await getAllTeamMembers();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(TEAM_FILE, items);
  return updated;
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  const items = await getAllTeamMembers();
  const filtered = items.filter((t) => t.id !== id);
  await writeJSON(TEAM_FILE, filtered);
  return filtered.length !== items.length;
}

/* --------------------------- Joint Ventures --------------------------- */

const JOINT_VENTURES_FILE = "joint-ventures.json";

export async function getAllJointVentures(): Promise<JointVenture[]> {
  const items = await readJSON<JointVenture[]>(JOINT_VENTURES_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getJointVentureById(id: string): Promise<JointVenture | null> {
  const items = await getAllJointVentures();
  return items.find((j) => j.id === id) ?? null;
}

export async function createJointVenture(data: Omit<JointVenture, "id">): Promise<JointVenture> {
  const items = await getAllJointVentures();
  const venture: JointVenture = { ...data, id: generateId("jv") };
  await writeJSON(JOINT_VENTURES_FILE, [...items, venture]);
  return venture;
}

export async function updateJointVenture(
  id: string,
  data: Partial<Omit<JointVenture, "id">>
): Promise<JointVenture | null> {
  const items = await getAllJointVentures();
  const index = items.findIndex((j) => j.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(JOINT_VENTURES_FILE, items);
  return updated;
}

export async function deleteJointVenture(id: string): Promise<boolean> {
  const items = await getAllJointVentures();
  const filtered = items.filter((j) => j.id !== id);
  await writeJSON(JOINT_VENTURES_FILE, filtered);
  return filtered.length !== items.length;
}

/* ----------------------------- Testimonials --------------------------- */

const TESTIMONIALS_FILE = "testimonials.json";

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const items = await readJSON<Testimonial[]>(TESTIMONIALS_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  const items = await getAllTestimonials();
  return items.find((t) => t.id === id) ?? null;
}

export async function createTestimonial(data: Omit<Testimonial, "id">): Promise<Testimonial> {
  const items = await getAllTestimonials();
  const testimonial: Testimonial = { ...data, id: generateId("test") };
  await writeJSON(TESTIMONIALS_FILE, [...items, testimonial]);
  return testimonial;
}

export async function updateTestimonial(
  id: string,
  data: Partial<Omit<Testimonial, "id">>
): Promise<Testimonial | null> {
  const items = await getAllTestimonials();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(TESTIMONIALS_FILE, items);
  return updated;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const items = await getAllTestimonials();
  const filtered = items.filter((t) => t.id !== id);
  await writeJSON(TESTIMONIALS_FILE, filtered);
  return filtered.length !== items.length;
}

/* ---------------------------- Gallery Images -------------------------- */

const GALLERY_FILE = "gallery.json";

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const items = await readJSON<GalleryImage[]>(GALLERY_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getGalleryImageById(id: string): Promise<GalleryImage | null> {
  const items = await getAllGalleryImages();
  return items.find((g) => g.id === id) ?? null;
}

export async function createGalleryImage(data: Omit<GalleryImage, "id">): Promise<GalleryImage> {
  const items = await getAllGalleryImages();
  const image: GalleryImage = { ...data, id: generateId("img") };
  await writeJSON(GALLERY_FILE, [...items, image]);
  return image;
}

export async function updateGalleryImage(
  id: string,
  data: Partial<Omit<GalleryImage, "id">>
): Promise<GalleryImage | null> {
  const items = await getAllGalleryImages();
  const index = items.findIndex((g) => g.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(GALLERY_FILE, items);
  return updated;
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  const items = await getAllGalleryImages();
  const filtered = items.filter((g) => g.id !== id);
  await writeJSON(GALLERY_FILE, filtered);
  return filtered.length !== items.length;
}

/* ------------------------- Home Page Video Gallery ---------------------- */

const VIDEOS_FILE = "videos.json";

export async function getAllVideos(): Promise<VideoItem[]> {
  const items = await readJSON<VideoItem[]>(VIDEOS_FILE, []);
  return items.sort((a, b) => a.order - b.order);
}

export async function getVideoById(id: string): Promise<VideoItem | null> {
  const items = await getAllVideos();
  return items.find((v) => v.id === id) ?? null;
}

export async function createVideo(data: Omit<VideoItem, "id">): Promise<VideoItem> {
  const items = await getAllVideos();
  const video: VideoItem = { ...data, id: generateId("vid") };
  await writeJSON(VIDEOS_FILE, [...items, video]);
  return video;
}

export async function updateVideo(
  id: string,
  data: Partial<Omit<VideoItem, "id">>
): Promise<VideoItem | null> {
  const items = await getAllVideos();
  const index = items.findIndex((v) => v.id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...data, id };
  items[index] = updated;
  await writeJSON(VIDEOS_FILE, items);
  return updated;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const items = await getAllVideos();
  const filtered = items.filter((v) => v.id !== id);
  await writeJSON(VIDEOS_FILE, filtered);
  return filtered.length !== items.length;
}

/* ------------------------- Contact Submissions ------------------------ */

const SUBMISSIONS_FILE = "submissions.json";

export async function getAllSubmissions(): Promise<ContactSubmission[]> {
  const items = await readJSON<ContactSubmission[]>(SUBMISSIONS_FILE, []);
  return items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function createSubmission(
  data: Omit<ContactSubmission, "id" | "createdAt" | "read">
): Promise<ContactSubmission> {
  const items = await getAllSubmissions();
  const submission: ContactSubmission = {
    ...data,
    id: generateId("sub"),
    createdAt: new Date().toISOString(),
    read: false,
  };
  await writeJSON(SUBMISSIONS_FILE, [...items, submission]);
  return submission;
}

export async function markSubmissionRead(id: string, read = true): Promise<ContactSubmission | null> {
  const items = await getAllSubmissions();
  const index = items.findIndex((s) => s.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], read };
  await writeJSON(SUBMISSIONS_FILE, items);
  return items[index];
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const items = await getAllSubmissions();
  const filtered = items.filter((s) => s.id !== id);
  await writeJSON(SUBMISSIONS_FILE, filtered);
  return filtered.length !== items.length;
}

/* ----------------------------- Site Settings --------------------------- */

const SETTINGS_FILE = "settings.json";

// Default brand palette + typography. Also used as the fallback rendered
// anywhere ThemeStyleInjector isn't present (e.g. the admin panel).
const DEFAULT_THEME: ThemeSettings = {
  colors: {
    gold: "#C8A96A",
    goldLight: "#E4CFA0",
    goldDark: "#9C7C43",
    black: "#000000",
    charcoal: "#0A0A0A",
    panel: "#111111",
    ivory: "#F5F2EC",
  },
  fonts: {
    display: "Playfair Display",
    body: "Inter",
  },
};

const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "Unicon Infra",
  tagline: "Redefining Luxury Living",
  phone: "+91 98765 43210",
  email: "info@uniconinfra.com",
  address: "Unicon Towers, Sector 44, Gurugram, Haryana, India",
  siteIcon: "/favicon.ico",
  logo: "",
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  instagramEmbedCode: "",
  youtubeChannelUrl: "",
  theme: DEFAULT_THEME,
};

function mergeTheme(theme?: Partial<ThemeSettings>): ThemeSettings {
  return {
    colors: { ...DEFAULT_THEME.colors, ...(theme?.colors ?? {}) },
    fonts: { ...DEFAULT_THEME.fonts, ...(theme?.fonts ?? {}) },
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const stored = await readJSON<Partial<SiteSettings>>(SETTINGS_FILE, DEFAULT_SETTINGS);
  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    social: { ...DEFAULT_SETTINGS.social, ...(stored.social ?? {}) },
    theme: mergeTheme(stored.theme),
  };
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = {
    ...current,
    ...data,
    social: { ...current.social, ...(data.social ?? {}) },
    theme: {
      colors: { ...current.theme.colors, ...(data.theme?.colors ?? {}) },
      fonts: { ...current.theme.fonts, ...(data.theme?.fonts ?? {}) },
    },
  };
  await writeJSON(SETTINGS_FILE, updated);
  return updated;
}

/* ---------------------------- Founder Profile --------------------------- */

const FOUNDER_FILE = "founder.json";

const DEFAULT_FOUNDER: FounderProfile = {
  photo: "",
  name: "",
  title: "",
  bio: "",
  message: "",
};

export async function getFounder(): Promise<FounderProfile> {
  return readJSON<FounderProfile>(FOUNDER_FILE, DEFAULT_FOUNDER);
}

export async function updateFounder(data: Partial<FounderProfile>): Promise<FounderProfile> {
  const current = await getFounder();
  const updated: FounderProfile = { ...current, ...data };
  await writeJSON(FOUNDER_FILE, updated);
  return updated;
}

/* ------------------------------ SEO Settings ---------------------------- */

const SEO_FILE = "seo.json";

export async function getAllSeoSettings(): Promise<SeoSetting[]> {
  return readJSON<SeoSetting[]>(SEO_FILE, []);
}

export async function getSeoByPage(page: string): Promise<SeoSetting | null> {
  const items = await getAllSeoSettings();
  return items.find((s) => s.page === page) ?? null;
}

export async function updateSeoByPage(
  page: string,
  data: Partial<Omit<SeoSetting, "page">>
): Promise<SeoSetting> {
  const items = await getAllSeoSettings();
  const index = items.findIndex((s) => s.page === page);
  if (index === -1) {
    const created: SeoSetting = {
      page,
      label: data.label ?? page,
      title: data.title ?? "",
      description: data.description ?? "",
      keywords: data.keywords ?? "",
      ogImage: data.ogImage ?? "",
    };
    await writeJSON(SEO_FILE, [...items, created]);
    return created;
  }
  const updated = { ...items[index], ...data, page };
  items[index] = updated;
  await writeJSON(SEO_FILE, items);
  return updated;
}

/* ------------------------------ Helper: Metadata ------------------------ */

/**
 * Builds a Next.js Metadata-compatible object for a given page key, using
 * saved SEO settings where available and falling back to the provided
 * defaults otherwise. Use this inside each page's `generateMetadata`.
 */
export async function buildPageMetadata(
  page: string,
  fallback: { title: string; description: string }
) {
  const seo = await getSeoByPage(page);
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  return {
    title,
    description,
    keywords: seo?.keywords ? seo.keywords.split(",").map((k) => k.trim()) : undefined,
    openGraph: {
      title,
      description,
      images: seo?.ogImage ? [{ url: seo.ogImage }] : undefined,
    },
  };
}
