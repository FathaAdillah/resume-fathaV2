import { useState } from "react";
import { Mail, Phone, MapPin, GitFork, Link2, Send, Award } from "lucide-react";
import { profile } from "../data/resume";

export default function Footer() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire this to an API endpoint
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer id="contact" className="bg-white border-t border-gray-100">
      {/* Get in Touch section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black text-gray-950 mb-3">
            Get in Touch
          </h2>
          <div className="w-12 h-1 bg-blue-700 rounded-full mx-auto mb-4" />
          <p className="text-gray-500 text-sm">
            Have a project in mind or want to collaborate? Drop a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-4 mb-8">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors">
                    {profile.email}
                  </p>
                </div>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Phone</p>
                  <p className="text-sm font-medium text-gray-800">
                    {profile.phone}
                  </p>
                </div>
              </a>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Location</p>
                  <p className="text-sm font-medium text-gray-800">
                    {profile.location}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-gray-900 mb-3">
              Social Links
            </h3>
            <div className="flex gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-500 transition-all"
                aria-label="LinkedIn"
              >
                <Link2 size={15} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-500 transition-all"
                aria-label="GitHub"
              >
                <GitFork size={15} />
              </a>
              <a
                href={profile.credly}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-gray-200 hover:border-amber-500 hover:bg-amber-500 hover:text-white flex items-center justify-center text-gray-500 transition-all"
                aria-label="Credly"
              >
                <Award size={15} />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-9 h-9 rounded-lg border border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center text-gray-500 transition-all"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">
              Send a Message
            </h3>
            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
                <p className="text-green-700 font-semibold text-sm">
                  ✓ Message sent! I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Send size={15} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom footer bar */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Brand */}
            <div>
              <p className="font-bold text-gray-900 text-base mb-1">
                Fatharoni
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                {profile.title} & System Implementator
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-3">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {[
                  "#hero",
                  "#about",
                  "#experience",
                  "#skills",
                  "#projects",
                  "#certifications",
                ].map((href) => (
                  <button
                    key={href}
                    onClick={() =>
                      document
                        .querySelector(href)
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-gray-500 hover:text-blue-700 text-xs transition-colors capitalize"
                  >
                    {href.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p className="font-semibold text-gray-700 text-xs uppercase tracking-wide mb-3">
                Connect
              </p>
              <div className="flex gap-3">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={profile.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-500 hover:text-amber-600 transition-colors"
                >
                  Credly
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-xs text-gray-500 hover:text-blue-700 transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
            <p>Built with React + Vite + Tailwind CSS</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
