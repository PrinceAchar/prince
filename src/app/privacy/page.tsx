import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: "Information We Collect",
    text: "We collect personal information you provide directly, such as your name, email address, phone number, and shipping address when you place an order or contact us.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "How We Use Your Information",
    text: "We use your information to process orders, communicate with you about your purchases, send promotional materials (with your consent), and improve our products and services.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21h3.75M15 5.25v1.5m0 6V18m0-6h-1.5M15 5.25H9.75M9.75 5.25H6m3.75 6H6m3.75 6H6" />
      </svg>
    ),
    title: "Information Sharing",
    text: "We do not sell or rent your personal information to third parties. We may share your data with trusted service providers (e.g., shipping partners) solely to fulfill your orders.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: "Data Security",
    text: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 10.5c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 10.5c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    title: "Cookies",
    text: "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Your Rights",
    text: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@princeachar.com.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
    title: "Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Contact Us",
    text: "If you have questions about this Privacy Policy, please reach out to us at info@princeachar.com or +91 98110 56593.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-red/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-[800px] mx-auto px-6 py-14 md:py-20 text-center relative">
          <div className="w-12 h-[2px] bg-red mx-auto mb-5" />
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Legal
          </span>
          <h1 className="font-heading text-[34px] md:text-[44px] font-bold text-brand-black mb-4 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[13px] md:text-[14px] text-gray">Last updated: August 2026</p>
        </div>
      </section>

      {/* CONTENT CARDS */}
      <section className="bg-gradient-to-b from-white to-yellow/30 py-12 md:py-16">
        <div className="max-w-[750px] mx-auto px-6">
          <div className="grid gap-4">
            {sections.map((s, i) => (
              <div key={i} className="flex gap-5 bg-white rounded-xl border border-brand-black/5 p-6 shadow-sm">
                <div className="flex-shrink-0 w-11 h-11 bg-red/10 text-red rounded-lg flex items-center justify-center">
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-[15px] md:text-[16px] font-semibold text-brand-black mb-1.5">{s.title}</h2>
                  <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
