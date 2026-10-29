import { ArrowUpRight, Mail } from "lucide-react";

import Container from "../../layout/Container/Container";
import Button from "../../common/Button/Button";
import Divider from "../../common/Divider/Divider";

import styles from "./Footer.module.css";

const Linkedin = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.57V9H3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

const Twitter = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.963 6.817H1.684l7.73-8.835L1.254 2.25h6.826l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
  </svg>
);

const Github = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.69-3.88-1.36-3.88-1.36-.53-1.34-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.67 1.24 3.32.95.1-.74.4-1.24.73-1.52-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
  </svg>
);

const defaultColumns = [
  {
    title: "Product",
    links: [
      {
        label: "Features",
        href: "#features",
      },
      {
        label: "Solutions",
        href: "#solutions",
      },
      {
        label: "Pricing",
        href: "#pricing",
      },
    ],
  },
  {
    title: "Resources",
    links: [
      {
        label: "Documentation",
        href: "#documentation",
      },
      {
        label: "FAQ",
        href: "#faq",
      },
      {
        label: "Contact",
        href: "#contact",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About",
        href: "#about",
      },
      {
        label: "Team",
        href: "#team",
      },
      {
        label: "Careers",
        href: "#careers",
      },
    ],
  },
];

const defaultSocials = [
  {
    label: "GitHub",
    href: "#",
    icon: <Github />,
  },
  {
    label: "X",
    href: "#",
    icon: <Twitter />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <Linkedin />,
  },
];

function Footer({
  logo = "ProjectX",
  description = "Build something extraordinary with a reusable foundation designed for rapid product development.",
  columns = defaultColumns,
  socials = defaultSocials,
  cta,
  email,
  legalLinks = [
    {
      label: "Privacy",
      href: "#privacy",
    },
    {
      label: "Terms",
      href: "#terms",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ],
  copyright,
  variant = "default",
  className = "",
}) {
  const footerClasses = [styles.footer, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerClasses}>
      <Container>
        {/* =================================
            MAIN FOOTER
        ================================= */}

        <div className={styles.main}>
          {/* Brand */}

          <div className={styles.brand}>
            <a href="#" className={styles.logo} aria-label="Home">
              {logo}
            </a>

            <p className={styles.description}>{description}</p>

            {cta && (
              <div className={styles.brandCta}>
                <Button
                  variant={cta.variant || "primary"}
                  size={cta.size || "medium"}
                  onClick={cta.onClick}
                >
                  {cta.label}

                  <ArrowUpRight size={15} />
                </Button>
              </div>
            )}

            {email && (
              <a href={`mailto:${email}`} className={styles.email}>
                <Mail size={15} />
                {email}
              </a>
            )}
          </div>

          {/* Link columns */}

          <div className={styles.columns}>
            {columns.map((column) => (
              <div key={column.title} className={styles.column}>
                <h3 className={styles.columnTitle}>{column.title}</h3>

                <nav
                  className={styles.links}
                  aria-label={`${column.title} links`}
                >
                  {column.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={styles.link}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Socials */}

          {socials.length > 0 && (
            <div className={styles.socialColumn}>
              <h3 className={styles.columnTitle}>Connect</h3>

              <div className={styles.socials}>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialButton}
                    aria-label={social.label}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div className={styles.socialLinks}>
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialTextLink}
                    target={social.external ? "_blank" : undefined}
                    rel={social.external ? "noreferrer" : undefined}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <Divider spacing="medium" />

        {/* =================================
            BOTTOM BAR
        ================================= */}

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {copyright || `© ${currentYear} ${logo}. All rights reserved.`}
          </p>

          <nav className={styles.legal} aria-label="Legal navigation">
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} className={styles.legalLink}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
