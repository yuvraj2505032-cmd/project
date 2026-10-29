import { ArrowRight } from "lucide-react";

import Container from "../../layout/Container/Container";
import Section from "../../layout/Section/Section";
import Heading from "../../common/Heading/Heading";
import Button from "../../common/Button/Button";

import TeamMemberCard from "../TeamMemberCard/TeamMemberCard";

import styles from "./TeamSection.module.css";

function TeamSection({
  members = [],
  title = "The people behind the idea.",
  description =
    "Meet the team building the product, solving the problem, and bringing the idea to life.",
  eyebrow = "MEET OUR TEAM",
  buttonLabel = "Meet The Team",
  teamRoute = "/team",
}) {
  const handleTeamNavigation = () => {
    window.location.href = teamRoute;
  };

  return (
    <Section
      id="team"
      className={styles.section}
    >
      <Container>
        {/* =================================
            HEADER
        ================================= */}

        <div className={styles.header}>
          <Heading
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="center"
            size="medium"
          />
        </div>

        {/* =================================
            TEAM GRID
        ================================= */}

        <div className={styles.grid}>
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onViewDetails={() =>
                handleTeamNavigation()
              }
            />
          ))}
        </div>

        {/* =================================
            CTA
        ================================= */}

        <div className={styles.cta}>
          <Button
            variant="outline"
            size="large"
            icon={<ArrowRight size={17} />}
            onClick={handleTeamNavigation}
          >
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default TeamSection;