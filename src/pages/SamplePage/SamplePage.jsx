import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/composed/Navbar/Navbar";
import Footer from "../../components/composed/Footer/Footer";

import Container from "../../components/layout/Container/Container";
import Section from "../../components/layout/Section/Section";

import Heading from "../../components/common/Heading/Heading";
import Badge from "../../components/common/Badge/Badge";
import Button from "../../components/common/Button/Button";
import Card from "../../components/common/Card/Card";

import styles from "./SamplePage.module.css";

function SamplePage({
  eyebrow = "SAMPLE PAGE",
  title = "A reusable inner page.",
  description = "This page exists to test navigation, responsive layouts, themes, and shared components across the boilerplate.",
  pageNumber = "01",
}) {
  return (
    <div className={styles.page}>
      <Navbar
        logo="HackX"
        variant="glass"
        position="sticky"
        links={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Sample 1",
            href: "/sample-page-1",
          },
          {
            label: "Team",
            href: "/team",
          },
          {
            label: "Sample 2",
            href: "/sample-page-2",
          },
        ]}
        cta={{
          label: "Back Home",
          variant: "outline",
          onClick: () => {
            window.location.href = "/";
          },
        }}
      />

      <main>
        {/* =================================
            HERO
        ================================= */}

        <Section
          spacing="large"
          className={styles.heroSection}
        >
          <Container>
            <div className={styles.hero}>
              <Link
                to="/"
                className={styles.backLink}
              >
                <ArrowLeft size={15} />
                Back to home
              </Link>

              <div className={styles.pageNumber}>
                {pageNumber}
              </div>

              <Heading
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="center"
                size="hero"
                as="h1"
              />
            </div>
          </Container>
        </Section>

        {/* =================================
            SAMPLE CONTENT
        ================================= */}

        <Section>
          <Container>
            <div className={styles.contentGrid}>
              <Card
                variant="default"
                padding="large"
              >
                <Badge
                  variant="primary"
                  icon={<Sparkles size={13} />}
                >
                  REUSABLE
                </Badge>

                <h2>
                  Shared components.
                </h2>

                <p>
                  This page uses the same Container,
                  Section, Heading, Badge, Card and
                  Button primitives used throughout
                  the boilerplate.
                </p>

                <Link to="/team">
                  <Button
                    variant="outline"
                    icon={
                      <ArrowRight size={16} />
                    }
                  >
                    Explore Team
                  </Button>
                </Link>
              </Card>

              <Card
                variant="glass"
                padding="large"
              >
                <Badge variant="accent">
                  THEME READY
                </Badge>

                <h2>
                  Works with every theme.
                </h2>

                <p>
                  This same page should remain visually
                  coherent across Cyber, Aurora, Luxury,
                  Minimal and Brutalist themes.
                </p>

                <Link to="/">
                  <Button variant="secondary">
                    Back Home
                  </Button>
                </Link>
              </Card>
            </div>
          </Container>
        </Section>

        {/* =================================
            ROUTE TEST
        ================================= */}

        <Section
          spacing="large"
          className={styles.routeSection}
        >
          <Container>
            <div className={styles.routeBox}>
              <span>ROUTE SYSTEM</span>

              <h2>
                Move between pages without
                breaking the design system.
              </h2>

              <div className={styles.routeActions}>
                <Link to="/sample-page-1">
                  <Button
                    variant="outline"
                    size="small"
                  >
                    Sample 1
                  </Button>
                </Link>

                <Link to="/team">
                  <Button
                    variant="outline"
                    size="small"
                  >
                    Team
                  </Button>
                </Link>

                <Link to="/sample-page-2">
                  <Button
                    variant="outline"
                    size="small"
                  >
                    Sample 2
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer
        logo="HackX"
        description="A reusable foundation for building polished hackathon products faster."
        email="hello@hackx.dev"
        columns={[
          {
            title: "Explore",
            links: [
              {
                label: "Home",
                href: "/",
              },
              {
                label: "Sample 1",
                href: "/sample-page-1",
              },
              {
                label: "Team",
                href: "/team",
              },
              {
                label: "Sample 2",
                href: "/sample-page-2",
              },
            ],
          },
          {
            title: "Resources",
            links: [
              {
                label: "Documentation",
                href: "#",
              },
              {
                label: "FAQ",
                href: "#",
              },
              {
                label: "Contact",
                href: "#",
              },
            ],
          },
          {
            title: "Company",
            links: [
              {
                label: "About",
                href: "/#about",
              },
              {
                label: "Team",
                href: "/team",
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default SamplePage;