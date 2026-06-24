import {
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
  Phone,
} from "lucide-react";

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
];

const linkColumns = [
  {
    heading: "Services",
    links: [
      { label: "International", href: "#" },
      { label: "B2B Parcel", href: "#" },
      { label: "B2C Parcel", href: "#" },
      { label: "Documents", href: "#" },
      { label: "Warehousing", href: "#" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Tracking", href: "https://track.peeptoon.com" },
      { label: "Book Now", href: "https://local.peeptoon.com" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Coverage", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="footer-root"
      style={{
        background: "var(--surface-2)",
        borderTop: "1px solid var(--border)",
        paddingTop: 72,
        paddingBottom: 32,
      }}
    >
      <div className="container">
        {/* TOP grid */}
        <div
          className="footer-top grid grid-cols-1 lg:grid-cols-5 gap-10"
          data-reveal-group
        >
          {/* Brand lockup — span 2 on lg */}
          <div className="footer-brand lg:col-span-2" data-reveal-item>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
              }}
            >
              Peep<span className="gradient-text">toon</span>
            </div>

            <p className="text-muted" style={{ marginTop: 14, maxWidth: 360 }}>
              Ship smarter, faster, cheaper — Pan-India &amp; international
              courier.
            </p>

            <a
              href="https://wa.me/918794152726"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp cursor-pointer"
              style={{ marginTop: 22 }}
            >
              <MessageCircle size={18} strokeWidth={1.75} />
              Chat on WhatsApp
            </a>

            {/* socials */}
            <div
              className="flex items-center gap-3"
              style={{ marginTop: 24, flexWrap: "wrap" }}
            >
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="pill flex items-center justify-center rounded-full cursor-pointer footer-social"
                  style={{
                    width: 40,
                    height: 40,
                    padding: 0,
                    color: "var(--body)",
                    transition: "color .25s ease, transform .25s ease",
                  }}
                >
                  <Icon size={18} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* 3 link columns */}
          {linkColumns.map((col) => (
            <div key={col.heading} className="footer-links-col" data-reveal-item>
              <h3
                className="mono text-muted"
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  marginBottom: 16,
                }}
              >
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link cursor-pointer"
                      style={{
                        color: "var(--body)",
                        transition: "color .2s ease",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div
          className="footer-contact grid grid-cols-1 sm:grid-cols-3 gap-6"
          style={{ marginTop: 40 }}
          data-reveal
        >
          <div className="flex gap-3 items-start">
            <MapPin
              size={20}
              strokeWidth={1.75}
              style={{ flexShrink: 0, marginTop: 2, color: "var(--gold-deep)" }}
            />
            <span style={{ color: "var(--body)", fontSize: 14 }}>
              Near Shiv Mandir Aralia, Agartala, Tripura, India
            </span>
          </div>

          <div className="flex gap-3 items-start">
            <Phone
              size={20}
              strokeWidth={1.75}
              style={{ flexShrink: 0, marginTop: 2, color: "var(--gold-deep)" }}
            />
            <a
              href="tel:+917005364320"
              className="footer-link cursor-pointer"
              style={{
                color: "var(--body)",
                fontSize: 14,
                transition: "color .2s ease",
              }}
            >
              +91 7005 364 320
            </a>
          </div>

          <div className="flex gap-3 items-start">
            <MessageCircle
              size={20}
              strokeWidth={1.75}
              style={{ flexShrink: 0, marginTop: 2, color: "var(--gold-deep)" }}
            />
            <a
              href="https://wa.me/918794152726"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link cursor-pointer"
              style={{
                color: "var(--body)",
                fontSize: 14,
                transition: "color .2s ease",
              }}
            >
              WhatsApp +91 8794152726
            </a>
          </div>
        </div>

        {/* BOTTOM bar */}
        <div
          className="footer-bottom flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{
            marginTop: 44,
            paddingTop: 22,
            borderTop: "1px solid var(--border)",
            fontSize: 13,
            color: "var(--muted)",
          }}
        >
          <div
            className="flex items-center gap-3"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <span>© 2026 Peeptoon Private Limited</span>
            <span
              aria-hidden="true"
              className="flex items-center"
              style={{ gap: 2, marginLeft: 2 }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 14,
                  borderRadius: 2,
                  background: "#FF9933",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 14,
                  borderRadius: 2,
                  background: "#ffffff",
                  border: "1px solid var(--border)",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 14,
                  borderRadius: 2,
                  background: "#138808",
                }}
              />
            </span>
            <span>Made in India</span>
          </div>

          <div className="footer-policy flex items-center gap-3">
            <a
              href="#"
              className="footer-link cursor-pointer"
              style={{ color: "inherit", transition: "color .2s ease" }}
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="#"
              className="footer-link cursor-pointer"
              style={{ color: "inherit", transition: "color .2s ease" }}
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-social:hover {
          color: var(--gold-deep);
          transform: translateY(-2px);
        }
        .footer-link:hover {
          color: var(--ink);
        }

        /* ----- Mobile / small-phone refinements (max-width only) ----- */
        @media (max-width: 1024px) {
          .footer-root {
            padding-top: 56px;
          }
          /* On the single-column stack, lay the 3 link columns out as a
             2-col grid so they read well instead of one sparse column.
             The brand lockup stays full width above them. */
          .footer-top {
            grid-template-columns: 1fr 1fr;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 560px) {
          /* Give contact-row items vertical breathing room when stacked */
          .footer-contact > * {
            padding-block: 2px;
          }
        }

        @media (max-width: 400px) {
          .footer-root {
            padding-top: 48px;
          }
          /* Keep the bottom bar centered and wrapping; never overflow */
          .footer-bottom {
            text-align: center;
          }
          .footer-policy {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        /* Only collapse the link columns to a single column on the very
           narrowest phones, where 2 columns would crowd the labels. */
        @media (max-width: 340px) {
          .footer-top {
            grid-template-columns: 1fr;
          }
        }
      ` }} />
    </footer>
  );
}
