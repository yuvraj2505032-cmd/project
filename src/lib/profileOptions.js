export const professions = [
  "Student",
  "Farmer",
  "Entrepreneur",
  "Job seeker",
  "Salaried employee",
  "Self-employed",
  "Other",
];

export const ageGroups = [
  { value: "under_18", label: "Under 18", min: 0, max: 17 },
  { value: "18_24", label: "18–24", min: 18, max: 24 },
  { value: "25_34", label: "25–34", min: 25, max: 34 },
  { value: "35_44", label: "35–44", min: 35, max: 44 },
  { value: "45_59", label: "45–59", min: 45, max: 59 },
  { value: "60_plus", label: "60+", min: 60, max: 120 },
];

export const colorThemes = [
  { value: "green", label: "Green" },
  { value: "blue", label: "Blue" },
];

export function profileCompleteness(profile) {
  const keys = ["profession", "state", "age_group", "income", "education"];
  return Math.round(
    (keys.filter((key) => String(profile[key] || "").trim()).length /
      keys.length) *
      100,
  );
}
