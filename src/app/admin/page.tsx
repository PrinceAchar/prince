"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useContent, saveContent, resetContent } from "@/lib/content";
import type { SiteContent } from "@/lib/content-types";
import SectionCard, { FieldGroup, TextInput, Toggle, ListEditor, FaqEditor } from "@/components/admin/SectionCard";
import ImageUpload from "@/components/admin/ImageUpload";
import ProductReorder from "@/components/admin/ProductReorder";
import FloatingSave from "@/components/admin/FloatingSave";
import { shopifyFetchClient, type ShopifyProduct } from "@/lib/shopify";
import { ALL_PRODUCTS_QUERY } from "@/lib/queries";
import { usePathname } from "next/navigation";
import { getClientAuth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const ADMIN_EMAILS = [
  "info@princeachar.com",
  "acaditya10@gmail.com",
];

function genId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function AdminPage() {
  const pathname = usePathname();
  const router = useRouter();
  const defaultContent = useContent();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        router.replace("/admin/login");
      } else if (!ADMIN_EMAILS.includes(u.email ?? "")) {
        await auth.signOut();
        router.replace("/admin/login");
      } else {
        setAuthChecked(true);
      }
    });
    return unsub;
  }, [router]);

  useEffect(() => {
    setContent(defaultContent);
  }, [defaultContent]);

  useEffect(() => {
    shopifyFetchClient<{ products: { edges: { node: ShopifyProduct }[] } }>(ALL_PRODUCTS_QUERY, { first: 50 })
      .then((data) => setProducts(data.products.edges.map((e) => e.node)))
      .catch(() => {});
  }, []);

  // Scroll to section from URL hash
  useEffect(() => {
    if (pathname === "/admin" && window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  const update = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setContent((c) => ({ ...c, [key]: value }));
  }, []);

  const updateHome = useCallback(<K extends keyof SiteContent["homepage"]>(key: K, value: SiteContent["homepage"][K]) => {
    setContent((c) => ({ ...c, homepage: { ...c.homepage, [key]: value } }));
  }, []);

  const updateSettings = useCallback(<K extends keyof SiteContent["settings"]>(key: K, value: SiteContent["settings"][K]) => {
    setContent((c) => ({ ...c, settings: { ...c.settings, [key]: value } }));
  }, []);

  const handleSave = async () => await saveContent(content);
  const handleReset = async () => {
    await resetContent();
    setContent(defaultContent);
  };

  const h = content.homepage;

  if (!authChecked) {
    return (
      <div className="max-w-[800px] mx-auto px-4 md:px-6 py-6 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-4 md:px-6 py-6 space-y-4">
      <h1 className="font-heading text-[24px] font-bold text-brand-black mb-2">Site Content</h1>
      <p className="text-[13px] text-gray mb-6">Edit any section below. Changes are live after saving.</p>

      {/* ─── Site Settings ─── */}
      <SectionCard id="settings" title="Site Settings">
        <FieldGroup label="Site Name">
          <TextInput value={content.settings.siteName} onChange={(v) => updateSettings("siteName", v)} />
        </FieldGroup>
        <FieldGroup label="Site Description">
          <TextInput value={content.settings.siteDescription} onChange={(v) => updateSettings("siteDescription", v)} multiline />
        </FieldGroup>
        <FieldGroup label="Logo">
          <ImageUpload value={content.settings.logoUrl} onChange={(v) => updateSettings("logoUrl", v)} folder="princeachar/logo" />
        </FieldGroup>
        <FieldGroup label="OG Image (social sharing)">
          <ImageUpload value={content.settings.ogImageUrl} onChange={(v) => updateSettings("ogImageUrl", v)} folder="princeachar/og" />
        </FieldGroup>
      </SectionCard>

      {/* ─── Homepage ─── */}
      <div id="homepage" className="text-[11px] font-semibold uppercase tracking-[2px] text-gray pt-4">Homepage</div>

      {/* Hero Slides */}
      <SectionCard id="hero-slides" title="Hero Slides" defaultOpen>
        <FieldGroup label="Slides">
          <div className="space-y-3">
            {h.hero.slides.map((slide, i) => (
              <div key={slide.id} className="p-3 bg-[#FAF5E4]/50 border border-brand-black/10 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-gray">Slide {i + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const next = h.hero.slides.filter((_, j) => j !== i);
                      updateHome("hero", { ...h.hero, slides: next });
                    }}
                    className="text-[11px] text-red hover:text-red-dark"
                  >
                    Remove
                  </button>
                </div>
                <ImageUpload
                  value={slide.imageUrl}
                  onChange={(v) => {
                    const next = [...h.hero.slides];
                    next[i] = { ...next[i], imageUrl: v };
                    updateHome("hero", { ...h.hero, slides: next });
                  }}
                  folder="princeachar/hero"
                />
                <TextInput
                  value={slide.link ?? ""}
                  onChange={(v) => {
                    const next = [...h.hero.slides];
                    next[i] = { ...next[i], link: v || undefined };
                    updateHome("hero", { ...h.hero, slides: next });
                  }}
                  placeholder="Link (optional, e.g. /products/lemon-sweet-pickle)"
                />
                <TextInput
                  value={slide.title ?? ""}
                  onChange={(v) => {
                    const next = [...h.hero.slides];
                    next[i] = { ...next[i], title: v || undefined };
                    updateHome("hero", { ...h.hero, slides: next });
                  }}
                  placeholder="Slide title (optional)"
                />
                <TextInput
                  value={slide.subtitle ?? ""}
                  onChange={(v) => {
                    const next = [...h.hero.slides];
                    next[i] = { ...next[i], subtitle: v || undefined };
                    updateHome("hero", { ...h.hero, slides: next });
                  }}
                  placeholder="Slide subtitle (optional)"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => updateHome("hero", { ...h.hero, slides: [...h.hero.slides, { id: genId(), imageUrl: "" }] })}
              className="text-[12px] font-medium text-red hover:text-red-dark transition-colors"
            >
              + Add Slide
            </button>
          </div>
        </FieldGroup>
        <FieldGroup label="Auto-play interval (ms)">
          <input
            type="number"
            value={h.hero.autoPlayInterval}
            onChange={(e) => updateHome("hero", { ...h.hero, autoPlayInterval: Number(e.target.value) })}
            className="w-32 px-3 py-2 bg-[#FAF5E4]/50 border border-brand-black/12 rounded-xl text-[13px] text-brand-black outline-none focus:border-red/50 transition-colors"
          />
        </FieldGroup>
        <div className="border-t border-brand-black/5 pt-4 mt-2">
          <p className="text-[11px] text-gray mb-3">Global Fallbacks (shown when slide has no title/subtitle)</p>
          <div className="space-y-3">
            <FieldGroup label="Title">
              <TextInput value={h.hero.title} onChange={(v) => updateHome("hero", { ...h.hero, title: v })} />
            </FieldGroup>
            <FieldGroup label="Subtitle">
              <TextInput value={h.hero.subtitle} onChange={(v) => updateHome("hero", { ...h.hero, subtitle: v })} />
            </FieldGroup>
            <FieldGroup label="CTA Text">
              <TextInput value={h.hero.ctaText} onChange={(v) => updateHome("hero", { ...h.hero, ctaText: v })} />
            </FieldGroup>
            <FieldGroup label="CTA Link">
              <TextInput value={h.hero.ctaLink} onChange={(v) => updateHome("hero", { ...h.hero, ctaLink: v })} />
            </FieldGroup>
          </div>
        </div>
      </SectionCard>

      {/* Marquee */}
      <SectionCard id="marquee" title="Marquee Ticker">
        <FieldGroup label="Items">
          <ListEditor items={h.marquee.items} onChange={(v) => updateHome("marquee", { items: v })} placeholder="Ticker text" />
        </FieldGroup>
      </SectionCard>

      {/* Our Story */}
      <SectionCard id="story" title="Our Story">
        <FieldGroup label="Label">
          <TextInput value={h.story.label} onChange={(v) => updateHome("story", { ...h.story, label: v })} />
        </FieldGroup>
        <FieldGroup label="Heading">
          <TextInput value={h.story.heading} onChange={(v) => updateHome("story", { ...h.story, heading: v })} />
        </FieldGroup>
        <FieldGroup label="Paragraphs">
          <ListEditor items={h.story.paragraphs} onChange={(v) => updateHome("story", { ...h.story, paragraphs: v })} placeholder="Paragraph text" />
        </FieldGroup>
        <FieldGroup label="Closing Line">
          <TextInput value={h.story.closingLine} onChange={(v) => updateHome("story", { ...h.story, closingLine: v })} />
        </FieldGroup>
        <FieldGroup label="Image">
          <ImageUpload value={h.story.imageUrl} onChange={(v) => updateHome("story", { ...h.story, imageUrl: v })} folder="princeachar/story" />
        </FieldGroup>
      </SectionCard>

      {/* Video */}
      <SectionCard id="video" title="Video Section">
        <FieldGroup label="Label">
          <TextInput value={h.video.label} onChange={(v) => updateHome("video", { ...h.video, label: v })} />
        </FieldGroup>
        <FieldGroup label="Heading">
          <TextInput value={h.video.heading} onChange={(v) => updateHome("video", { ...h.video, heading: v })} />
        </FieldGroup>
        <FieldGroup label="Description">
          <TextInput value={h.video.description} onChange={(v) => updateHome("video", { ...h.video, description: v })} multiline />
        </FieldGroup>
        <FieldGroup label="CTA Text">
          <TextInput value={h.video.ctaText} onChange={(v) => updateHome("video", { ...h.video, ctaText: v })} />
        </FieldGroup>
        <FieldGroup label="CTA Link">
          <TextInput value={h.video.ctaLink} onChange={(v) => updateHome("video", { ...h.video, ctaLink: v })} />
        </FieldGroup>
        <FieldGroup label="Cover Image">
          <ImageUpload value={h.video.coverUrl} onChange={(v) => updateHome("video", { ...h.video, coverUrl: v })} folder="princeachar/video" />
        </FieldGroup>
      </SectionCard>

      {/* Bestsellers */}
      <SectionCard id="bestsellers" title="Bestsellers">
        <FieldGroup label="Label">
          <TextInput value={h.bestsellers.label} onChange={(v) => updateHome("bestsellers", { ...h.bestsellers, label: v })} />
        </FieldGroup>
        <FieldGroup label="Heading">
          <TextInput value={h.bestsellers.heading} onChange={(v) => updateHome("bestsellers", { ...h.bestsellers, heading: v })} />
        </FieldGroup>
        <FieldGroup label="Text">
          <TextInput value={h.bestsellers.text} onChange={(v) => updateHome("bestsellers", { ...h.bestsellers, text: v })} multiline />
        </FieldGroup>
        <FieldGroup label="CTA Text">
          <TextInput value={h.bestsellers.ctaText} onChange={(v) => updateHome("bestsellers", { ...h.bestsellers, ctaText: v })} />
        </FieldGroup>
        <FieldGroup label="CTA Link">
          <TextInput value={h.bestsellers.ctaLink} onChange={(v) => updateHome("bestsellers", { ...h.bestsellers, ctaLink: v })} />
        </FieldGroup>
      </SectionCard>

      {/* Hero Dialog */}
      <SectionCard id="hero-dialog" title="Hero Dialog Overlay">
        <Toggle checked={h.heroDialog.enabled} onChange={(v) => updateHome("heroDialog", { ...h.heroDialog, enabled: v })} label="Enabled" />
        <FieldGroup label="Heading">
          <TextInput value={h.heroDialog.heading} onChange={(v) => updateHome("heroDialog", { ...h.heroDialog, heading: v })} />
        </FieldGroup>
        <FieldGroup label="Text">
          <TextInput value={h.heroDialog.text} onChange={(v) => updateHome("heroDialog", { ...h.heroDialog, text: v })} multiline />
        </FieldGroup>
        <FieldGroup label="CTA Text">
          <TextInput value={h.heroDialog.ctaText} onChange={(v) => updateHome("heroDialog", { ...h.heroDialog, ctaText: v })} />
        </FieldGroup>
        <FieldGroup label="CTA Link">
          <TextInput value={h.heroDialog.ctaLink} onChange={(v) => updateHome("heroDialog", { ...h.heroDialog, ctaLink: v })} />
        </FieldGroup>
      </SectionCard>

      {/* ─── Collections ─── */}
      <div id="collections" className="text-[11px] font-semibold uppercase tracking-[2px] text-gray pt-4">Collection Pages</div>

      {/* Achar */}
      <SectionCard id="achar" title="Achar Page">
        <FieldGroup label="Hero Label">
          <TextInput value={content.achar.hero.label} onChange={(v) => update("achar", { hero: { ...content.achar.hero, label: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Title">
          <TextInput value={content.achar.hero.title} onChange={(v) => update("achar", { hero: { ...content.achar.hero, title: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Description">
          <TextInput value={content.achar.hero.description} onChange={(v) => update("achar", { hero: { ...content.achar.hero, description: v } })} multiline />
        </FieldGroup>
        <FieldGroup label="Banner Image">
          <ImageUpload value={content.achar.hero.bannerUrl} onChange={(v) => update("achar", { hero: { ...content.achar.hero, bannerUrl: v } })} folder="princeachar/achar" />
        </FieldGroup>
      </SectionCard>

      {/* Murabba */}
      <SectionCard id="murabba" title="Murabba & Chutney Page">
        <div className="space-y-4">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Hero</p>
          <FieldGroup label="Label">
            <TextInput value={content.murabba.hero.label} onChange={(v) => update("murabba", { ...content.murabba, hero: { ...content.murabba.hero, label: v } })} />
          </FieldGroup>
          <FieldGroup label="Title">
            <TextInput value={content.murabba.hero.title} onChange={(v) => update("murabba", { ...content.murabba, hero: { ...content.murabba.hero, title: v } })} />
          </FieldGroup>
          <FieldGroup label="Description">
            <TextInput value={content.murabba.hero.description} onChange={(v) => update("murabba", { ...content.murabba, hero: { ...content.murabba.hero, description: v } })} multiline />
          </FieldGroup>
          <FieldGroup label="Banner Image">
            <ImageUpload value={content.murabba.hero.bannerUrl} onChange={(v) => update("murabba", { ...content.murabba, hero: { ...content.murabba.hero, bannerUrl: v } })} folder="princeachar/murabba" />
          </FieldGroup>
        </div>
        <div className="border-t border-brand-black/5 pt-4 mt-4 space-y-4">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Chutney Section</p>
          <FieldGroup label="Label">
            <TextInput value={content.murabba.chutney.label} onChange={(v) => update("murabba", { ...content.murabba, chutney: { ...content.murabba.chutney, label: v } })} />
          </FieldGroup>
          <FieldGroup label="Title">
            <TextInput value={content.murabba.chutney.title} onChange={(v) => update("murabba", { ...content.murabba, chutney: { ...content.murabba.chutney, title: v } })} />
          </FieldGroup>
          <FieldGroup label="Description">
            <TextInput value={content.murabba.chutney.description} onChange={(v) => update("murabba", { ...content.murabba, chutney: { ...content.murabba.chutney, description: v } })} multiline />
          </FieldGroup>
          <FieldGroup label="Banner Image">
            <ImageUpload value={content.murabba.chutney.bannerUrl} onChange={(v) => update("murabba", { ...content.murabba, chutney: { ...content.murabba.chutney, bannerUrl: v } })} folder="princeachar/murabba" />
          </FieldGroup>
        </div>
      </SectionCard>

      {/* ─── Contact & FAQ ─── */}
      <div id="contact" className="text-[11px] font-semibold uppercase tracking-[2px] text-gray pt-4">Contact & FAQ</div>

      <SectionCard id="contact-hero" title="Contact Page">
        <FieldGroup label="Hero Label">
          <TextInput value={content.contact.hero.label} onChange={(v) => update("contact", { ...content.contact, hero: { ...content.contact.hero, label: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Title">
          <TextInput value={content.contact.hero.title} onChange={(v) => update("contact", { ...content.contact, hero: { ...content.contact.hero, title: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Description">
          <TextInput value={content.contact.hero.description} onChange={(v) => update("contact", { ...content.contact, hero: { ...content.contact.hero, description: v } })} multiline />
        </FieldGroup>
        <div className="border-t border-brand-black/5 pt-4 mt-2 space-y-3">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Form</p>
          <FieldGroup label="Form Label">
            <TextInput value={content.contact.form.label} onChange={(v) => update("contact", { ...content.contact, form: { ...content.contact.form, label: v } })} />
          </FieldGroup>
          <FieldGroup label="Form Heading">
            <TextInput value={content.contact.form.heading} onChange={(v) => update("contact", { ...content.contact, form: { ...content.contact.form, heading: v } })} />
          </FieldGroup>
          <FieldGroup label="Subjects">
            <ListEditor items={content.contact.form.subjects} onChange={(v) => update("contact", { ...content.contact, form: { ...content.contact.form, subjects: v } })} />
          </FieldGroup>
        </div>
        <div className="border-t border-brand-black/5 pt-4 mt-2 space-y-3">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Contact Info</p>
          <FieldGroup label="Store Address">
            <TextInput value={content.contact.info.store.address} onChange={(v) => update("contact", { ...content.contact, info: { ...content.contact.info, store: { ...content.contact.info.store, address: v } } })} />
          </FieldGroup>
          <FieldGroup label="Phone Number">
            <TextInput value={content.contact.info.phone.number} onChange={(v) => update("contact", { ...content.contact, info: { ...content.contact.info, phone: { ...content.contact.info.phone, number: v } } })} />
          </FieldGroup>
          <FieldGroup label="Email">
            <TextInput value={content.contact.info.email.address} onChange={(v) => update("contact", { ...content.contact, info: { ...content.contact.info, email: { ...content.contact.info.email, address: v } } })} />
          </FieldGroup>
        </div>
        <div className="border-t border-brand-black/5 pt-4 mt-2 space-y-3">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Store Images</p>
          {content.contact.images.map((url, i) => (
            <div key={i}>
              <ImageUpload
                value={url}
                onChange={(v) => {
                  const next = [...content.contact.images];
                  next[i] = v;
                  update("contact", { ...content.contact, images: next });
                }}
                folder="princeachar/store"
              />
              <button
                type="button"
                onClick={() => update("contact", { ...content.contact, images: content.contact.images.filter((_, j) => j !== i) })}
                className="mt-1 text-[11px] text-red hover:text-red-dark"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => update("contact", { ...content.contact, images: [...content.contact.images, ""] })}
            className="text-[12px] font-medium text-red hover:text-red-dark transition-colors"
          >
            + Add Image
          </button>
        </div>
      </SectionCard>

      <SectionCard id="faq" title="FAQ Page">
        <FieldGroup label="Hero Label">
          <TextInput value={content.faq.hero.label} onChange={(v) => update("faq", { ...content.faq, hero: { ...content.faq.hero, label: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Title">
          <TextInput value={content.faq.hero.title} onChange={(v) => update("faq", { ...content.faq, hero: { ...content.faq.hero, title: v } })} />
        </FieldGroup>
        <FieldGroup label="Hero Description">
          <TextInput value={content.faq.hero.description} onChange={(v) => update("faq", { ...content.faq, hero: { ...content.faq.hero, description: v } })} multiline />
        </FieldGroup>
        <div className="border-t border-brand-black/5 pt-4 mt-2">
          <FieldGroup label="FAQ Items">
            <FaqEditor items={content.faq.items} onChange={(v) => update("faq", { ...content.faq, items: v })} />
          </FieldGroup>
        </div>
        <div className="border-t border-brand-black/5 pt-4 mt-2 space-y-3">
          <p className="text-[11px] font-medium text-gray uppercase tracking-wider">Bottom CTA</p>
          <FieldGroup label="CTA Text">
            <TextInput value={content.faq.cta.text} onChange={(v) => update("faq", { ...content.faq, cta: { ...content.faq.cta, text: v } })} />
          </FieldGroup>
          <FieldGroup label="Button Text">
            <TextInput value={content.faq.cta.buttonText} onChange={(v) => update("faq", { ...content.faq, cta: { ...content.faq.cta, buttonText: v } })} />
          </FieldGroup>
          <FieldGroup label="Button Link">
            <TextInput value={content.faq.cta.buttonLink} onChange={(v) => update("faq", { ...content.faq, cta: { ...content.faq.cta, buttonLink: v } })} />
          </FieldGroup>
        </div>
      </SectionCard>

      {/* ─── Footer ─── */}
      <div id="footer" className="text-[11px] font-semibold uppercase tracking-[2px] text-gray pt-4">Footer</div>

      <SectionCard id="footer-section" title="Footer">
        <FieldGroup label="Tagline">
          <TextInput value={content.footer.tagline} onChange={(v) => update("footer", { ...content.footer, tagline: v })} />
        </FieldGroup>
        <FieldGroup label="Instagram URL">
          <TextInput value={content.footer.socialLinks.instagram} onChange={(v) => update("footer", { ...content.footer, socialLinks: { ...content.footer.socialLinks, instagram: v } })} />
        </FieldGroup>
        <FieldGroup label="Facebook URL">
          <TextInput value={content.footer.socialLinks.facebook} onChange={(v) => update("footer", { ...content.footer, socialLinks: { ...content.footer.socialLinks, facebook: v } })} />
        </FieldGroup>
        <FieldGroup label="Weekday Hours">
          <TextInput value={content.footer.hours.weekday} onChange={(v) => update("footer", { ...content.footer, hours: { ...content.footer.hours, weekday: v } })} />
        </FieldGroup>
        <FieldGroup label="Sunday Hours">
          <TextInput value={content.footer.hours.sunday} onChange={(v) => update("footer", { ...content.footer, hours: { ...content.footer.hours, sunday: v } })} />
        </FieldGroup>
      </SectionCard>

      {/* ─── Product Order ─── */}
      <div id="products" className="text-[11px] font-semibold uppercase tracking-[2px] text-gray pt-4">Product Order</div>

      <SectionCard id="product-order" title="Product Display Order" defaultOpen>
        <ProductReorder
          products={products}
          order={content.products.order}
          onChange={(v) => update("products", { order: v })}
        />
      </SectionCard>

      <div className="h-24" />

      <FloatingSave onSave={handleSave} onReset={handleReset} />
    </div>
  );
}
