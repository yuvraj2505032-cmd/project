import { Check, CheckCircle2, Palette, ShieldCheck, UserRound } from "lucide-react";

import PageHeading from "../common/PageHeading";
import {
  ageGroups,
  colorThemes,
  profileCompleteness,
  professions,
} from "../../lib/profileOptions";

function Profile({
  profile,
  setProfile,
  colorTheme,
  onColorThemeChange,
  onAuth,
  user,
  saving,
  onSave,
  onDelete,
}) {
  const fields = [
    ["profession", "Profession", professions],
    [
      "state",
      "State / UT",
      [
        "Punjab",
        "Haryana",
        "Delhi",
        "Uttar Pradesh",
        "Maharashtra",
        "Rajasthan",
        "Gujarat",
        "Karnataka",
        "Tamil Nadu",
        "West Bengal",
        "Other",
      ],
    ],
    [
      "education",
      "Education level",
      [
        "No formal schooling",
        "School",
        "Higher secondary",
        "Diploma",
        "Undergraduate",
        "Postgraduate",
        "Doctorate",
        "Other",
      ],
    ],
    ["gender", "Gender", ["Woman", "Man", "Non-binary", "Prefer not to say"]],
    [
      "category",
      "Social category (optional)",
      ["General", "OBC", "SC", "ST", "EWS", "Prefer not to say"],
    ],
    [
      "disability",
      "Disability status (optional)",
      ["Yes", "No", "Prefer not to say"],
    ],
  ];
  const update = (key, value) =>
    setProfile((current) => ({ ...current, [key]: value }));
  const complete = profileCompleteness(profile);

  return (
    <>
      <PageHeading
        eyebrow="YOUR PROFILE"
        title="Your life, your details."
        description="Share only what helps match you with schemes. Optional sensitive fields can be left blank."
        action={
          <div className="result-count">
            <span>{complete}%</span> complete
          </div>
        }
      />
      <div className="profile-layout">
        <section className="form-panel">
          <div className="form-panel-heading">
            <div className="form-panel-icon">
              <UserRound size={20} />
            </div>
            <div>
              <h2>Personal details</h2>
              <p>Used to assess scheme rules, not to guarantee approval.</p>
            </div>
          </div>
          <div className="completion-bar">
            <div>
              <span>Profile completeness</span>
              <strong>{complete}%</strong>
            </div>
            <div className="progress-track">
              <span style={{ width: `${complete}%` }} />
            </div>
            <small>
              Fill relevant fields to improve the quality of matches.
            </small>
          </div>
          <div className="profile-fields">
            {fields.map(([key, label, options]) => (
              <label key={key} className="field-label">
                {label}
                {key === "category" || key === "disability" ? (
                  <span className="optional-label">Optional</span>
                ) : null}
                <select
                  value={profile[key] || ""}
                  onChange={(event) => update(key, event.target.value)}
                >
                  {!profile[key] && (
                    <option value="">Choose {label.toLowerCase()}</option>
                  )}
                  {options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
            <label className="field-label">
              Age group <span className="optional-label">Optional</span>
              <select
                value={profile.age_group || ""}
                onChange={(event) => update("age_group", event.target.value)}
              >
                <option value="">Prefer not to say</option>
                {ageGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field-label">
              Annual family income{" "}
              <span className="optional-label">Optional</span>
              <select
                value={profile.income}
                onChange={(event) => update("income", event.target.value)}
              >
                <option value="">Prefer not to say / not provided</option>
                <option value="under-1l">Below ₹1 lakh</option>
                <option value="1-2.5l">₹1–2.5 lakh</option>
                <option value="2.5-5l">₹2.5–5 lakh</option>
                <option value="5-8l">₹5–8 lakh</option>
                <option value="above-8l">Above ₹8 lakh</option>
              </select>
            </label>
            <label className="field-label">
              District <span className="optional-label">Optional</span>
              <input
                value={profile.district}
                onChange={(event) => update("district", event.target.value)}
                placeholder="Enter district"
                maxLength={100}
              />
            </label>
          </div>
          <section className="appearance-section" aria-labelledby="appearance-title">
            <div className="appearance-heading">
              <div className="form-panel-icon">
                <Palette size={18} />
              </div>
              <div>
                <h3 id="appearance-title">Appearance</h3>
                <p>Choose your preferred color theme.</p>
              </div>
            </div>
            <div className="theme-options" role="group" aria-label="Color theme">
              {colorThemes.map((theme) => (
                <button
                  key={theme.value}
                  type="button"
                  className={`theme-option theme-option-${theme.value}${colorTheme === theme.value ? " is-selected" : ""}`}
                  aria-pressed={colorTheme === theme.value}
                  onClick={() => onColorThemeChange(theme.value)}
                >
                  <span className="theme-preview" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                  <span className="theme-option-copy">
                    <strong>{theme.label}</strong>
                  </span>
                  {colorTheme === theme.value && (
                    <Check className="theme-option-check" size={16} aria-hidden="true" />
                  )}
                </button>
              ))}
            </div>
          </section>
          <div className="form-actions">
            <button
              className="btn-primary"
              type="button"
              onClick={onSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save profile"} {!saving && <Check size={15} />}
            </button>
            <span>
              {user
                ? "Profile changes are saved to your signed-in email account."
                : "Guest profile changes stay in this session only."}
            </span>
          </div>
        </section>
        <aside className="privacy-panel">
          <div className="privacy-emblem">
            <ShieldCheck size={23} />
          </div>
          <h3>Your information stays yours.</h3>
          <p>
            JanSahayak should collect the minimum information needed to help you
            explore schemes.
          </p>
          <ul>
            <li>
              <CheckCircle2 size={15} /> No full Aadhaar number
            </li>
            <li>
              <CheckCircle2 size={15} /> Optional sensitive fields
            </li>
            <li>
              <CheckCircle2 size={15} /> No document uploads in this MVP
            </li>
            <li>
              <CheckCircle2 size={15} /> Review before applying
            </li>
          </ul>
          <div className="privacy-divider" />
          <h4>Account & consent</h4>
          <p>
            Sign in to enable a persistent profile when Supabase is configured.
          </p>
          <button className="btn-secondary full-width" onClick={onAuth}>
            {user ? `Signed in as ${user.email || "your email"}` : "Sign in with email OTP"}
          </button>
          <button className="delete-link" onClick={onDelete}>
            {user ? "Delete my data and account" : "Clear session data"}
          </button>
        </aside>
      </div>
    </>
  );
}

export default Profile;
