import {
  HiOutlineOfficeBuilding,
  HiOutlineNewspaper,
  HiOutlineUserGroup,
  HiOutlineChatAlt2,
  HiOutlinePhotograph,
  HiOutlineInboxIn,
  HiOutlineLibrary,
} from "react-icons/hi";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatCard from "@/components/admin/StatCard";
import {
  getAllProjects,
  getAllBlogPosts,
  getAllTeamMembers,
  getAllTestimonials,
  getAllGalleryImages,
  getAllSubmissions,
  getAllJointVentures,
} from "@/lib/db/repositories";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projects, posts, team, testimonials, gallery, submissions, jointVentures] = await Promise.all([
    getAllProjects(),
    getAllBlogPosts(),
    getAllTeamMembers(),
    getAllTestimonials(),
    getAllGalleryImages(),
    getAllSubmissions(),
    getAllJointVentures(),
  ]);

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div>
      <AdminPageHeader
        title="Dashboard"
        description="A quick overview of your website's content."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Projects" value={projects.length} icon={HiOutlineOfficeBuilding} href="/admin/projects" />
        <StatCard label="Blog Posts" value={posts.length} icon={HiOutlineNewspaper} href="/admin/blog" />
        <StatCard label="Team Members" value={team.length} icon={HiOutlineUserGroup} href="/admin/team" />
        <StatCard label="Testimonials" value={testimonials.length} icon={HiOutlineChatAlt2} href="/admin/testimonials" />
        <StatCard label="Joint Ventures" value={jointVentures.length} icon={HiOutlineLibrary} href="/admin/joint-ventures" />
        <StatCard label="Gallery Images" value={gallery.length} icon={HiOutlinePhotograph} href="/admin/gallery" />
        <StatCard
          label={`Form Submissions${unreadCount ? ` (${unreadCount} new)` : ""}`}
          value={submissions.length}
          icon={HiOutlineInboxIn}
          href="/admin/submissions"
        />
      </div>

      <div className="glass rounded-2xl p-6 md:p-8 mt-10">
        <h3 className="font-display text-lg mb-3">Getting Started</h3>
        <ul className="text-white/60 text-sm space-y-2 list-disc list-inside">
          <li>Manage your project listings, pricing, amenities and gallery under <span className="text-luxury-gold">Projects</span>.</li>
          <li>Publish articles to the site journal under <span className="text-luxury-gold">Blog Posts</span>.</li>
          <li>Update leadership photos and roles under <span className="text-luxury-gold">Team Members</span>.</li>
          <li>Curate homepage reviews under <span className="text-luxury-gold">Testimonials</span>.</li>
          <li>Showcase partner companies under <span className="text-luxury-gold">Joint Ventures</span>.</li>
          <li>Add photography to the public gallery under <span className="text-luxury-gold">Gallery</span>.</li>
          <li>Review site visit, contact and brochure requests under <span className="text-luxury-gold">Form Submissions</span>.</li>
          <li>Fine-tune meta titles/descriptions per page under <span className="text-luxury-gold">SEO Settings</span>.</li>
          <li>Customize the site&apos;s color palette and fonts under <span className="text-luxury-gold">Colors &amp; Fonts</span>.</li>
          <li>Update your logo/favicon, contact details and social links under <span className="text-luxury-gold">Site Settings</span>.</li>
        </ul>
      </div>
    </div>
  );
}
