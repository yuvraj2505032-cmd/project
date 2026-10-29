import {
  ArrowUpRight,
} from "lucide-react";

import Badge from "../../common/Badge/Badge";

import styles from "./TeamMemberCard.module.css";

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

function getInitial(name = "") {
  return name.trim().charAt(0).toUpperCase();
}

function TeamMemberCard({
  member,
  onViewDetails,
  className = "",
}) {
  const {
    name,
    role,
    shortBio,
    skills = [],
    github,
    linkedin,
    portfolio,
  } = member;

  const cardClasses = [
    styles.card,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={cardClasses}>
      {/* =================================
          INITIAL
      ================================= */}

      <div className={styles.avatar}>
        <span>{getInitial(name)}</span>
      </div>

      {/* =================================
          MEMBER INFO
      ================================= */}

      <div className={styles.content}>
        <div className={styles.identity}>
          <h3>{name}</h3>

          <span className={styles.role}>
            {role}
          </span>
        </div>

        <p className={styles.description}>
          {shortBio}
        </p>

        {/* =================================
            SKILLS
        ================================= */}

        {skills.length > 0 && (
          <div className={styles.skills}>
            {skills.map((skill) => (
              <Badge
                key={skill}
                size="small"
                variant="default"
              >
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* =================================
            BOTTOM
        ================================= */}

        <div className={styles.bottom}>
          <button
            type="button"
            className={styles.detailsButton}
            onClick={() =>
              onViewDetails?.(member)
            }
          >
            <span>View Profile</span>

            <ArrowUpRight size={15} />
          </button>

          <div className={styles.socials}>
            {github && (
              <a
                href={github}
                className={styles.socialLink}
                aria-label={`${name}'s GitHub`}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={15} />
              </a>
            )}

            {linkedin && (
              <a
                href={linkedin}
                className={styles.socialLink}
                aria-label={`${name}'s LinkedIn`}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={15} />
              </a>
            )}

            {portfolio && (
              <a
                href={portfolio}
                className={styles.socialLink}
                aria-label={`${name}'s portfolio`}
                target="_blank"
                rel="noreferrer"
              >
                <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TeamMemberCard;