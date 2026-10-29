import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  Bell,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileCheck2,
  Filter,
  Globe2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Home,
  Landmark,
  Leaf,
  LockKeyhole,
  LogOut,
  Menu,
  MessageCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { supabase, isSupabaseConfigured } from "./lib/supabase";
import "./jansahayak.css";

const demoSchemes = [
  {
    id: "demo-1",
    title: "National Scholarship Discovery",
    department: "Central government · Education",
    type: "Scholarship",
    level: "Central",
    summary:
      "Example record to demonstrate how verified scholarship opportunities will appear.",
    benefits: "Benefit details pending verification",
    status: "needs_review",
    deadline: null,
    state: "All India",
    profession: ["student"],
    officialUrl: "https://scholarships.gov.in",
    documents: ["Education certificates", "Income certificate (if required)"],
    tags: ["education", "scholarship"],
    demo: true,
  },
  {
    id: "demo-2",
    title: "Agriculture Support Opportunity",
    department: "State agriculture department",
    type: "Subsidy",
    level: "State",
    summary:
      "Illustrative farmer support record. Eligibility and current availability must be confirmed by an administrator.",
    benefits: "Benefit details pending verification",
    status: "needs_review",
    deadline: null,
    state: "Punjab",
    profession: ["farmer"],
    officialUrl: "https://www.myscheme.gov.in",
    documents: [
      "Identity/address proof (as required)",
      "Land or cultivation records (if required)",
    ],
    tags: ["farmer", "agriculture"],
    demo: true,
  },
  {
    id: "demo-3",
    title: "Entrepreneurship Support Opportunity",
    department: "MSME / entrepreneurship",
    type: "Grant",
    level: "Central",
    summary:
      "Illustrative entrepreneurship opportunity awaiting official-source review.",
    benefits: "Benefit details pending verification",
    status: "needs_review",
    deadline: null,
    state: "All India",
    profession: ["entrepreneur"],
    officialUrl: "https://www.myscheme.gov.in",
    documents: ["Business registration documents (if required)"],
    tags: ["business", "entrepreneur"],
    demo: true,
  },
];
const navItems = [
  { to: "/", label: "Overview", icon: Home },
  { to: "/discover", label: "Find schemes", icon: Search },
  { to: "/saved", label: "Saved schemes", icon: Bookmark },
  { to: "/assistant", label: "AI assistant", icon: MessageCircle },
  { to: "/profile", label: "My profile", icon: UserRound },
];
const professions = [
  "Student",
  "Farmer",
  "Entrepreneur",
  "Job seeker",
  "Salaried employee",
  "Self-employed",
  "Other",
];
const languages = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी" },
  { value: "pa", label: "ਪੰਜਾਬੀ" },
];
const ageGroups = [
  { value: "under_18", label: "Under 18", min: 0, max: 17 },
  { value: "18_24", label: "18–24", min: 18, max: 24 },
  { value: "25_34", label: "25–34", min: 25, max: 34 },
  { value: "35_44", label: "35–44", min: 35, max: 44 },
  { value: "45_59", label: "45–59", min: 45, max: 59 },
  { value: "60_plus", label: "60+", min: 60, max: 120 },
];
const welcomeChatMessage = {
  role: "assistant",
  content:
    "Hello! I can help you explore government schemes using verified records. Ask me about scholarships, farmer support, or eligibility. I will flag anything that needs official confirmation.",
};
const createDefaultProfile = () => ({
  profession: "Student",
  state: "Punjab",
  district: "",
  age_group: "",
  gender: "",
  income: "",
  category: "",
  education: "Undergraduate",
  disability: "Prefer not to say",
  language: "en",
});

function readGuestBookmarks() {
  try {
    const value = JSON.parse(
      window.localStorage.getItem("jansahayak-bookmarks") || "[]",
    );
    return Array.isArray(value)
      ? value.filter((id) => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

function writeGuestBookmarks(bookmarks) {
  try {
    window.localStorage.setItem(
      "jansahayak-bookmarks",
      JSON.stringify(bookmarks),
    );
    return true;
  } catch {
    return false;
  }
}

async function checkAdminAccess(token) {
  if (!token) return false;
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/admin/me`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  if (response.status === 401 || response.status === 403) return false;
  if (!response.ok) throw new Error("Admin service is unavailable.");
  return (await response.json()).role || false;
}

function AppShell() {
  const [schemes, setSchemes] = useState(demoSchemes);
  const [bookmarks, setBookmarks] = useState(readGuestBookmarks);
  const [matches, setMatches] = useState({});
  const [profile, setProfile] = useState(createDefaultProfile);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminUserId, setAdminUserId] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [chatMessages, setChatMessages] = useState([welcomeChatMessage]);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = Boolean(user && adminUserId === user.id && adminRole);
  useEffect(() => {
    const handleShortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        navigate("/discover");
        window.requestAnimationFrame(() => {
          document.querySelector('[aria-label="Search schemes"]')?.focus();
        });
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [navigate]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!isSupabaseConfigured) return;
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user || null));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setUser(session?.user || null),
    );
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!user) return;
    let active = true;
    supabase.auth
      .getSession()
      .then(({ data }) => checkAdminAccess(data.session?.access_token))
      .then((role) => {
        if (active) {
          setAdminUserId(role ? user.id : null);
          setAdminRole(role || null);
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV)
          console.error("Could not verify administrator access.", error);
      });
    return () => {
      active = false;
    };
  }, [user]);
  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        const headers = { Authorization: `Bearer ${token}` };
        const base =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const [pr, br] = await Promise.all([
          fetch(`${base}/api/v1/profile`, { headers }),
          fetch(`${base}/api/v1/bookmarks`, { headers }),
        ]);
        if (pr.ok) {
          const d = await pr.json();
          if (active)
            setProfile((p) => ({
              ...p,
              profession: d.profession || p.profession,
              state: d.state_code || p.state,
              district: d.district_code || "",
              age_group:
                d.age_group ||
                ageGroups.find(
                  (group) =>
                    Number(d.age) >= group.min && Number(d.age) <= group.max,
                )?.value ||
                p.age_group,
              gender: d.gender || "",
              income: d.annual_income_band || "",
              category: d.social_category || "",
              education: d.education_level || p.education,
              disability: d.disability_status || p.disability,
              language: d.preferred_language || p.language,
            }));
        }
        if (br.ok) {
          const d = await br.json();
          if (active)
            setBookmarks((current) => [
              ...new Set([
                ...(d.items || []).map((item) => item.scheme_id),
                ...current.filter((id) => String(id).startsWith("demo-")),
              ]),
            ]);
        }
      } catch (error) {
        if (import.meta.env.DEV) console.error("Could not load account data.", error);
      }
    })();
    return () => {
      active = false;
    };
  }, [user]);
  useEffect(() => {
    if (!user) return;
    let active = true;
    (async () => {
      try {
        const token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        const r = await fetch(
          `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/matches/evaluate`,
          { method: "POST", headers: { Authorization: `Bearer ${token}` } },
        );
        if (r.ok) {
          const d = await r.json();
          const map = {};
          (d.items || []).forEach((x) => (map[x.scheme_id] = x));
          if (active) setMatches(map);
        }
      } catch (error) {
        if (import.meta.env.DEV) console.error("Could not evaluate scheme matches.", error);
      }
    })();
    return () => {
      active = false;
    };
  }, [
    user,
    profile.profession,
    profile.state,
    profile.education,
    profile.age_group,
    profile.income,
  ]);
  const approved = schemes.filter((s) => s.status === "published" && !s.demo);
  const showToast = (s) => setToast(s);
  async function signOut() {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signOut();
      if (error) {
        showToast("Could not sign out. Please try again.");
        return;
      }
    }
    setUser(null);
    setAdminUserId(null);
    setAdminRole(null);
    setBookmarks(readGuestBookmarks());
    showToast("You have been signed out.");
  }
  async function requestAccountDeletion() {
    if (!user) {
      setProfile(createDefaultProfile());
      setBookmarks([]);
      setQuery("");
      setLanguage("en");
      writeGuestBookmarks([]);
      resetChat();
      showToast(
        "Session data cleared. No guest profile is stored on this device.",
      );
      return;
    }
    if (
      !window.confirm(
        "Delete your JanSahayak account and associated personal data? This cannot be undone.",
      )
    )
      return;
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/account/deletion-request`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } },
      );
      const d = await r.json().catch(() => ({}));
      if (!r.ok)
        throw new Error(d.detail || "Account deletion could not be completed.");
      await supabase.auth.signOut();
      setUser(null);
      setBookmarks([]);
      showToast("Account deleted. You have been signed out.");
    } catch (e) {
      showToast(e.message || "Account deletion could not be completed.");
    }
  }
  async function saveProfile() {
    if (!user) {
      showToast(
        "Profile saved for this session. Sign in to sync it securely across visits.",
      );
      return;
    }
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            profession: profile.profession,
            age: null,
            age_group: profile.age_group || null,
            gender: profile.gender || null,
            state_code: profile.state || null,
            district_code: profile.district || null,
            annual_income_band: profile.income || null,
            social_category: profile.category || null,
            education_level: profile.education || null,
            disability_status: profile.disability || null,
            preferred_language: profile.language || language,
          }),
        },
      );
      if (!r.ok)
        throw new Error(
          "Profile service unavailable. Check backend and database setup.",
        );
      showToast("Profile saved securely.");
    } catch (e) {
      showToast(e.message || "Could not save profile.");
    }
  }
  async function sendOtp(phone) {
    if (!isSupabaseConfigured) {
      throw new Error("Add Supabase environment variables to enable phone OTP.");
    }
    const { error } = await supabase.auth.signInWithOtp({ phone });
    if (error) throw error;
    showToast("OTP sent. Check your messages.");
  }
  async function signInAdmin(email, password) {
    if (!isSupabaseConfigured) {
      throw new Error("Administrator sign-in is not configured yet.");
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (!data.session?.access_token || !data.user) {
      throw new Error("Sign-in did not return an active session.");
    }
    const role = await checkAdminAccess(data.session.access_token);
    setUser(data.user);
    if (!role) {
      setAdminUserId(null);
      setAdminRole(null);
      throw new Error("This account does not have an administrator role.");
    }
    setAdminUserId(data.user.id);
    setAdminRole(role);
    setAdminLoginOpen(false);
    navigate("/admin");
    showToast("Administrator access verified.");
  }
  async function verifyOtp(phone, token) {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });
    if (error) throw error;
    setUser(data.user);
    setAuthOpen(false);
    showToast("Signed in successfully.");
  }
  const refreshSchemes = async () => {
    try {
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/schemes`,
      );
      if (!r.ok) throw new Error();
      const d = await r.json();
      if (Array.isArray(d.items))
        setSchemes(
          d.items.map((x) => ({
            id: x.id,
            title: x.title,
            department: x.department || "Government department",
            type: x.scheme_type || "Other",
            level: x.government_level || "Central",
            summary: x.summary || x.description || "",
            benefits: x.benefits || "See official scheme details",
            status: x.verification_status || "published",
            deadline: x.deadline || null,
            state: x.state_code || "All India",
            profession: [],
            officialUrl:
              x.official_source_url ||
              x.application_url ||
              "https://www.myscheme.gov.in/",
            documents: (x.scheme_documents || []).map((d) => d.document_name),
            demo: false,
            applicationStatus: x.application_status,
          })),
        );
    } catch {
      /* Local review-safe demo remains visible until API is configured. */
    }
  };
  useEffect(() => {
    let active = true;
    fetch(
      `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/schemes`,
    )
      .then((response) => {
        if (!response.ok) throw new Error("Scheme service is unavailable.");
        return response.json();
      })
      .then((data) => {
        if (active && Array.isArray(data.items)) {
          setSchemes(
            data.items.map((item) => ({
              id: item.id,
              title: item.title,
              department: item.department || "Government department",
              type: item.scheme_type || "Other",
              level: item.government_level || "Central",
              summary: item.summary || item.description || "",
              benefits: item.benefits || "See official scheme details",
              status: item.verification_status || "published",
              deadline: item.deadline || null,
              state: item.state_code || "All India",
              profession: [],
              officialUrl:
                item.official_source_url ||
                item.application_url ||
                "https://www.myscheme.gov.in/",
              documents: (item.scheme_documents || []).map(
                (document) => document.document_name,
              ),
              demo: false,
              applicationStatus: item.application_status,
            })),
          );
        }
      })
      .catch((error) => {
        if (import.meta.env.DEV) console.error("Could not load schemes.", error);
      });
    return () => {
      active = false;
    };
  }, []);
  async function toggleBookmark(id) {
    const wasSaved = bookmarks.includes(id);
    if (user && !String(id).startsWith("demo-")) {
      try {
        const token = (await supabase.auth.getSession()).data.session
          ?.access_token;
        const base =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const r = await fetch(`${base}/api/v1/bookmarks/${id}`, {
          method: wasSaved ? "DELETE" : "PUT",
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!r.ok) throw new Error("Bookmark service unavailable.");
      } catch (e) {
        showToast(e.message || "Could not update saved schemes.");
        return;
      }
    }
    const nextBookmarks = wasSaved
      ? bookmarks.filter((savedId) => savedId !== id)
      : [...bookmarks, id];
    setBookmarks(nextBookmarks);
    const guestBookmarkSaved = !user
      ? writeGuestBookmarks(nextBookmarks)
      : !String(id).startsWith("demo-") ||
        writeGuestBookmarks(
          nextBookmarks.filter((savedId) =>
            String(savedId).startsWith("demo-"),
          ),
        );
    showToast(
      !guestBookmarkSaved
        ? "Saved for this session only. Browser storage is unavailable."
        : wasSaved
          ? "Removed from saved schemes."
          : "Saved to your list.",
    );
  }
  async function askAssistant(message) {
    const text = message.trim();
    if (!text) return;
    setChatMessages((m) => [...m, { role: "user", content: text }]);
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            message: text,
            language,
            profile: {
              profession: profile.profession,
              state: profile.state,
              education: profile.education,
              age_group: profile.age_group || null,
              income: profile.income || null,
            },
          }),
        },
      );
      if (!r.ok) throw new Error();
      const data = await r.json();
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch {
      setChatMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I cannot reach the scheme assistant service right now. Please check the official government website before acting on any scheme information. You can browse available records in Find schemes; records marked as examples are not verified opportunities.",
        },
      ]);
    }
  }
  function resetChat() {
    setChatMessages([welcomeChatMessage]);
  }
  async function createScheme(payload) {
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      if (!token) throw new Error("Sign in with an admin account first.");
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      const r = await fetch(`${base}/api/v1/admin/schemes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.detail || "Could not create scheme draft.");
      showToast("Scheme saved as a draft. Publish it after a separate review.");
      return d.item;
    } catch (e) {
      showToast(e.message || "Could not create scheme.");
      return false;
    }
  }
  async function runDiscovery(queryText) {
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      if (!token) throw new Error("Sign in with an administrator account first.");
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/admin/discovery-runs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query: queryText }),
        },
      );
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.detail || "Web discovery failed.");
      showToast(
        `Research complete: ${data.candidates_added || 0} new candidates from ${data.queries_run || 1} search. Review each source before approval.`,
      );
      return data;
    } catch (e) {
      showToast(e.message || "Could not start discovery run.");
      return null;
    }
  }
  async function decideCandidate(id, action) {
    if (String(id).startsWith("demo-")) {
      if (action === "reject") {
        setSchemes((current) =>
          current.map((scheme) =>
            scheme.id === id ? { ...scheme, status: "rejected" } : scheme,
          ),
        );
        showToast("Example dismissed from this local review queue.");
        return true;
      } else {
        showToast("Demo records cannot be published.");
        return false;
      }
    }
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      const r = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/admin/candidates/${id}/${action}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            reason:
              action === "reject"
                ? "Rejected from admin review"
                : "Approved after official-source review",
          }),
        },
      );
      if (!r.ok) throw new Error();
      showToast(`Candidate ${action === "approve" ? "approved" : "rejected"}.`);
      return true;
    } catch {
      showToast(
        "Admin API unavailable. Configure the backend and admin role first.",
      );
      return false;
    }
  }
  async function publishScheme(id, reason) {
    try {
      const token = (await supabase.auth.getSession()).data.session
        ?.access_token;
      if (!token) throw new Error("Administrator session expired. Sign in again.");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"}/api/v1/admin/schemes/${id}/publish`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason,
            confirm_official_source: true,
          }),
        },
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.detail || "Could not publish draft.");
      showToast("Scheme published and available in the citizen listing.");
      await refreshSchemes();
      return true;
    } catch (error) {
      showToast(error.message || "Could not publish draft.");
      return false;
    }
  }
  return (
    <div className="app-frame">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <Landmark size={22} />
          </div>
          <div>
            <strong>JanSahayak</strong>
            <span>Benefits, made simpler</span>
          </div>
          <button
            className="icon-btn mobile-close"
            onClick={() => setMobileNav(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setMobileNav(false)}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              <n.icon size={18} />
              <span>{n.label}</span>
            </NavLink>
          ))}
          <button
            className={`nav-link admin-nav-link ${isAdmin && location.pathname === "/admin" ? "active" : ""}`}
            onClick={() => {
              setMobileNav(false);
              if (isAdmin) navigate("/admin");
              else setAdminLoginOpen(true);
            }}
          >
            {isAdmin ? <ShieldCheck size={18} /> : <LockKeyhole size={18} />}
            <span>{isAdmin ? "Admin workspace" : "Admin sign in"}</span>
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="trust-card">
            <div className="trust-icon">
              <ShieldCheck size={18} />
            </div>
            <strong>Trust comes first</strong>
            <p>
              Only reviewed records should be treated as verified. Always
              confirm details on the official portal.
            </p>
            <a
              href="https://www.myscheme.gov.in/"
              target="_blank"
              rel="noreferrer"
            >
              Official scheme directory <ArrowRight size={13} />
            </a>
          </div>
          <button className="profile-mini" onClick={() => navigate("/profile")}>
            <div className="avatar">{user?.phone?.slice(-2) || "JS"}</div>
            <div className="profile-mini-text">
              <strong>{user?.phone || "Your profile"}</strong>
              <span>{user ? "Signed in" : "Personalize your matches"}</span>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <button
            className="icon-btn menu-toggle"
            onClick={() => setMobileNav(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
          <div className="breadcrumb">
            <span>JanSahayak</span>
            <span className="crumb-slash">/</span>
            <strong>
              {navItems.find((n) => n.to === location.pathname)?.label ||
                (location.pathname === "/admin" ? "Admin review" : "Workspace")}
            </strong>
          </div>
          <div className="top-actions">
            <label className="language-select">
              <Globe2 size={15} />
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setProfile((p) => ({ ...p, language: e.target.value }));
                }}
                aria-label="Language"
              >
                {languages.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              className="icon-btn notification-btn"
              aria-label="Notifications"
              onClick={() =>
                showToast(
                  "You are all caught up. Notification delivery will be enabled as channels are configured.",
                )
              }
            >
              <Bell size={18} />
              <i />
            </button>
            {user ? (
              <button className="top-login" onClick={signOut}>
                <LogOut size={15} /> Sign out
              </button>
            ) : (
              <button className="top-login" onClick={() => setAuthOpen(true)}>
                Sign in <ArrowRight size={15} />
              </button>
            )}
          </div>
        </header>
        <main className="page-content">
          <Routes>
            <Route
              path="/"
              element={
                <Overview
                  schemes={schemes}
                  approved={approved}
                  bookmarks={bookmarks}
                  profile={profile}
                  setProfile={setProfile}
                  onNavigate={navigate}
                  onAuth={() => setAuthOpen(true)}
                />
              }
            />
            <Route
              path="/discover"
              element={
                <Discover
                  schemes={schemes}
                  matches={matches}
                  bookmarks={bookmarks}
                  onBookmark={toggleBookmark}
                  query={query}
                  setQuery={setQuery}
                  onNavigate={navigate}
                />
              }
            />
            <Route
              path="/saved"
              element={
                <Saved
                  schemes={schemes.filter((s) => bookmarks.includes(s.id))}
                  matches={matches}
                  onBookmark={toggleBookmark}
                  onDiscover={() => navigate("/discover")}
                />
              }
            />
            <Route
              path="/assistant"
              element={
                <Assistant
                  messages={chatMessages}
                  onAsk={askAssistant}
                  language={language}
                  onLanguage={setLanguage}
                  onReset={resetChat}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  profile={profile}
                  setProfile={setProfile}
                  onAuth={() => setAuthOpen(true)}
                  user={user}
                  onToast={showToast}
                  onSave={saveProfile}
                  onDelete={requestAccountDeletion}
                />
              }
            />
            <Route
              path="/admin"
              element={
                isAdmin ? (
                  <Admin
                    onRun={runDiscovery}
                    onDecide={decideCandidate}
                    onCreate={createScheme}
                    onPublish={publishScheme}
                    adminRole={adminRole}
                  />
                ) : (
                  <AdminAccessPanel
                    signedIn={Boolean(user)}
                    onLogin={() => setAdminLoginOpen(true)}
                  />
                )
              }
            />
            <Route
              path="*"
              element={
                <Overview
                  schemes={schemes}
                  approved={approved}
                  bookmarks={bookmarks}
                  profile={profile}
                  setProfile={setProfile}
                  onNavigate={navigate}
                  onAuth={() => setAuthOpen(true)}
                />
              }
            />
          </Routes>
        </main>
        <footer className="app-footer">
          <span>© {new Date().getFullYear()} JanSahayak</span>
          <span>
            <ShieldCheck size={13} /> Your data. Your choice.
          </span>
          <a
            href="https://www.myscheme.gov.in/"
            target="_blank"
            rel="noreferrer"
          >
            Official scheme directory <ArrowRight size={12} />
          </a>
        </footer>
      </div>
      {mobileNav && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileNav(false)}
        />
      )}
      {authOpen && (
        <AuthDialog
          onClose={() => setAuthOpen(false)}
          onSend={sendOtp}
          onVerify={verifyOtp}
        />
      )}
      {adminLoginOpen && (
        <AdminLoginDialog
          onClose={() => setAdminLoginOpen(false)}
          onSubmit={signInAdmin}
        />
      )}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
function Overview({
  approved,
  bookmarks,
  profile,
  setProfile,
  onNavigate,
}) {
  const [showWelcome, setShowWelcome] = useState(true);
  const ready = approved.length;
  return (
    <>
      <div className="welcome-strip">
        <div className="welcome-symbol">
          <Sparkles size={18} />
        </div>
        <div>
          <strong>Find support that fits your life.</strong>
          <p>
            Explore schemes and scholarships using your profile. Always confirm
            details with the official source.
          </p>
        </div>
        <button onClick={() => onNavigate("/discover")}>
          Explore schemes <ArrowRight size={16} />
        </button>
        {showWelcome && (
          <button
            className="strip-close"
            onClick={() => setShowWelcome(false)}
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <section className="hero-block">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> YOUR PERSONAL BENEFITS COMPANION
          </div>
          <h1>
            Good support should
            <br />
            <em>find its way to you.</em>
          </h1>
          <p>
            Discover government schemes, scholarships and support opportunities
            based on who you are and what you need.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => onNavigate("/discover")}
            >
              Find my schemes <ArrowRight size={16} />
            </button>
            <button
              className="btn-secondary"
              onClick={() => onNavigate("/profile")}
            >
              Complete my profile <UserRound size={16} />
            </button>
          </div>
          <div className="hero-proof">
            <span>
              <CheckCircle2 size={15} /> Official-source review
            </span>
            <span>
              <ShieldCheck size={15} /> Privacy-minded
            </span>
            <span>
              <Globe2 size={15} /> English · हिन्दी · ਪੰਜਾਬੀ
            </span>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="illustration-orbit orbit-one" />
          <div className="illustration-orbit orbit-two" />
          <div className="hero-center-icon">
            <Landmark size={44} />
          </div>
          <div className="float-card float-card-top">
            <div className="float-icon mint">
              <GraduationCap size={18} />
            </div>
            <div>
              <strong>Education support</strong>
              <span>Scholarships & grants</span>
            </div>
            <CheckCircle2 size={16} className="float-check" />
          </div>
          <div className="float-card float-card-bottom">
            <div className="float-icon peach">
              <Leaf size={18} />
            </div>
            <div>
              <strong>For your profession</strong>
              <span>Matches tailored to you</span>
            </div>
            <ArrowDownRight size={16} className="float-arrow" />
          </div>
          <div className="illustration-spark spark-a">✳</div>
          <div className="illustration-spark spark-b">✦</div>
        </div>
      </section>
      <section className="metric-grid">
        <Metric
          icon={Landmark}
          label="Verified schemes"
          value={String(ready).padStart(2, "0")}
          foot={ready ? "Published records" : "No verified records yet"}
          color="mint"
        />
        <Metric
          icon={Bookmark}
          label="Saved for later"
          value={String(bookmarks.length).padStart(2, "0")}
          foot="Your personal shortlist"
          color="lilac"
        />
        <Metric
          icon={UserRound}
          label="Profile complete"
          value={`${profileCompleteness(profile)}%`}
          foot="Improve your matches"
          color="peach"
        />
        <Metric
          icon={ShieldCheck}
          label="Review standard"
          value="100%"
          foot="Manual approval required"
          color="blue"
        />
      </section>
      <div className="section-title-row">
        <div>
          <div className="eyebrow">START HERE</div>
          <h2>What brings you here?</h2>
          <p>Choose a path to find the right opportunities.</p>
        </div>
        <button className="text-link" onClick={() => onNavigate("/discover")}>
          Browse all <ArrowRight size={15} />
        </button>
      </div>
      <div className="category-grid">
        <Category
          icon={GraduationCap}
          title="I'm a student"
          text="Scholarships, fee support and education grants"
          tone="mint"
          onClick={() => {
            setProfile((p) => ({ ...p, profession: "Student" }));
            onNavigate("/discover");
          }}
        />
        <Category
          icon={Leaf}
          title="I'm a farmer"
          text="Agriculture support, subsidies and resources"
          tone="green"
          onClick={() => {
            setProfile((p) => ({ ...p, profession: "Farmer" }));
            onNavigate("/discover");
          }}
        />
        <Category
          icon={HandCoins}
          title="I run a business"
          text="Entrepreneurship, MSME and business support"
          tone="peach"
          onClick={() => {
            setProfile((p) => ({ ...p, profession: "Entrepreneur" }));
            onNavigate("/discover");
          }}
        />
        <Category
          icon={Users}
          title="I'm looking for work"
          text="Training, employment and skill programmes"
          tone="lilac"
          onClick={() => {
            setProfile((p) => ({ ...p, profession: "Job seeker" }));
            onNavigate("/discover");
          }}
        />
      </div>
      <section className="bottom-cta">
        <div className="cta-icon">
          <HeartHandshake size={25} />
        </div>
        <div>
          <h3>Better matches start with your profile.</h3>
          <p>
            Share only the details needed to assess eligibility. You can update
            them whenever your situation changes.
          </p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate("/profile")}>
          Set up profile <ArrowRight size={15} />
        </button>
      </section>
      <div className="notice-line">
        <ShieldCheck size={16} />
        <span>
          JanSahayak helps you discover opportunities. Eligibility estimates are
          not government approvals. Always verify scheme details and application
          status on the official portal.
        </span>
      </div>
    </>
  );
}
function Metric({ icon: Icon, label, value, foot, color }) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${color}`}>
        <Icon size={18} />
      </div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-foot">{foot}</div>
    </div>
  );
}
function Category({ icon: Icon, title, text, tone, onClick }) {
  return (
    <button className="category-card" onClick={onClick}>
      <div className={`category-icon ${tone}`}>
        <Icon size={21} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <ArrowRight size={17} className="category-arrow" />
    </button>
  );
}
function profileCompleteness(p) {
  const keys = ["profession", "state", "age_group", "income", "education"];
  return Math.round(
    (keys.filter((k) => String(p[k] || "").trim()).length / keys.length) * 100,
  );
}
function Discover({
  schemes,
  matches,
  bookmarks,
  onBookmark,
  query,
  setQuery,
}) {
  const [type, setType] = useState("All types");
  const [scope, setScope] = useState("All India");
  const [view, setView] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [selected, setSelected] = useState(null);
  const visible = useMemo(
    () =>
      schemes.filter(
        (s) =>
          (!query ||
            `${s.title} ${s.summary} ${s.type} ${s.department}`
              .toLowerCase()
              .includes(query.toLowerCase())) &&
          (type === "All types" || s.type === type) &&
          (scope === "All India" ||
            s.state === scope ||
            s.state === "All India") &&
          (view !== "saved" || bookmarks.includes(s.id)),
      ),
    [schemes, query, type, scope, view, bookmarks],
  );
  const sortedSchemes = useMemo(() => {
    if (sortBy === "title") {
      return [...visible].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "deadline") {
      return [...visible].sort((a, b) => {
        const deadlineA = a.deadline ? Date.parse(a.deadline) : Infinity;
        const deadlineB = b.deadline ? Date.parse(b.deadline) : Infinity;
        return (Number.isNaN(deadlineA) ? Infinity : deadlineA) -
          (Number.isNaN(deadlineB) ? Infinity : deadlineB);
      });
    }
    return visible;
  }, [visible, sortBy]);
  return (
    <>
      <PageHeading
        eyebrow="SCHEME EXPLORER"
        title="Find what you may qualify for."
        description="Search government opportunities and review the evidence before applying."
        action={
          <div className="result-count">
            <span>{visible.length}</span> records
          </div>
        }
      />
      <div className="search-panel">
        <div className="search-box">
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try scholarship, farmer support, business grant…"
            aria-label="Search schemes"
          />
          <kbd>⌘ / Ctrl K</kbd>
        </div>
        <div className="filter-row">
          <div className="filter-label">
            <Filter size={15} /> Filter by
          </div>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            aria-label="Scheme type"
          >
            <option>All types</option>
            {[
              "Scholarship",
              "Subsidy",
              "Grant",
              "Pension",
              "Training",
              "Insurance",
              "Other",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            aria-label="State"
          >
            <option>All India</option>
            {[
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
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <div className="filter-spacer" />
          <button
            className={`filter-chip ${view === "saved" ? "filter-chip-active" : ""}`}
            onClick={() => setView((v) => (v === "saved" ? "all" : "saved"))}
          >
            <Bookmark size={14} /> Saved only
          </button>
        </div>
      </div>
      <div className="results-intro">
        <div>
          <h2>
            Opportunities <span>{visible.length}</span>
          </h2>
          <p>
            Unverified demo records are clearly labelled. They are not
            recommendations to apply.
          </p>
        </div>
        <label className="sort-label">
          <Settings2 size={14} />
          <span className="visually-hidden">Sort schemes</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            aria-label="Sort schemes"
          >
            <option value="featured">Featured order</option>
            <option value="title">Title A to Z</option>
            <option value="deadline">Deadline soonest</option>
          </select>
        </label>
      </div>
      {sortedSchemes.length ? (
        <div className="scheme-grid">
          {sortedSchemes.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              match={matches?.[s.id]}
              saved={bookmarks.includes(s.id)}
              onBookmark={onBookmark}
              onOpen={() => setSelected(s)}
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={Search}
          title="No matching records"
          text="Try a different search or clear one of the filters."
          action={
            <button
              className="btn-secondary"
              onClick={() => {
                setQuery("");
                setType("All types");
                setScope("All India");
                setView("all");
              }}
            >
              Clear filters
            </button>
          }
        />
      )}
      {selected && (
        <SchemeDialog
          scheme={selected}
          saved={bookmarks.includes(selected.id)}
          onBookmark={onBookmark}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
function SchemeCard({ scheme: s, match, saved, onBookmark, onOpen }) {
  return (
    <article className="scheme-card">
      <div className="scheme-card-top">
        <div
          className={`scheme-art ${s.type === "Scholarship" ? "art-lilac" : s.type === "Subsidy" ? "art-green" : "art-peach"}`}
        >
          {s.type === "Scholarship" ? (
            <GraduationCap size={24} />
          ) : s.type === "Subsidy" ? (
            <Leaf size={24} />
          ) : (
            <HandCoins size={24} />
          )}
        </div>
        <button
          className={`save-btn ${saved ? "is-saved" : ""}`}
          onClick={() => onBookmark(s.id)}
          aria-label={saved ? "Remove bookmark" : "Save scheme"}
        >
          <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="scheme-meta">
        <span className="scheme-type">{s.type}</span>
        <span
          className={`status-pill ${s.status === "published" && !s.demo ? "status-verified" : "status-review"}`}
        >
          {s.status === "published" && !s.demo ? (
            <>
              <CheckCircle2 size={12} /> Verified
            </>
          ) : (
            <>
              <Clock3 size={12} /> Review pending
            </>
          )}
        </span>
        {match && (
          <span
            className={`status-pill ${match.result === "eligible" ? "match-eligible" : match.result === "not_eligible" ? "match-no" : "match-maybe"}`}
          >
            {match.result === "eligible"
              ? "Eligible"
              : match.result === "not_eligible"
                ? "Not eligible"
                : "Maybe"}
          </span>
        )}
      </div>
      <h3>{s.title}</h3>
      <p className="scheme-summary">{s.summary}</p>
      <div className="scheme-benefit">
        <span>BENEFIT</span>
        <strong>{s.benefits}</strong>
      </div>
      <div className="scheme-card-footer">
        <span>
          <Landmark size={13} />
          {s.level || "Government scheme"}
        </span>
        <button onClick={onOpen}>
          View details <ArrowRight size={14} />
        </button>
      </div>
      {s.demo && (
        <div className="demo-warning">
          Example record · Not verified for applications
        </div>
      )}
    </article>
  );
}
function SchemeDialog({ scheme: s, saved, onBookmark, onClose }) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="scheme-dialog">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="eyebrow">SCHEME DETAILS</div>
        <h2>{s.title}</h2>
        <p>{s.summary}</p>
        <div className="dialog-warning">
          <ShieldCheck size={18} />
          <div>
            <strong>
              {s.status === "published" && !s.demo
                ? "Admin reviewed record"
                : "Verification required"}
            </strong>
            <span>
              {s.demo
                ? "This is demonstration content. Do not rely on it as a real scheme listing."
                : "Check the source and current application status before applying."}
            </span>
          </div>
        </div>
        <div className="detail-grid">
          <div>
            <span>Application status</span>
            <strong>
              {s.applicationStatus || "Unknown — check official site"}
            </strong>
          </div>
          <div>
            <span>Deadline</span>
            <strong>{s.deadline || "Not confirmed"}</strong>
          </div>
          <div>
            <span>Government level</span>
            <strong>{s.level || "Not specified"}</strong>
          </div>
          <div>
            <span>Department</span>
            <strong>{s.department || "Not specified"}</strong>
          </div>
        </div>
        <h3>Documents to check</h3>
        <ul className="document-list">
          {(s.documents || []).map((d) => (
            <li key={d}>
              <FileCheck2 size={16} />
              {d}
            </li>
          ))}
        </ul>
        <div className="dialog-actions">
          <button className="btn-secondary" onClick={() => onBookmark(s.id)}>
            <Bookmark size={15} />
            {saved ? "Saved" : "Save scheme"}
          </button>
          <a
            className="btn-primary"
            href={s.officialUrl || "https://www.myscheme.gov.in/"}
            target="_blank"
            rel="noreferrer"
          >
            Check official site <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}
function Saved({ schemes, matches, onBookmark, onDiscover }) {
  return (
    <>
      <PageHeading
        eyebrow="YOUR SHORTLIST"
        title="Saved schemes"
        description="Keep useful opportunities in one place and revisit them when you're ready."
      />
      {schemes.length ? (
        <div className="scheme-grid">
          {schemes.map((s) => (
            <SchemeCard
              key={s.id}
              scheme={s}
              match={matches?.[s.id]}
              saved
              onBookmark={onBookmark}
              onOpen={() =>
                window.open(
                  s.officialUrl || "https://www.myscheme.gov.in/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            />
          ))}
        </div>
      ) : (
        <Empty
          icon={Bookmark}
          title="Nothing saved yet"
          text="Bookmark a scheme to build your personal shortlist."
          action={
            <button className="btn-primary" onClick={onDiscover}>
              Explore schemes <ArrowRight size={15} />
            </button>
          }
        />
      )}
    </>
  );
}
function Assistant({ messages, onAsk, language, onLanguage, onReset }) {
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const formSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || busy) return;
    const t = text;
    setText("");
    setBusy(true);
    await onAsk(t);
    setBusy(false);
  };
  return (
    <>
      <PageHeading
        eyebrow="JANSAHAYAK ASSISTANT"
        title="A little clarity goes a long way."
        description="Ask questions about scheme eligibility, documents or where to apply. Answers depend on available verified records."
        action={
          <div className="ai-status">
            <span /> Evidence-first assistant
          </div>
        }
      />
      <div className="chat-layout">
        <aside className="chat-aside">
          <div className="assistant-avatar">
            <Sparkles size={24} />
          </div>
          <h3>Your scheme guide</h3>
          <p>
            I help explain scheme information in plain language. I can't
            guarantee eligibility or government approval.
          </p>
          <label>Reply language</label>
          <select value={language} onChange={(e) => onLanguage(e.target.value)}>
            {languages.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <div className="chat-aside-note">
            <ShieldCheck size={16} />
            <span>
              Don't share Aadhaar numbers, OTPs, bank details or other secrets
              in chat.
            </span>
          </div>
        </aside>
        <section className="chat-panel">
          <div className="chat-topline">
            <div className="online-indicator" />
            <strong>JanSahayak AI</strong>
            <span>· Scheme information assistant</span>
            <button
              className="icon-btn"
              onClick={onReset}
              aria-label="Reset chat"
              title="Reset chat"
            >
              <X size={16} />
            </button>
          </div>
          <div className="chat-messages" role="log" aria-live="polite">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`chat-message ${m.role === "user" ? "message-user" : "message-assistant"}`}
              >
                <div className="message-avatar">
                  {m.role === "user" ? (
                    <UserRound size={15} />
                  ) : (
                    <Sparkles size={15} />
                  )}
                </div>
                <div className="message-content">
                  <div>{m.content}</div>
                  {m.sources?.length > 0 && (
                    <div className="source-list">
                      <strong>Sources</strong>
                      {m.sources.map((s, j) => (
                        <a
                          key={j}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {s.title || s.url}
                          <ArrowRight size={12} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && (
              <div className="typing-indicator">
                <span />
                <span />
                <span /> Checking scheme sources…
              </div>
            )}
          </div>
          <div className="prompt-suggestions">
            <span>Try asking</span>
            {[
              "What documents should I prepare?",
              "How do I check scholarship eligibility?",
              "Where can I verify a scheme?",
            ].map((s) => (
              <button key={s} onClick={() => setText(s)}>
                {s}
              </button>
            ))}
          </div>
          <form className="chat-composer" onSubmit={formSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask about schemes or eligibility…"
              rows={2}
              maxLength={1200}
            />
            <div className="composer-bottom">
              <span>
                AI can make mistakes. Confirm details on the official site.
              </span>
              <button className="btn-primary" disabled={!text.trim() || busy}>
                <span>Send</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}
function Profile({
  profile,
  setProfile,
  onAuth,
  user,
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
  const update = (k, v) => setProfile((p) => ({ ...p, [k]: v }));
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
            {fields.map(([key, label, opts]) => (
              <label key={key} className="field-label">
                {label}
                {key === "category" || key === "disability" ? (
                  <span className="optional-label">Optional</span>
                ) : null}
                <select
                  value={profile[key] || ""}
                  onChange={(e) => update(key, e.target.value)}
                >
                  {!profile[key] && (
                    <option value="">Choose {label.toLowerCase()}</option>
                  )}
                  {opts.map((o) => (
                    <option key={o}>{o}</option>
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
                onChange={(e) => update("income", e.target.value)}
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
                onChange={(e) => update("district", e.target.value)}
                placeholder="Enter district"
                maxLength={100}
              />
            </label>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={onSave}>
              Save profile <Check size={15} />
            </button>
            <span>
              {user
                ? "Profile changes are saved to your account."
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
            {user ? "Signed in with phone" : "Sign in with phone OTP"}
          </button>
          <button className="delete-link" onClick={onDelete}>
            {user ? "Delete my data and account" : "Clear session data"}
          </button>
        </aside>
      </div>
    </>
  );
}
function AdminAccessPanel({ signedIn, onLogin }) {
  return (
    <>
      <PageHeading
        eyebrow="RESTRICTED WORKSPACE"
        title="Administrator access only."
        description="Scheme review and publication tools are available only to accounts with an active server-assigned administrator role."
      />
      <section className="admin-access-panel">
        <div className="auth-mark">
          <LockKeyhole size={22} />
        </div>
        <h2>
          {signedIn
            ? "Your current account is not verified for admin access."
            : "Sign in with an administrator account."}
        </h2>
        <p>
          {signedIn
            ? "Use an account provisioned as a reviewer, publisher, or super administrator."
            : "Administrator access is checked by the JanSahayak API after sign-in."}
        </p>
        <button className="btn-primary" onClick={onLogin}>
          <LockKeyhole size={15} /> Admin sign in
        </button>
      </section>
    </>
  );
}
function Admin({
  onRun,
  onDecide,
  onCreate,
  onPublish,
  adminRole,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [tab, setTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState({
    pending_review: [],
    approved_for_editor: [],
    rejected: [],
  });
  const [adminSchemes, setAdminSchemes] = useState({ draft: [], published: [] });
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [publishingId, setPublishingId] = useState(null);

  const fetchAdminData = useCallback(async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    if (!token) throw new Error("Administrator session expired. Sign in again.");
    const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
    const headers = { Authorization: `Bearer ${token}` };
    const paths = [
      "candidates?status=pending_review",
      "candidates?status=approved_for_editor",
      "candidates?status=rejected",
    ];
    const canManageSchemes =
      adminRole === "publisher" || adminRole === "super_admin";
    if (canManageSchemes) {
      paths.push("schemes?status=draft", "schemes?status=published");
    }
    const responses = await Promise.all(
      paths.map((path) => fetch(`${base}/api/v1/admin/${path}`, { headers })),
    );
    const failed = responses.find((response) => !response.ok);
    if (failed) throw new Error("Could not load the administrator review queues.");
    const payloads = await Promise.all(responses.map((response) => response.json()));
    const mapCandidate = (candidate) => {
      const data = candidate.candidate_data || {};
      return {
        id: candidate.id,
        title: candidate.title,
        department: data.source_domain || "Discovered source",
        type: "Research candidate",
        status: candidate.review_status,
        officialUrl: candidate.source_url,
        summary: data.snippet || "No search summary was provided.",
        evidence: data.content_excerpt || "Full source excerpt unavailable.",
        discoveryQuery: candidate.discovery_query || data.discovery_query || "",
        discoveredAt: candidate.discovered_at,
        demo: false,
        rawCandidate: true,
      };
    };
    const mapScheme = (scheme) => ({
      ...scheme,
      id: scheme.id,
      type: scheme.scheme_type || "Other",
      level: scheme.government_level || "Central",
      status: scheme.verification_status,
      officialUrl: scheme.official_source_url,
      documents: (scheme.scheme_documents || []).map((document) => document.document_name),
      demo: false,
      rawScheme: true,
    });
    return {
      candidates: {
        pending_review: (payloads[0].items || []).map(mapCandidate),
        approved_for_editor: (payloads[1].items || []).map(mapCandidate),
        rejected: (payloads[2].items || []).map(mapCandidate),
      },
      schemes: {
        draft: canManageSchemes ? (payloads[3].items || []).map(mapScheme) : [],
        published: canManageSchemes
          ? (payloads[4].items || []).map(mapScheme)
          : [],
      },
    };
  }, [adminRole]);
  useEffect(() => {
    let active = true;
    fetchAdminData()
      .then((data) => {
        if (active) {
          setCandidates(data.candidates);
          setAdminSchemes(data.schemes);
        }
      })
      .catch((error) => {
        if (active) setLoadError(error.message);
      })
      .finally(() => {
        if (active) setLoadingCandidates(false);
      });
    return () => {
      active = false;
    };
  }, [fetchAdminData]);
  const reloadAdminData = async () => {
    setLoadingCandidates(true);
    setLoadError("");
    try {
      const data = await fetchAdminData();
      setCandidates(data.candidates);
      setAdminSchemes(data.schemes);
      return true;
    } catch (error) {
      setLoadError(error.message);
      return false;
    } finally {
      setLoadingCandidates(false);
    }
  };
  const handleDiscovery = async () => {
    const query = searchQuery.trim();
    if (query && query.length < 3) return;
    setLoadingCandidates(true);
    const result = await onRun(query || undefined);
    if (result) await reloadAdminData();
    else setLoadingCandidates(false);
  };
  const handleDefaultDiscovery = async () => {
    setLoadingCandidates(true);
    const result = await onRun();
    if (result) await reloadAdminData();
    else setLoadingCandidates(false);
  };
  const handleDecision = async (candidateId, action) => {
    if (await onDecide(candidateId, action)) await reloadAdminData();
  };
  const handleCreate = async (payload) => {
    const scheme = await onCreate(payload);
    if (!scheme) return false;
    await reloadAdminData();
    return scheme;
  };
  const handlePublish = async (schemeId, reason) => {
    if (!(await onPublish(schemeId, reason))) return false;
    setPublishingId(null);
    await reloadAdminData();
    return true;
  };
  const reviewRows =
    tab === "pending"
      ? candidates.pending_review
      : tab === "editor"
        ? candidates.approved_for_editor
        : tab === "rejected"
          ? candidates.rejected
          : tab === "drafts"
            ? adminSchemes.draft
            : adminSchemes.published;
  const canPublish = adminRole === "publisher" || adminRole === "super_admin";
  return (
    <>
      <PageHeading
        eyebrow="ADMIN WORKSPACE"
        title="Review before it reaches people."
        description={`Signed in as ${adminRole.replaceAll("_", " ")}. Research results stay unpublished until a publisher verifies the official source.`}
        action={
          <div className="admin-heading-actions">
            <button
              className="btn-secondary"
              onClick={() => {
                setSelectedCandidate(null);
                setShowCreate((value) => !value);
              }}
              disabled={!canPublish}
            >
              <FileCheck2 size={15} /> Add scheme draft
            </button>
            <button
              className="btn-secondary"
              onClick={handleDefaultDiscovery}
              disabled={loadingCandidates}
            >
              <Search size={15} />
              {loadingCandidates ? "Searching…" : "Search configured topics"}
            </button>
          </div>
        }
      />
      <form
        className="research-search"
        onSubmit={(event) => {
          event.preventDefault();
          handleDiscovery();
        }}
      >
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search the web for a scheme, benefit, group, or region"
          aria-label="Web research query"
          minLength={3}
          maxLength={300}
          disabled={loadingCandidates}
        />
        <button
          className="btn-primary"
          disabled={loadingCandidates || searchQuery.trim().length < 3}
        >
          {loadingCandidates ? "Searching…" : "Research web"}
        </button>
      </form>
      {loadError && (
        <div className="admin-load-error" role="alert">
          <span>{loadError}</span>
          <button className="btn-secondary" onClick={reloadAdminData}>
            Retry
          </button>
        </div>
      )}
      {showCreate && (
        <NewSchemeForm
          key={selectedCandidate?.id || "new-scheme"}
          initial={
            selectedCandidate
              ? {
                  title: selectedCandidate.title,
                  summary: selectedCandidate.summary,
                  official_source_url: selectedCandidate.officialUrl,
                  department: selectedCandidate.department,
                }
              : null
          }
          onCreate={handleCreate}
          onCancel={() => {
            setShowCreate(false);
            setSelectedCandidate(null);
          }}
        />
      )}
      <div className="admin-notice">
        <ShieldCheck size={20} />
        <div>
          <strong>Manual approval is mandatory</strong>
          <p>
            Discovery and AI extraction create candidates only. Never publish a
            record solely because a crawler or language model found it.
          </p>
        </div>
      </div>
      <div className="admin-metrics">
        <Metric
          icon={Search}
          label="Candidates"
          value={String(candidates.pending_review.length).padStart(2, "0")}
          foot="Awaiting review"
          color="lilac"
        />
        <Metric
          icon={CheckCircle2}
          label="Published"
          value={String(
            adminSchemes.published.length,
          ).padStart(2, "0")}
          foot="Approved records"
          color="mint"
        />
        <Metric
          icon={Clock3}
          label="Re-verification"
          value={String(adminSchemes.draft.length).padStart(2, "0")}
          foot="Drafts awaiting verification"
          color="peach"
        />
      </div>
      <div className="admin-table-panel">
        <div className="table-header">
          <div>
            <h2>Scheme review queue</h2>
            <p>Inspect the official source and confirm all critical fields.</p>
          </div>
          <div className="table-tabs">
            {[
              ["pending", "Research queue"],
              ["editor", "Ready to edit"],
              ["drafts", "Drafts"],
              ["published", "Published"],
              ["rejected", "Rejected"],
            ].map(([value, label]) => (
              <button
                key={value}
                className={tab === value ? "selected" : ""}
                onClick={() => setTab(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {loadingCandidates ? (
          <div className="review-loading" role="status">
            Loading review candidates…
          </div>
        ) : reviewRows.length ? (
          <div className="review-list">
            {reviewRows.map((s) => (
              <article className="review-item" key={s.id}>
                <div className="review-type-icon">
                  <Landmark size={19} />
                </div>
                <div className="review-item-main">
                  <div className="review-item-title">
                    <h3>{s.title}</h3>
                    <span
                      className={`status-pill ${s.status === "published" && !s.demo ? "status-verified" : "status-review"}`}
                    >
                      {s.status.replaceAll("_", " ")}
                    </span>
                  </div>
                  <p>
                    {s.department || "Department not confirmed"} · {s.type}
                  </p>
                  <div className="review-url">
                    <Globe2 size={13} />
                    <a
                      href={s.officialUrl || "https://www.myscheme.gov.in/"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {s.officialUrl || "Official source not supplied"}
                    </a>
                  </div>
                  {s.discoveryQuery && (
                    <small className="research-query-label">
                      Found for: {s.discoveryQuery}
                    </small>
                  )}
                  {s.evidence && (
                    <details className="research-evidence">
                      <summary>Read search evidence</summary>
                      <p>{s.evidence}</p>
                    </details>
                  )}
                  {s.deadline && <small>Deadline: {s.deadline}</small>}
                  {s.benefits && <p>Benefit: {s.benefits}</p>}
                </div>
                <div className="review-actions">
                  {s.officialUrl && (
                    <a
                      className="review-source-action"
                      href={s.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open source <ArrowRight size={14} />
                    </a>
                  )}
                  {tab === "pending" && s.rawCandidate && (
                    <>
                      <button
                        className="review-reject"
                        onClick={() => handleDecision(s.id, "reject")}
                      >
                        Reject
                      </button>
                      {canPublish && (
                        <button
                          className="review-approve"
                          onClick={() => handleDecision(s.id, "approve")}
                        >
                          <Check size={14} /> Approve for editing
                        </button>
                      )}
                    </>
                  )}
                  {tab === "pending" && s.demo && (
                    <button
                      className="review-reject"
                      onClick={() => handleDecision(s.id, "reject")}
                    >
                      Dismiss example
                    </button>
                  )}
                  {tab === "editor" && canPublish && (
                    <button
                      className="review-approve"
                      onClick={() => {
                        setSelectedCandidate(s);
                        setShowCreate(true);
                      }}
                    >
                      <FileCheck2 size={14} /> Create scheme draft
                    </button>
                  )}
                  {tab === "drafts" && canPublish && (
                    <button
                      className="review-approve"
                      onClick={() => setPublishingId(s.id)}
                    >
                      <Check size={14} /> Review and publish
                    </button>
                  )}
                </div>
                {publishingId === s.id && tab === "drafts" && (
                  <PublishConfirmation
                    onCancel={() => setPublishingId(null)}
                    onSubmit={(reason) => handlePublish(s.id, reason)}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <Empty
            icon={ShieldCheck}
            title="Review queue is clear"
            text={
              loadError
                ? "The authenticated research queues could not be loaded. Check the service and retry."
                : tab === "pending"
                  ? "Search the web above to find new scheme candidates."
                  : "No records are currently in this workflow stage."
            }
          />
        )}
      </div>
      <div className="admin-footnote">
        <CircleHelp size={16} />
        <span>
          Approval endpoints require a server-validated admin role. Hiding this
          page from navigation is not an access-control mechanism.
        </span>
      </div>
    </>
  );
}
function PublishConfirmation({ onCancel, onSubmit }) {
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    if (reason.trim().length < 10 || !confirmed || busy) return;
    setBusy(true);
    await onSubmit(reason.trim());
    setBusy(false);
  };
  return (
    <form className="publish-confirmation" onSubmit={submit}>
      <label className="field-label">
        Verification notes
        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          minLength={10}
          maxLength={1000}
          required
          rows={2}
          placeholder="Record what you verified on the official source."
        />
      </label>
      <label className="source-confirm">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
        />
        <span>I verified this draft against its official source.</span>
      </label>
      <div className="scheme-create-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="btn-primary"
          disabled={busy || !confirmed || reason.trim().length < 10}
        >
          {busy ? "Publishing…" : "Publish verified scheme"}
        </button>
      </div>
    </form>
  );
}
function NewSchemeForm({ initial, onCreate, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: initial?.title || "",
    summary: initial?.summary || "",
    official_source_url: initial?.official_source_url || "",
    application_url: "",
    scheme_type: "Scholarship",
    government_level: "Central",
    department: initial?.department || "",
    state_code: "",
    benefits: "",
    deadline: "",
    field_key: "",
    operator: "eq",
    expected_value: "",
    document_name: "",
  }));
  const [confirmed, setConfirmed] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const submit = async (e) => {
    e.preventDefault();
    if (!confirmed) {
      setError(
        "Confirm that you reviewed the official source used for this draft.",
      );
      return;
    }
    setBusy(true);
    setError("");
    const payload = {
      title: form.title,
      summary: form.summary,
      description: form.summary,
      official_source_url: form.official_source_url,
      application_url: form.application_url || null,
      scheme_type: form.scheme_type,
      government_level: form.government_level,
      department: form.department || null,
      state_code: form.state_code || null,
      benefits: form.benefits || null,
      deadline: form.deadline || null,
      eligibility_rules:
        form.field_key && form.expected_value
          ? [
              {
                field_key: form.field_key,
                operator: form.operator,
                expected_value: form.expected_value,
                is_mandatory: true,
                missing_data_behavior: "maybe",
              },
            ]
          : [],
      documents: form.document_name
        ? [
            {
              document_name: form.document_name,
              is_mandatory: false,
              notes: "Confirm current requirements on the official source.",
            },
          ]
        : [],
    };
    const ok = await onCreate(payload);
    setBusy(false);
    if (ok) onCancel();
    else
      setError(
        "Could not create this scheme draft. Check admin permissions, API configuration and required fields.",
      );
  };
  return (
    <form className="scheme-create-panel" onSubmit={submit}>
      <div className="scheme-create-heading">
        <div>
          <h2>{initial ? "Create a draft from research" : "Add a scheme draft"}</h2>
          <p>
            Verify the official source and scheme details. Saving creates an
            unpublished draft for separate review.
          </p>
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onCancel}
          aria-label="Close form"
        >
          <X size={17} />
        </button>
      </div>
      <div className="scheme-create-grid">
        <label className="field-label">
          Scheme title *
          <input
            required
            minLength={3}
            maxLength={240}
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="Official scheme name"
          />
        </label>
        <label className="field-label">
          Scheme type
          <select
            value={form.scheme_type}
            onChange={(e) => set("scheme_type", e.target.value)}
          >
            {[
              "Scholarship",
              "Subsidy",
              "Grant",
              "Pension",
              "Training",
              "Insurance",
              "Other",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="field-label wide-field">
          Short description *
          <textarea
            required
            minLength={10}
            maxLength={5000}
            value={form.summary}
            onChange={(e) => set("summary", e.target.value)}
            placeholder="Describe the scheme based on its official source."
            rows={3}
          />
        </label>
        <label className="field-label">
          Official source URL *
          <input
            required
            type="url"
            pattern="https://.*"
            value={form.official_source_url}
            onChange={(e) => set("official_source_url", e.target.value)}
            placeholder="https://official.gov.in/..."
          />
        </label>
        <label className="field-label">
          Application URL
          <input
            type="url"
            value={form.application_url}
            onChange={(e) => set("application_url", e.target.value)}
            placeholder="https://portal.gov.in/..."
          />
        </label>
        <label className="field-label">
          Government level
          <select
            value={form.government_level}
            onChange={(e) => set("government_level", e.target.value)}
          >
            {["Central", "State", "District", "Other"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="field-label">
          State code / name
          <input
            value={form.state_code}
            onChange={(e) => set("state_code", e.target.value)}
            placeholder="Leave blank for all India"
          />
        </label>
        <label className="field-label">
          Department
          <input
            value={form.department}
            onChange={(e) => set("department", e.target.value)}
            placeholder="Responsible department"
          />
        </label>
        <label className="field-label">
          Benefit summary
          <input
            value={form.benefits}
            onChange={(e) => set("benefits", e.target.value)}
            placeholder="Benefit as stated by official source"
          />
        </label>
        <label className="field-label">
          Deadline
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => set("deadline", e.target.value)}
          />
        </label>
        <div className="wide-field rule-editor">
          <strong>Optional eligibility rule</strong>
          <div className="scheme-create-grid">
            <label className="field-label">
              Profile field
              <input
                value={form.field_key}
                onChange={(e) => set("field_key", e.target.value)}
                placeholder="e.g. state_code"
              />
            </label>
            <label className="field-label">
              Operator
              <select
                value={form.operator}
                onChange={(e) => set("operator", e.target.value)}
              >
                {[
                  "eq",
                  "neq",
                  "in",
                  "not_in",
                  "gte",
                  "gt",
                  "lte",
                  "lt",
                  "contains",
                ].map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </label>
            <label className="field-label wide-field">
              Expected value
              <input
                value={form.expected_value}
                onChange={(e) => set("expected_value", e.target.value)}
                placeholder="Use a field value matching the profile schema"
              />
            </label>
          </div>
          <small>
            Rules use profile field keys such as profession, state_code,
            education_level, annual_income_band or age when available. Test each
            rule before relying on eligibility results.
          </small>
        </div>
        <label className="field-label wide-field">
          Document checklist item (optional)
          <input
            value={form.document_name}
            onChange={(e) => set("document_name", e.target.value)}
            placeholder="Document name to confirm from the official source"
          />
        </label>
      </div>
      <label className="source-confirm">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
        />
        <span>
          I reviewed the official source for this draft. It will remain
          unpublished until a publisher completes the separate verification.
        </span>
      </label>
      {error && <div className="form-error">{error}</div>}
      <div className="scheme-create-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save and publish"} <Check size={15} />
        </button>
      </div>
    </form>
  );
}
function Empty({ icon: Icon, title, text, action }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon size={25} />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
function AuthDialog({ onClose, onSend, onVerify }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (!sent) {
        await onSend(phone);
        setSent(true);
      } else {
        await onVerify(phone, otp);
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to continue. Check your phone number and configuration.",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="auth-dialog">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="auth-mark">
          <Landmark size={24} />
        </div>
        <div className="eyebrow">WELCOME TO JANSAHAYAK</div>
        <h2>{sent ? "Enter your OTP" : "Sign in with your phone"}</h2>
        <p>
          {sent
            ? "Enter the verification code sent to your phone."
            : "Use your phone number to save your profile and bookmarks across sessions."}
        </p>
        <form onSubmit={submit}>
          <label className="field-label">
            Phone number
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              type="tel"
              required
              minLength={8}
              maxLength={20}
              disabled={sent}
            />
          </label>
          {sent && (
            <label className="field-label">
              One-time password
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                inputMode="numeric"
                required
                minLength={4}
                maxLength={8}
              />
            </label>
          )}
          {error && <div className="form-error">{error}</div>}
          <button className="btn-primary full-width" disabled={busy}>
            {busy ? "Please wait…" : sent ? "Verify & sign in" : "Send OTP"}{" "}
            <ArrowRight size={15} />
          </button>
        </form>
        <div className="auth-legal">
          By continuing, you agree to use this service responsibly. Never share
          your OTP with anyone.
        </div>
      </div>
    </div>
  );
}
function AdminLoginDialog({ onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await onSubmit(email.trim(), password);
    } catch (submitError) {
      setError(submitError.message || "Administrator sign-in failed.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="auth-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="auth-mark">
          <LockKeyhole size={22} />
        </div>
        <div className="eyebrow">ADMINISTRATOR SIGN IN</div>
        <h2 id="admin-login-title">Restricted access</h2>
        <p>
          Sign in with your provisioned administrator account. Access is
          verified by the server; a valid citizen account is not sufficient.
        </p>
        <form onSubmit={submit}>
          <label className="field-label">
            Administrator email
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="username"
              required
            />
          </label>
          <label className="field-label">
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          {error && <div className="form-error" role="alert">{error}</div>}
          <button className="btn-primary full-width" disabled={busy}>
            {busy ? "Verifying access…" : "Sign in and verify role"}
          </button>
        </form>
        <div className="auth-legal">
          Admin accounts must be created in Supabase and assigned a role in the
          server-controlled admin registry. Never share credentials.
        </div>
      </section>
    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
