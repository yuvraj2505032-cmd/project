import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import Container from "../../layout/Container/Container";
import Button from "../../common/Button/Button";
import IconButton from "../../common/IconButton/IconButton";
import ThemeToggle from "../../common/ThemeToggle/ThemeToggle";
import AuthControls from "../../auth/AuthControls/AuthControls";

import styles from "./Navbar.module.css";

const defaultLinks = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How It Works",
    href: "#how-it-works",
  },
  {
    label: "About",
    href: "#about",
  },
];

function Navbar({
  logo = "ProjectX",
  links = defaultLinks,
  cta,
  variant = "default",
  position = "sticky",
  className = "",
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  /* =================================
     CLOSE MOBILE MENU ON DESKTOP
  ================================= */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  /* =================================
     LOCK BODY SCROLL WHEN MENU OPEN
  ================================= */

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =================================
     ACTIVE SECTION
  ================================= */

  useEffect(() => {
    const handleScroll = () => {
      const sections = links
        .filter((link) =>
          link.href.startsWith("#")
        )
        .map((link) =>
          document.querySelector(link.href)
        )
        .filter(Boolean);

      let current = "";

      sections.forEach((section) => {
        const sectionTop =
          section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {
          current = `#${section.id}`;
        }
      });

      setActiveLink(current);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, [links]);

  /* =================================
     NAVIGATION
  ================================= */

  const handleNavigation = (href) => {
    setMenuOpen(false);

    if (href.startsWith("#")) {
      setActiveLink(href);
    }
  };

  /* =================================
     CTA HANDLER
  ================================= */

  const handleCtaClick = () => {
    setMenuOpen(false);
    cta?.onClick?.();
  };

  /* =================================
     NAVBAR CLASSES
  ================================= */

  const navClasses = [
    styles.navbar,
    styles[variant],
    styles[position],
    menuOpen ? styles.menuOpen : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={navClasses}>
      <Container className={styles.container}>
        <div className={styles.inner}>
          {/* =================================
              LOGO
          ================================= */}

          <a
            href="#"
            className={styles.logo}
            aria-label="Home"
            onClick={() =>
              setMenuOpen(false)
            }
          >
            {logo}
          </a>

          {/* =================================
              DESKTOP NAVIGATION
          ================================= */}

          <nav
            className={styles.desktopNav}
            aria-label="Primary navigation"
          >
            {links.map((link) => {
              const isActive =
                activeLink === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${styles.navLink} ${
                    isActive
                      ? styles.active
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(
                      link.href
                    )
                  }
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* =================================
              DESKTOP ACTIONS
          ================================= */}

          <div className={styles.desktopActions}>
            <AuthControls />

            <ThemeToggle />

            {cta && (
              <Button
                variant={
                  cta.variant ||
                  "primary"
                }
                size={
                  cta.size || "small"
                }
                onClick={handleCtaClick}
              >
                {cta.label}
              </Button>
            )}
          </div>

          {/* =================================
              MOBILE AUTH
          ================================= */}

          <div className={styles.mobileAuth}>
            <AuthControls />
          </div>

          {/* =================================
              MOBILE MENU TOGGLE
          ================================= */}

          <div
            className={styles.mobileToggle}
          >
            <IconButton
              icon={
                menuOpen ? (
                  <X />
                ) : (
                  <Menu />
                )
              }
              label={
                menuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              variant="ghost"
              onClick={() =>
                setMenuOpen(
                  (previous) =>
                    !previous
                )
              }
            />
          </div>
        </div>

        {/* =================================
            MOBILE MENU
        ================================= */}

        <div
          className={`${styles.mobileMenu} ${
            menuOpen
              ? styles.mobileMenuOpen
              : ""
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            className={styles.mobileNav}
            aria-label="Mobile navigation"
          >
            {/* ================================
                MOBILE LINKS
            ================================= */}

            {links.map((link) => {
              const isActive =
                activeLink === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`${styles.mobileNavLink} ${
                    isActive
                      ? styles.active
                      : ""
                  }`}
                  onClick={() =>
                    handleNavigation(
                      link.href
                    )
                  }
                  tabIndex={
                    menuOpen ? 0 : -1
                  }
                >
                  <span>{link.label}</span>

                  <span
                    className={
                      styles.mobileIndicator
                    }
                  />
                </a>
              );
            })}

            {/* ================================
                MOBILE APPEARANCE
            ================================= */}

            <div
              className={
                styles.mobileTheme
              }
            >
              <span>
                Appearance
              </span>

              <div
                tabIndex={
                  menuOpen ? 0 : -1
                }
              >
                <ThemeToggle />
              </div>
            </div>

            {/* ================================
                MOBILE CTA
            ================================= */}

            {cta && (
              <div
                className={
                  styles.mobileCta
                }
              >
                <Button
                  variant={
                    cta.variant ||
                    "primary"
                  }
                  size="large"
                  fullWidth
                  tabIndex={
                    menuOpen ? 0 : -1
                  }
                  onClick={
                    handleCtaClick
                  }
                >
                  {cta.label}
                </Button>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;