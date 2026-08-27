// Quiet Glow Atelier reminder: build a warm editorial journey with asymmetry, calm language, and direct but gentle booking actions.

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { galleryCategories, galleryItems, services, siteContent, type GalleryItem, type Service } from "@/data/siteContent";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand-lockup ${compact ? "brand-lockup--compact" : ""}`} href="#home" aria-label="PureEssence home">
      <img className="brand-mark" src="/manus-storage/pureessence-logo_b86b6f0e.png" alt="" aria-hidden="true" />
      <span className="brand-type">
        <span className="brand-name">PUREESSENCE</span>
        <span className="brand-descriptor">Beauty Studio</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: string; copy?: string; align?: "left" | "right" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><span className="eyebrow-dot" />{eyebrow}</p>
      <h2>{title}</h2>
      {copy ? <p className="section-heading__copy">{copy}</p> : null}
    </div>
  );
}

function ServiceCard({ service, onBook }: { service: Service; onBook: (serviceName: string) => void }) {
  return (
    <article className="service-card" style={{ "--service-accent": service.accent } as React.CSSProperties}>
      <div className="service-card__topline">
        <span>{service.label}</span>
        <Sparkles size={17} strokeWidth={1.4} aria-hidden="true" />
      </div>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <ul>
        {service.items.map((item) => (
          <li key={item}><span className="list-check"><Check size={12} strokeWidth={2} /></span>{item}</li>
        ))}
      </ul>
      <div className="service-card__meta">
        <div><span>Price</span><strong>{service.price}</strong></div>
        <div><span>Duration</span><strong>{service.duration}</strong></div>
      </div>
      <button className="text-button" type="button" onClick={() => onBook(service.name)}>
        <span>Book / enquire</span><ArrowUpRight size={17} strokeWidth={1.5} />
      </button>
    </article>
  );
}

function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: (item: GalleryItem) => void }) {
  return (
    <button className={`gallery-tile gallery-tile--${item.id}`} type="button" onClick={() => onOpen(item)} aria-label={`View ${item.title} image`}>
      <img src={item.image} alt={item.alt} loading="lazy" />
      <span className="gallery-tile__veil" />
      <span className="gallery-tile__copy"><small>{item.category}</small><strong>{item.title}</strong></span>
      <span className="gallery-tile__arrow"><ArrowUpRight size={17} /></span>
    </button>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error ? <span className="field-error" role="alert">{error}</span> : null}
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [selectedService, setSelectedService] = useState("");
  const [formValues, setFormValues] = useState<FormValues>(emptyForm);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const filteredGallery = useMemo(
    () => activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedGallery(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const updateField = (field: keyof FormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    if (formErrors[field]) setFormErrors((current) => ({ ...current, [field]: undefined }));
    if (submitted) setSubmitted(false);
  };

  const handleServiceBook = (serviceName: string) => {
    setSelectedService(serviceName);
    updateField("service", serviceName);
    scrollToSection("contact");
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    if (!formValues.name.trim()) nextErrors.name = "Please enter your name.";
    if (!formValues.phone.trim()) nextErrors.phone = "Please enter a phone number.";
    if (!formValues.email.trim()) nextErrors.email = "Please enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(formValues.email)) nextErrors.email = "Please enter a valid email.";
    if (!formValues.service) nextErrors.service = "Please choose a service.";
    if (!formValues.preferredDate) nextErrors.preferredDate = "Please choose a preferred date.";
    if (!formValues.preferredTime) nextErrors.preferredTime = "Please choose a preferred time.";
    if (!formValues.message.trim()) nextErrors.message = "Tell us a little about what you’re considering.";
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm();
    setFormErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSubmitted(true);
  };

  return (
    <div className="site-shell" id="home">
      <header className="site-header">
        <div className="header-inner">
          <LogoMark compact />
          <nav className={`desktop-nav ${mobileMenuOpen ? "desktop-nav--open" : ""}`} aria-label="Main navigation">
            {[
              ["HOME", "home"],
              ["SERVICES", "services"],
              ["ABOUT", "about"],
              ["GALLERY", "gallery"],
              ["CONTACT", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <button className="header-book" type="button" onClick={() => scrollToSection("contact")}>
            <span>Book now</span><ArrowUpRight size={16} strokeWidth={1.6} />
          </button>
          <button className="menu-toggle" type="button" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <div className={`mobile-nav ${mobileMenuOpen ? "mobile-nav--open" : ""}`} id="mobile-nav">
          {[
            ["Home", "home"],
            ["Services", "services"],
            ["About", "about"],
            ["Gallery", "gallery"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)}>{label}<ArrowRight size={16} /></a>
          ))}
          <button type="button" onClick={() => { setMobileMenuOpen(false); scrollToSection("contact"); }}>Book an appointment <ArrowUpRight size={16} /></button>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-texture" aria-hidden="true" />
          <div className="hero-content page-width">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--dark"><span className="eyebrow-dot" />Longford · Tasmania</p>
              <h1 id="hero-title">A little time,<br /><em>beautifully yours.</em></h1>
              <p className="hero-tagline">{siteContent.tagline}</p>
              <p className="hero-intro">{siteContent.intro}</p>
              <div className="hero-actions">
                <button className="primary-button" type="button" onClick={() => scrollToSection("contact")}>Book an appointment <ArrowUpRight size={17} /></button>
                <a className="quiet-link" href="#services">View services <ArrowDown size={16} /></a>
              </div>
              <div className="hero-note"><span>01</span><p>Thoughtful beauty services<br />in a relaxed home studio.</p></div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&w=1500&q=88" alt="Warm, sunlit PureEssence home beauty studio with a calm editorial atmosphere" /></div>
              <div className="hero-image-caption"><span>PureEssence</span><span>Beauty, close to home</span></div>
              <div className="hero-stamp" aria-hidden="true"><span>PE</span><small>Est.</small></div>
            </div>
          </div>
          <a className="scroll-cue" href="#services" aria-label="Scroll to services"><span>Scroll to explore</span><ArrowDown size={16} /></a>
        </section>

        <section className="intro-band" aria-label="PureEssence introduction">
          <div className="page-width intro-band__inner">
            <span className="section-number">/ 00</span>
            <p>Beauty should feel like a pause.<br /><em>A chance to come back to yourself.</em></p>
            <span className="intro-band__mark" aria-hidden="true">✦</span>
          </div>
        </section>

        <section className="services-section page-section" id="services" aria-labelledby="services-title">
          <div className="page-width">
            <div className="section-topline"><span>What we do</span><span>01 — Services</span></div>
            <div className="services-heading-row">
              <SectionHeading eyebrow="Beauty, your way" title={"Small rituals.\nA lasting glow."} copy="Explore the services available at PureEssence. Each appointment is approached with care, conversation, and room to make it yours." />
              <div className="heading-aside"><span className="aside-rule" /><p>Scroll through our current offering, then send an enquiry when you’re ready.</p></div>
            </div>
            <div className="services-grid">
              {services.map((service) => <ServiceCard key={service.id} service={service} onBook={handleServiceBook} />)}
            </div>
            <div className="section-footnote"><span>More services may be added over time.</span><button type="button" onClick={() => scrollToSection("contact")}>Ask about something else <ArrowUpRight size={16} /></button></div>
          </div>
        </section>

        <section className="about-section page-section" id="about" aria-labelledby="about-title">
          <div className="page-width about-layout">
            <div className="about-visuals">
              <div className="about-image-frame"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=88" alt="Cream-toned home beauty studio with linen, timber, and champagne details" loading="lazy" /></div>
              <div className="owner-placeholder"><div className="placeholder-icon"><Sparkles size={18} /></div><span>Owner portrait</span><small>A studio story to come</small></div>
              <span className="about-vertical">A space for your next ritual</span>
            </div>
            <div className="about-copy">
              <SectionHeading eyebrow="The PureEssence feeling" title="Beauty, with room to breathe." />
              <p className="about-lead">{siteContent.about}</p>
              <p className="about-body">No rushing, no one-size-fits-all script—just thoughtful service in a space that feels comfortable from the moment you arrive.</p>
              <div className="about-details">
                <div><span className="detail-icon"><MapPin size={17} /></span><span><small>Find us in</small><strong>Longford, Tasmania</strong></span></div>
                <div><span className="detail-icon"><Clock3 size={17} /></span><span><small>Appointments</small><strong>By enquiry</strong></span></div>
              </div>
              <button className="quiet-link quiet-link--dark" type="button" onClick={() => scrollToSection("contact")}>Make an enquiry <ArrowUpRight size={16} /></button>
            </div>
          </div>
        </section>

        <section className="gallery-section page-section" id="gallery" aria-labelledby="gallery-title">
          <div className="page-width">
            <div className="section-topline"><span>Selected details</span><span>02 — Gallery</span></div>
            <div className="gallery-heading-row">
              <SectionHeading eyebrow="A glimpse of the studio" title="The details matter." copy="A growing collection of the looks, textures, and quiet corners that make up the PureEssence world." />
              <span className="gallery-count">{String(filteredGallery.length).padStart(2, "0")} images</span>
            </div>
            <div className="gallery-filters" role="tablist" aria-label="Filter gallery by category">
              {galleryCategories.map((category) => <button key={category} className={activeCategory === category ? "is-active" : ""} type="button" role="tab" aria-selected={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}
            </div>
            <div className="gallery-grid">
              {filteredGallery.map((item) => <GalleryTile key={item.id} item={item} onOpen={setSelectedGallery} />)}
            </div>
            <div className="gallery-note"><span className="note-star">✦</span><p>Gallery placeholders are ready to be replaced with your own PureEssence work as it grows.</p></div>
          </div>
        </section>

        <section className="testimonial-section page-section" aria-labelledby="testimonial-title">
          <div className="page-width testimonial-inner">
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <div>
              <p className="eyebrow">A note from the studio</p>
              <h2 id="testimonial-title">Customer reviews<br /><em>coming soon.</em></h2>
              <p className="testimonial-copy">As PureEssence grows, this space will hold genuine words from people who have spent some time here.</p>
            </div>
            <span className="testimonial-signature">PureEssence<br /><small>Longford, TAS</small></span>
          </div>
        </section>

        <section className="contact-section page-section" id="contact" aria-labelledby="contact-title">
          <div className="page-width contact-layout">
            <div className="contact-intro">
              <div className="section-topline section-topline--light"><span>Start with a hello</span><span>03 — Contact</span></div>
              <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" />Let’s make a plan</p>
              <h2 id="contact-title">Ready to<br /><em>book?</em></h2>
              <p>Get in touch with PureEssence to enquire about your appointment. Share what you’re considering and a preferred time—we’ll be in touch personally.</p>
              <div className="contact-location"><MapPin size={17} /><span>PureEssence<br /><strong>Longford, Tasmania, Australia</strong></span></div>
              <div className="contact-links">
                <div className="contact-link"><Phone size={16} /><span><small>Phone</small><strong>{siteContent.contact.phone}</strong></span></div>
                <div className="contact-link"><Mail size={16} /><span><small>Email</small><strong>{siteContent.contact.email}</strong></span></div>
              </div>
              <div className="contact-socials"><span>Follow along</span><a href="#contact" title="Instagram details coming soon"><Instagram size={18} />Instagram</a><a href="#contact" title="Facebook details coming soon"><Facebook size={18} />Facebook</a></div>
            </div>
            <div className="enquiry-card">
              <div className="enquiry-card__top"><div><span className="form-kicker">Enquiry form</span><h3>Tell us what you’re considering.</h3></div><MessageCircle size={23} strokeWidth={1.25} /></div>
              {submitted ? (
                <div className="form-success" role="status"><div className="success-icon"><Check size={22} /></div><h3>Thank you, {formValues.name.split(" ")[0]}.</h3><p>Your enquiry is ready to be connected to your preferred booking or email service. For now, please note this form is a request and your appointment is not automatically confirmed.</p><button className="quiet-link quiet-link--dark" type="button" onClick={() => { setSubmitted(false); setFormValues(emptyForm); }}>Send another enquiry <ArrowRight size={16} /></button></div>
              ) : (
                <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-grid form-grid--two">
                    <Field label="Name *" id="name" error={formErrors.name}><input id="name" type="text" autoComplete="name" value={formValues.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Your full name" /></Field>
                    <Field label="Phone *" id="phone" error={formErrors.phone}><input id="phone" type="tel" autoComplete="tel" value={formValues.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="Best number to reach you" /></Field>
                  </div>
                  <Field label="Email *" id="email" error={formErrors.email}><input id="email" type="email" autoComplete="email" value={formValues.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" /></Field>
                  <Field label="Service *" id="service" error={formErrors.service}><select id="service" value={selectedService || formValues.service} onChange={(event) => { setSelectedService(event.target.value); updateField("service", event.target.value); }}><option value="">Choose a service</option>{services.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}<option value="Something else">Something else</option></select></Field>
                  <div className="form-grid form-grid--two">
                    <Field label="Preferred date *" id="preferredDate" error={formErrors.preferredDate}><div className="input-with-icon"><input id="preferredDate" type="date" value={formValues.preferredDate} onChange={(event) => updateField("preferredDate", event.target.value)} /><CalendarDays size={17} /></div></Field>
                    <Field label="Preferred time *" id="preferredTime" error={formErrors.preferredTime}><div className="input-with-icon"><input id="preferredTime" type="time" value={formValues.preferredTime} onChange={(event) => updateField("preferredTime", event.target.value)} /><Clock3 size={17} /></div></Field>
                  </div>
                  <Field label="Message *" id="message" error={formErrors.message}><textarea id="message" rows={4} value={formValues.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Tell us anything helpful about what you have in mind..." /></Field>
                  <div className="form-submit-row"><p>{siteContent.bookingNote}</p><button className="primary-button primary-button--dark" type="submit">Send enquiry <Send size={16} /></button></div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand"><LogoMark /><p>Beauty, confidence & self-care,<br />from the comfort of home.</p></div>
          <div className="footer-column"><span className="footer-label">Explore</span><a href="#home">Home</a><a href="#services">Services</a><a href="#about">About</a><a href="#gallery">Gallery</a></div>
          <div className="footer-column"><span className="footer-label">Connect</span><a href="#contact">Contact</a><a href="#contact">Instagram <small>coming soon</small></a><a href="#contact">Facebook <small>coming soon</small></a></div>
          <div className="footer-cta"><span>Have a question?</span><button className="text-button" type="button" onClick={() => scrollToSection("contact")}>Send an enquiry <ArrowUpRight size={17} /></button></div>
        </div>
        <div className="page-width footer-bottom"><span>© 2026 PureEssence. All rights reserved.</span><span>Longford, Tasmania</span><a href="#home">Back to top <ArrowUpRight size={14} /></a></div>
      </footer>

      <button className="floating-book" type="button" onClick={() => scrollToSection("contact")} aria-label="Book an appointment"><span>Book an appointment</span><ArrowUpRight size={16} /></button>

      {selectedGallery ? <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selectedGallery.title} gallery image`} onClick={() => setSelectedGallery(null)}><button className="lightbox-close" type="button" onClick={() => setSelectedGallery(null)} aria-label="Close image"><X size={22} /></button><div className="lightbox-content" onClick={(event) => event.stopPropagation()}><img src={selectedGallery.image} alt={selectedGallery.alt} /><div><span>{selectedGallery.category}</span><strong>{selectedGallery.title}</strong></div></div></div> : null}
    </div>
  );
}
