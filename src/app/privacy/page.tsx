import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Information We Collect",
    text: "We collect personal information you provide directly, such as your name, email address, phone number, and shipping address when you place an order or contact us.",
  },
  {
    title: "How We Use Your Information",
    text: "We use your information to process orders, communicate with you about your purchases, send promotional materials (with your consent), and improve our products and services.",
  },
  {
    title: "Information Sharing",
    text: "We do not sell or rent your personal information to third parties. We may share your data with trusted service providers (e.g., shipping partners) solely to fulfill your orders.",
  },
  {
    title: "Data Security",
    text: "We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    title: "Cookies",
    text: "Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings.",
  },
  {
    title: "Your Rights",
    text: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at info@princeachar.com.",
  },
  {
    title: "Changes to This Policy",
    text: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
  },
  {
    title: "Contact Us",
    text: "If you have questions about this Privacy Policy, please reach out to us at info@princeachar.com or +91 98100 00000.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[800px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Legal
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-[13px] md:text-[14px] text-gray">
            Last updated: August 2026
          </p>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[800px] mx-auto px-6 space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-[15px] md:text-[16px] font-semibold text-brand-black mb-2">{s.title}</h2>
              <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
