import TeamSection from "../../components/composed/TeamSection/TeamSection";
import Navbar from "../../components/composed/Navbar/Navbar";
import Footer from "../../components/composed/Footer/Footer";

import { teamMembers } from "../../data/team";

import { useAuth } from "../../context/AuthContext";

function AuthStatus() {
  const {
    user,
    profile,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div className="auth-status">
        <span className="status-label">
          AUTH STATUS
        </span>

        <h2>
          Loading authentication...
        </h2>
      </div>
    );
  }

  return (
    <div className="auth-status">
      <div className="status-heading">
        <div>
          <span className="status-label">
            AUTH STATUS
          </span>

          <h2>
            {user
              ? "Authenticated"
              : "Guest session"}
          </h2>
        </div>

        <span
          className={`status-dot ${
            user
              ? "status-dot-active"
              : ""
          }`}
        />
      </div>

      <div className="status-grid">
        <div className="status-card">
          <span>AUTH</span>

          <strong>
            {user
              ? "SIGNED IN"
              : "GUEST"}
          </strong>
        </div>

        <div className="status-card">
          <span>USER</span>

          <strong>
            {profile?.display_name ||
              user?.email ||
              "Visitor"}
          </strong>
        </div>

        <div className="status-card">
          <span>PROFILE</span>

          <strong>
            {profile
              ? "READY"
              : "DEFAULT"}
          </strong>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div>
      <Navbar
        logo="HackX"
        variant="glass"
        position="sticky"
        links={[
          {
            label: "Features",
            href: "#features",
          },
          {
            label: "How It Works",
            href: "#how-it-works",
          },
          {
            label: "Team",
            href: "#team",
          },
          {
            label: "About",
            href: "#about",
          },
        ]}
        cta={{
          label: "Launch Demo",
          variant: "primary",
          onClick: () => {
            document
              .querySelector("#demo")
              ?.scrollIntoView({
                behavior: "smooth",
              });
          },
        }}
      />

      <main>
        {/* =================================
            AUTH TEST
        ================================= */}

        <section
          style={{
            minHeight: "90vh",
            padding:
              "140px 24px 100px",
            background:
              "var(--bg-primary)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                maxWidth: "720px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  marginBottom: "14px",
                  color:
                    "var(--accent-primary)",
                  fontFamily:
                    "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing:
                    "0.14em",
                }}
              >
                HACKATHON BOILERPLATE
              </span>

              <h1
                style={{
                  margin: 0,
                  fontSize:
                    "clamp(48px, 8vw, 92px)",
                  lineHeight: 0.95,
                  letterSpacing:
                    "-0.05em",
                }}
              >
                Build faster.
                <br />
                Ship faster.
              </h1>

              <p
                style={{
                  maxWidth: "620px",
                  marginTop: "24px",
                  color:
                    "var(--text-secondary)",
                  fontSize: "17px",
                  lineHeight: 1.7,
                }}
              >
                A reusable React + CSS
                Modules foundation for
                turning hackathon ideas
                into polished products.
              </p>
            </div>

            <AuthStatus />
          </div>
        </section>

        {/* =================================
            FEATURES
        ================================= */}

        <section
          id="features"
          style={{
            minHeight: "75vh",
            padding:
              "120px 24px",
            background:
              "var(--surface-1)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                color:
                  "var(--accent-primary)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "11px",
                letterSpacing:
                  "0.14em",
              }}
            >
              FEATURES
            </span>

            <h2
              style={{
                marginTop: "12px",
                fontSize:
                  "clamp(36px, 5vw, 64px)",
                letterSpacing:
                  "-0.045em",
              }}
            >
              Built for the
              <br />
              hackathon workflow.
            </h2>
          </div>
        </section>

        {/* =================================
            HOW IT WORKS
        ================================= */}

        <section
          id="how-it-works"
          style={{
            minHeight: "75vh",
            padding:
              "120px 24px",
            background:
              "var(--bg-primary)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                color:
                  "var(--accent-primary)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "11px",
                letterSpacing:
                  "0.14em",
              }}
            >
              HOW IT WORKS
            </span>

            <h2
              style={{
                marginTop: "12px",
                fontSize:
                  "clamp(36px, 5vw, 64px)",
                letterSpacing:
                  "-0.045em",
              }}
            >
              Configure once.
              <br />
              Reuse everywhere.
            </h2>
          </div>
        </section>

        {/* =================================
            TEAM
        ================================= */}

        <TeamSection
          members={teamMembers}
          title="Meet the minds behind the project."
          description="Four people, one idea, and a lot of building."
        />

        {/* =================================
            TECHNOLOGY
        ================================= */}

        <section
          id="technology"
          style={{
            minHeight: "75vh",
            padding:
              "120px 24px",
            background:
              "var(--surface-1)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                color:
                  "var(--accent-primary)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "11px",
                letterSpacing:
                  "0.14em",
              }}
            >
              TECHNOLOGY
            </span>

            <h2
              style={{
                marginTop: "12px",
                fontSize:
                  "clamp(36px, 5vw, 64px)",
                letterSpacing:
                  "-0.045em",
              }}
            >
              React.
              <br />
              CSS Modules.
              <br />
              Supabase.
            </h2>
          </div>
        </section>

        {/* =================================
            DEMO
        ================================= */}

        <section
          id="demo"
          style={{
            minHeight: "70vh",
            padding:
              "120px 24px",
            background:
              "var(--bg-primary)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                color:
                  "var(--accent-primary)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "11px",
                letterSpacing:
                  "0.14em",
              }}
            >
              DEMO
            </span>

            <h2
              style={{
                marginTop: "12px",
                fontSize:
                  "clamp(36px, 5vw, 64px)",
                letterSpacing:
                  "-0.045em",
              }}
            >
              Authentication
              <br />
              is ready.
            </h2>
          </div>
        </section>

        {/* =================================
            ABOUT
        ================================= */}

        <section
          id="about"
          style={{
            minHeight: "70vh",
            padding:
              "120px 24px",
            background:
              "var(--surface-1)",
          }}
        >
          <div
            style={{
              width:
                "min(1100px, 100%)",
              margin: "0 auto",
            }}
          >
            <span
              style={{
                color:
                  "var(--accent-primary)",
                fontFamily:
                  "var(--font-mono)",
                fontSize: "11px",
                letterSpacing:
                  "0.14em",
              }}
            >
              ABOUT
            </span>

            <h2
              style={{
                marginTop: "12px",
                fontSize:
                  "clamp(36px, 5vw, 64px)",
                letterSpacing:
                  "-0.045em",
              }}
            >
              Your hackathon
              <br />
              starts here.
            </h2>
          </div>
        </section>
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
                href: "#about",
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

export default Home;