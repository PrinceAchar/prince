import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Processing Time",
    text: "All orders are processed within 1–2 business days. You will receive a confirmation email once your order has been dispatched.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m0 0h13.5m-13.5 0V5.625A1.125 1.125 0 0 1 6.375 4.5h8.25c.414 0 .786.25.938.625l3.375 5.25H6.375" />
      </svg>
    ),
    title: "Shipping Across India",
    text: "We ship to most locations across India via trusted courier partners. Delivery typically takes 3–7 business days depending on your pin code.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    title: "Shipping Charges",
    text: "Shipping is free on orders above ₹500. For orders below ₹500, a flat shipping fee of ₹50 applies.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Order Tracking",
    text: "Once your order is shipped, you will receive a tracking number via email or SMS. You can track your order through the courier partner's website.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 10.5c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 10.5c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    title: "International Shipping",
    text: "Currently, we only ship within India. For international inquiries, please contact us directly at info@princeachar.com.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Damaged or Lost Shipments",
    text: "If your order arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will arrange a replacement or full refund.",
  },
];

export default function ShippingPage() {
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
            Delivery Information
          </span>
          <h1 className="font-heading text-[34px] md:text-[44px] font-bold text-brand-black mb-4 leading-tight">
            Shipping Policy
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
        </div>
      </section>

      <Footer />
    </>
  );
}
