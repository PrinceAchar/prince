import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Return Eligibility",
    text: "Due to the nature of our food products, we do not accept returns once the product has been delivered. However, if you receive a damaged, defective, or wrong item, we are happy to assist you.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    title: "Reporting an Issue",
    text: "If you receive a damaged or incorrect product, please contact us within 48 hours of delivery with your order number and a photo of the issue. Reach us at info@princeachar.com or call +91 98110 56593.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
      </svg>
    ),
    title: "Replacement or Refund",
    text: "Once we verify the issue, we will either send a replacement or process a full refund to your original payment method within 5–7 business days.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    ),
    title: "Cancellations",
    text: "Orders can be cancelled within 24 hours of placing them, provided they have not yet been dispatched. To cancel, please contact us immediately.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: "Non-Returnable Items",
    text: "Opened or used products, items without original packaging, and products purchased during sale events are not eligible for return or replacement.",
  },
];

export default function ReturnsPage() {
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
            Hassle-Free
          </span>
          <h1 className="font-heading text-[34px] md:text-[44px] font-bold text-brand-black mb-4 leading-tight">
            Returns & Refunds
          </h1>
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

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-[13px] text-gray mb-3">Need help with an order?</p>
            <a href="/contact" className="inline-block px-6 py-2.5 border-2 border-red text-red text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
