import { ContactForm } from "@/components/ui/contact-sections";

export function ContactPage() {
  return (
    <div className="min-h-screen pt-20 flex flex-col justify-between">
      {/* Contact Form */}
      <div className="flex-1 relative z-10">
        <ContactForm />
      </div>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 mt-auto bg-black/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400">
          <p>© 2025 Priyanshu Mehra. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
