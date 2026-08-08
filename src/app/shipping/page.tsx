import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "Processing Time",
    text: "All orders are processed within 1–2 business days. You will receive a confirmation email once your order has been dispatched.",
  },
  {
    title: "Shipping Across India",
    text: "We ship to most locations across India via trusted courier partners. Delivery typically takes 3–7 business days depending on your pin code.",
  },
  {
    title: "Shipping Charges",
    text: "Shipping is free on orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 applies.",
  },
  {
    title: "Order Tracking",
    text: "Once your order is shipped, you will receive a tracking number via email or SMS. You can track your order through the courier partner's website.",
  },
  {
    title: "International Shipping",
    text: "Currently, we only ship within India. For international inquiries, please contact us directly at info@princeachar.com.",
  },
  {
    title: "Damaged or Lost Shipments",
    text: "If your order arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will arrange a replacement or full refund.",
  },
];

export default function ShippingPage() {
  return (
    <>
      <Navbar />

      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[800px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Delivery Information
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Shipping Policy
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
