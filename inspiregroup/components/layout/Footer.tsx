import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-elevated border-t border-subtle py-20 pb-10 relative z-[1]">
      <div className="max-w-[1280px] mx-auto px-10 max-md:px-6">
        {/* Grid */}
        <div className="grid grid-cols-[2.5fr_1fr_1fr_1fr] gap-15 mb-15 max-lg:grid-cols-2 max-lg:gap-10 max-md:grid-cols-1">
          {/* Brand Column */}
          <div>
            <div className="font-serif text-[1.6rem] font-bold mb-4 flex items-center gap-3.5 text-content">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-subtle shadow-(--shadow-sm) shrink-0">
                <Image src="/logo.png" alt="Inspire Group" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              Inspire Group
            </div>
            <p className="text-[0.95rem] text-muted leading-relaxed max-w-[320px]">
              Building a connected, efficient, and inspiring workplace for every
              team member.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-[0.8rem] font-extrabold uppercase tracking-widest mb-6 text-content">
              Quick Links
            </h5>
            <a href="#hero" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Home
            </a>
            <a href="#projects" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Ecosystem
            </a>
            <a href="#announcements" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              News
            </a>
          </div>

          {/* Resources */}
          <div>
            <h5 className="text-[0.8rem] font-extrabold uppercase tracking-widest mb-6 text-content">
              Resources
            </h5>
            <a href="#departments" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Departments
            </a>
            <a href="#bulletin" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Bulletin
            </a>
            <a href="#orgchart" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Org Chart
            </a>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-[0.8rem] font-extrabold uppercase tracking-widest mb-6 text-content">
              Support
            </h5>
            <a href="#" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Help Desk
            </a>
            <a href="#" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              IT Support
            </a>
            <a href="#" className="footer-link block text-[0.95rem] text-muted py-2 font-medium">
              Contact
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between pt-8 border-t border-subtle text-[0.9rem] text-muted font-medium max-md:flex-col max-md:gap-4 max-md:text-center">
          <span>&copy; {new Date().getFullYear()} Inspire Group. All rights reserved.</span>
          <span>Built with purpose.</span>
        </div>
      </div>
    </footer>
  );
}
