import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Return Eligibility",
    text: "Due to the nature of our food products, we do not accept returns once the product has been delivered. However, if you receive a damaged, defective, or wrong item, we are happy to assist you.",
  },
  {
    title: "Reporting an Issue",
    text: "If you receive a damaged or incorrect product, please contact us within 48 hours of delivery with your order number and a photo of the issue. Reach us at info@princeachar.com or call +91 98100 00000.",
  },
  {
    title: "Replacement or Refund",
    text: "Once we verify the issue, we will either send a replacement or process a full refund to your original payment method within 5–7 business days.",
  },
  {
    title: "Cancellations",
    text: "Orders can be cancelled within 24 hours of placing them, provided they have not yet been dispatched. To cancel, please contact us immediately.",
  },
  {
    title: "Non-Returnable Items",
    text: "Opened or used products, items without original packaging, and products purchased during sale events are not eligible for return or replacement.",
  },
];

export default function ReturnsPage() {
  return (
    <>
      <Navbar />

      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[800px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Hassle-Free
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Returns & Refunds
          </h1>
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
