import { useEffect } from "react";

const translations = {
  hi: {
    "JanSahayak — Government Benefits, Made Simpler":
      "JanSahayak — सरकारी लाभ, अब आसान",
    "Benefits, made simpler": "लाभ, अब आसान",
    WORKSPACE: "कार्यस्थल",
    Overview: "अवलोकन",
    "Find schemes": "योजनाएँ खोजें",
    "Saved schemes": "सहेजी गई योजनाएँ",
    "AI assistant": "एआई सहायक",
    "My profile": "मेरी प्रोफ़ाइल",
    "Admin workspace": "एडमिन कार्यस्थल",
    "Admin sign in": "एडमिन साइन इन",
    "Trust comes first": "विश्वास सबसे पहले",
    "Only reviewed records should be treated as verified. Always confirm details on the official portal.":
      "केवल जाँचे गए रिकॉर्ड को सत्यापित मानें। विवरण की पुष्टि हमेशा आधिकारिक पोर्टल पर करें।",
    "Official scheme directory": "आधिकारिक योजना निर्देशिका",
    "Your profile": "आपकी प्रोफ़ाइल",
    "Signed in": "साइन इन है",
    "Personalize your matches": "अपने सुझावों को व्यक्तिगत बनाएँ",
    "Open menu": "मेनू खोलें",
    "Close menu": "मेनू बंद करें",
    "Admin review": "एडमिन समीक्षा",
    Workspace: "कार्यस्थल",
    Language: "भाषा",
    Notifications: "सूचनाएँ",
    "You are all caught up. Notification delivery will be enabled as channels are configured.":
      "आपकी सभी सूचनाएँ देख ली गई हैं। चैनल कॉन्फ़िगर होने पर सूचनाएँ उपलब्ध होंगी।",
    "Sign out": "साइन आउट",
    "Sign in": "साइन इन",
    "Your data. Your choice.": "आपका डेटा। आपकी पसंद।",
    "Find support that fits your life.": "अपनी ज़रूरत के अनुसार सहायता पाएँ।",
    "Explore schemes and scholarships using your profile. Always confirm details with the official source.":
      "अपनी प्रोफ़ाइल के आधार पर योजनाएँ और छात्रवृत्तियाँ देखें। विवरण की पुष्टि हमेशा आधिकारिक स्रोत से करें।",
    "Explore schemes": "योजनाएँ देखें",
    Dismiss: "हटाएँ",
    "YOUR PERSONAL BENEFITS COMPANION": "आपकी व्यक्तिगत लाभ सहायक",
    "Good support should": "सही सहायता को",
    "find its way to you.": "आप तक पहुँचना चाहिए।",
    "Discover government schemes, scholarships and support opportunities based on who you are and what you need.":
      "आप कौन हैं और आपको क्या चाहिए, इसके आधार पर सरकारी योजनाएँ, छात्रवृत्तियाँ और सहायता के अवसर खोजें।",
    "Find my schemes": "मेरी योजनाएँ खोजें",
    "Complete my profile": "मेरी प्रोफ़ाइल पूरी करें",
    "Official-source review": "आधिकारिक स्रोत से समीक्षा",
    "Privacy-minded": "गोपनीयता का ध्यान",
    "Education support": "शिक्षा सहायता",
    "Scholarships & grants": "छात्रवृत्तियाँ और अनुदान",
    "For your profession": "आपके पेशे के लिए",
    "Matches tailored to you": "आपके लिए उपयुक्त सुझाव",
    "Verified schemes": "सत्यापित योजनाएँ",
    "Published records": "प्रकाशित रिकॉर्ड",
    "No verified records yet": "अभी कोई सत्यापित रिकॉर्ड नहीं",
    "Saved for later": "बाद के लिए सहेजा गया",
    "Your personal shortlist": "आपकी व्यक्तिगत सूची",
    "Profile complete": "प्रोफ़ाइल पूरी",
    "Improve your matches": "अपने सुझाव बेहतर बनाएँ",
    "Review standard": "समीक्षा मानक",
    "Manual approval required": "मैन्युअल स्वीकृति आवश्यक",
    "START HERE": "यहाँ से शुरू करें",
    "What brings you here?": "आप यहाँ किसलिए आए हैं?",
    "Choose a path to find the right opportunities.":
      "सही अवसर खोजने के लिए एक विकल्प चुनें।",
    "Browse all": "सभी देखें",
    "I'm a student": "मैं विद्यार्थी हूँ",
    "Scholarships, fee support and education grants":
      "छात्रवृत्तियाँ, शुल्क सहायता और शिक्षा अनुदान",
    "I'm a farmer": "मैं किसान हूँ",
    "Agriculture support, subsidies and resources":
      "कृषि सहायता, सब्सिडी और संसाधन",
    "I run a business": "मैं व्यवसाय चलाता/चलाती हूँ",
    "Entrepreneurship, MSME and business support":
      "उद्यमिता, एमएसएमई और व्यवसाय सहायता",
    "I'm looking for work": "मैं काम की तलाश में हूँ",
    "Training, employment and skill programmes":
      "प्रशिक्षण, रोज़गार और कौशल कार्यक्रम",
    "Set up profile": "प्रोफ़ाइल बनाएँ",
    "Better matches start with your profile.": "बेहतर सुझाव आपकी प्रोफ़ाइल से शुरू होते हैं।",
    "Share only the details needed to assess eligibility. You can update your profile at any time.":
      "पात्रता जाँचने के लिए केवल ज़रूरी जानकारी दें। आप अपनी प्रोफ़ाइल कभी भी अपडेट कर सकते हैं।",
    "SCHEME DETAILS": "योजना का विवरण",
    "Summary language": "सारांश की भाषा",
    "Read aloud": "ज़ोर से पढ़ें",
    "Stop reading": "पढ़ना रोकें",
    "Read summary aloud": "सारांश ज़ोर से पढ़ें",
    "Stop reading summary": "सारांश पढ़ना रोकें",
    Pause: "रोकें",
    Resume: "जारी रखें",
    Stop: "बंद करें",
    "Pause reading summary": "सारांश पढ़ना रोकें",
    "Resume reading summary": "सारांश पढ़ना जारी रखें",
    "A reviewed summary is not available in this language yet.":
      "इस भाषा में समीक्षित सारांश अभी उपलब्ध नहीं है।",
    "Admin reviewed record": "एडमिन द्वारा जाँचा गया रिकॉर्ड",
    "Verification required": "सत्यापन आवश्यक",
    "Check the source and current application status before applying.":
      "आवेदन से पहले स्रोत और मौजूदा आवेदन स्थिति जाँचें।",
    "Application status": "आवेदन की स्थिति",
    "Unknown — check official site": "अज्ञात — आधिकारिक वेबसाइट देखें",
    Deadline: "अंतिम तिथि",
    "Not confirmed": "पुष्टि नहीं हुई",
    "Government level": "सरकारी स्तर",
    Department: "विभाग",
    "Not specified": "निर्दिष्ट नहीं",
    "Documents to check": "जाँचने योग्य दस्तावेज़",
    Saved: "सहेजा गया",
    "Save scheme": "योजना सहेजें",
    "Open official source": "आधिकारिक स्रोत खोलें",
    BENEFIT: "लाभ",
    "Government scheme": "सरकारी योजना",
    Eligible: "पात्र",
    "Not eligible": "पात्र नहीं",
    Maybe: "संभवतः",
    "RESTRICTED WORKSPACE": "सीमित कार्यस्थल",
    "Administrator access only.": "केवल एडमिन के लिए पहुँच।",
    "Scheme review and publication tools are available only to accounts with an active server-assigned administrator role.":
      "योजना समीक्षा और प्रकाशन उपकरण केवल सक्रिय सर्वर-निर्धारित एडमिन भूमिका वाले खातों के लिए उपलब्ध हैं।",
    "Your current account is not verified for admin access.":
      "आपका मौजूदा खाता एडमिन पहुँच के लिए सत्यापित नहीं है।",
    "Sign in with an administrator account.": "एडमिन खाते से साइन इन करें।",
    "Use an account provisioned as a reviewer, publisher, or super administrator.":
      "समीक्षक, प्रकाशक या सुपर एडमिन के रूप में सेट किए गए खाते का उपयोग करें।",
    "Administrator access is checked by the JanSahayak API after sign-in.":
      "साइन इन के बाद JanSahayak API एडमिन पहुँच की जाँच करता है।",
    "Manual approval is mandatory": "मैन्युअल स्वीकृति अनिवार्य है",
    "Approving a candidate only moves it to Ready to edit; it will not appear on the citizen home page yet. Create a scheme draft, verify it, and publish it from Drafts to make it visible.":
      "किसी संभावित योजना को स्वीकृत करने से वह केवल संपादन के लिए तैयार होती है; वह अभी नागरिक होम पेज पर नहीं दिखेगी। दिखाने के लिए योजना का प्रारूप बनाएँ, सत्यापित करें और प्रारूप टैब से प्रकाशित करें।",
    "Only administrator-reviewed, published listings appear here.":
      "यहाँ केवल एडमिन द्वारा समीक्षा की गई और प्रकाशित योजनाएँ दिखती हैं।",
    "No published schemes yet": "अभी कोई योजना प्रकाशित नहीं हुई है",
    "Schemes appear here only after an administrator reviews and publishes them.":
      "एडमिन द्वारा समीक्षा और प्रकाशन के बाद ही योजनाएँ यहाँ दिखाई देती हैं।",
    "Import myScheme catalog": "myScheme सूची आयात करें",
    "Importing catalog…": "सूची आयात हो रही है…",
    Previous: "पिछला",
    Next: "अगला",
    Showing: "दिखाए जा रहे",
    Page: "पृष्ठ",
    of: "में से",
    "Review queue pages": "समीक्षा सूची के पृष्ठ",
    Candidates: "संभावित रिकॉर्ड",
    "Awaiting review": "समीक्षा की प्रतीक्षा",
    Published: "प्रकाशित",
    "Approved records": "स्वीकृत रिकॉर्ड",
    "Re-verification": "पुनः सत्यापन",
    "Drafts awaiting verification": "सत्यापन की प्रतीक्षा में प्रारूप",
    "Scheme review queue": "योजना समीक्षा सूची",
    "Inspect the official source and confirm all critical fields.":
      "आधिकारिक स्रोत देखें और सभी महत्वपूर्ण फ़ील्ड की पुष्टि करें।",
    "Research queue": "शोध सूची",
    "Ready to edit": "संपादन के लिए तैयार",
    Drafts: "प्रारूप",
    Rejected: "अस्वीकृत",
    "Loading review candidates…": "समीक्षा के संभावित रिकॉर्ड लोड हो रहे हैं…",
    Retry: "फिर कोशिश करें",
    "Search the web above to find new scheme candidates.":
      "योजना के नए संभावित रिकॉर्ड खोजने के लिए ऊपर वेब पर खोजें।",
    "No records are currently in this workflow stage.":
      "इस कार्य चरण में अभी कोई रिकॉर्ड नहीं है।",
    "Approval endpoints require a server-validated admin role. Hiding this page from navigation is not an access-control mechanism.":
      "स्वीकृति एंडपॉइंट के लिए सर्वर-सत्यापित एडमिन भूमिका आवश्यक है। नेविगेशन से यह पृष्ठ छिपाना पहुँच-नियंत्रण का विकल्प नहीं है।",
    "Research web": "वेब पर शोध करें",
    "Search the web for a scheme, benefit, group, or region":
      "योजना, लाभ, समूह या क्षेत्र के लिए वेब पर खोजें",
    "Web research query": "वेब शोध क्वेरी",
    "Read search evidence": "खोज के प्रमाण पढ़ें",
    "Department not confirmed": "विभाग की पुष्टि नहीं हुई",
    "Official source not supplied": "आधिकारिक स्रोत नहीं दिया गया",
    "Found for:": "इसके लिए मिला:",
    "Create a draft from research": "शोध से प्रारूप बनाएँ",
    "Add a scheme draft": "योजना का प्रारूप जोड़ें",
    "Verify the official source and scheme details. Saving creates an unpublished draft for separate review.":
      "आधिकारिक स्रोत और योजना विवरण सत्यापित करें। सहेजने पर अलग समीक्षा के लिए अप्रकाशित प्रारूप बनेगा।",
    "Scheme title *": "योजना का शीर्षक *",
    "Official scheme name": "योजना का आधिकारिक नाम",
    "Scheme type": "योजना का प्रकार",
    "Short description *": "संक्षिप्त विवरण *",
    "Describe the scheme based on its official source.":
      "आधिकारिक स्रोत के आधार पर योजना का विवरण दें।",
    "Official source URL *": "आधिकारिक स्रोत URL *",
    "Application URL": "आवेदन URL",
    "State code / name": "राज्य कोड / नाम",
    "Leave blank for all India": "पूरे भारत के लिए खाली छोड़ें",
    "Responsible department": "ज़िम्मेदार विभाग",
    "Benefit summary": "लाभ का सारांश",
    "Benefit as stated by official source": "आधिकारिक स्रोत में बताया गया लाभ",
    "Optional eligibility rule": "वैकल्पिक पात्रता नियम",
    "Profile field": "प्रोफ़ाइल फ़ील्ड",
    Operator: "ऑपरेटर",
    "Expected value": "अपेक्षित मान",
    "Document checklist item (optional)": "दस्तावेज़ सूची आइटम (वैकल्पिक)",
    "Document name to confirm from the official source":
      "आधिकारिक स्रोत से पुष्टि करने योग्य दस्तावेज़ का नाम",
    "I reviewed the official source for this draft. It will remain unpublished until a publisher completes the separate verification.":
      "मैंने इस प्रारूप के आधिकारिक स्रोत की समीक्षा की है। प्रकाशक द्वारा अलग सत्यापन पूरा होने तक यह अप्रकाशित रहेगा।",
    "Saving…": "सहेजा जा रहा है…",
    "Save and publish": "सहेजें और प्रकाशित करें",
    "ADMINISTRATOR SIGN IN": "एडमिन साइन इन",
    "Sign in with your provisioned administrator account. Access is verified by the server; a valid citizen account is not sufficient.":
      "अपने निर्धारित एडमिन खाते से साइन इन करें। पहुँच सर्वर द्वारा सत्यापित होती है; नागरिक खाता पर्याप्त नहीं है।",
    "Admin accounts must be created in Supabase and assigned a role in the server-controlled admin registry. Never share credentials.":
      "एडमिन खाते Supabase में बनाए जाने चाहिए और सर्वर-नियंत्रित एडमिन रजिस्ट्री में भूमिका दी जानी चाहिए। लॉगिन जानकारी कभी साझा न करें।",
    "Close form": "फ़ॉर्म बंद करें",
    "Could not load review candidates.": "समीक्षा के संभावित रिकॉर्ड लोड नहीं हो सके।",
    "There are no approved records yet.": "अभी कोई स्वीकृत रिकॉर्ड नहीं है।",
    Other: "अन्य",
    Yes: "हाँ",
    No: "नहीं",
    "WELCOME TO JANSAHAYAK": "जनसहायक में आपका स्वागत है",
    "Choose your language": "अपनी भाषा चुनें",
    "Select the language you want to use across the website.":
      "पूरी वेबसाइट पर उपयोग करने के लिए अपनी भाषा चुनें।",
    "Choose website language": "वेबसाइट की भाषा चुनें",
    Continue: "जारी रखें",
    "Enter your OTP": "अपना ओटीपी दर्ज करें",
    "Sign in with your email": "अपने ईमेल से साइन इन करें",
    "Enter the verification code sent to your email.":
      "अपने ईमेल पर भेजा गया सत्यापन कोड दर्ज करें।",
    "Use your email address to save your profile and bookmarks across sessions.":
      "अलग-अलग सत्रों में अपनी प्रोफ़ाइल और सहेजी गई योजनाएँ रखने के लिए ईमेल पते का उपयोग करें।",
    "Email address": "ईमेल पता",
    "One-time password": "वन-टाइम पासवर्ड",
    "Enter OTP": "ओटीपी दर्ज करें",
    "Please wait…": "कृपया प्रतीक्षा करें…",
    "Verify & sign in": "सत्यापित करें और साइन इन करें",
    "Send OTP": "ओटीपी भेजें",
    "OTP sent. Check your email.": "ओटीपी भेज दिया गया है। अपना ईमेल देखें।",
    "By continuing, you agree to use this service responsibly. Never share your OTP with anyone.":
      "आगे बढ़कर आप इस सेवा का ज़िम्मेदारी से उपयोग करने के लिए सहमत हैं। अपना ओटीपी किसी के साथ साझा न करें।",
    "Unable to continue. Check your email address and configuration.":
      "आगे नहीं बढ़ सके। अपना ईमेल पता और कॉन्फ़िगरेशन जाँचें।",
    "Signed in with email": "ईमेल से साइन इन है",
    "Sign in with email OTP": "ईमेल ओटीपी से साइन इन करें",
    "Profile changes are saved to your signed-in email account.":
      "प्रोफ़ाइल में किए गए बदलाव आपके साइन-इन ईमेल खाते में सहेजे जाते हैं।",
    "Could not sign out. Please try again.": "साइन आउट नहीं हो सका। फिर कोशिश करें।",
    "You have been signed out.": "आप साइन आउट हो गए हैं।",
    "Session data cleared. No guest profile is stored on this device.":
      "सत्र का डेटा साफ़ कर दिया गया। इस डिवाइस पर अतिथि प्रोफ़ाइल सहेजी नहीं जाती।",
    "Profile saved for this session. Sign in to sync it securely across visits.":
      "प्रोफ़ाइल इस सत्र के लिए सहेजी गई। अलग-अलग विज़िट में सुरक्षित रूप से सिंक करने के लिए साइन इन करें।",
    "Could not load your profile. Please try again.":
      "आपकी प्रोफ़ाइल लोड नहीं हो सकी। फिर कोशिश करें।",
    "SCHEME EXPLORER": "योजना खोज",
    "Find what you may qualify for.": "जानें कि आप किन योजनाओं के पात्र हो सकते हैं।",
    "Search government opportunities and review the evidence before applying.":
      "सरकारी अवसर खोजें और आवेदन से पहले प्रमाण देखें।",
    records: "रिकॉर्ड",
    "Try scholarship, farmer support, business grant…":
      "छात्रवृत्ति, किसान सहायता या व्यवसाय अनुदान खोजें…",
    "Search schemes": "योजनाएँ खोजें",
    "Filter by": "फ़िल्टर करें",
    "All types": "सभी प्रकार",
    "All India": "पूरा भारत",
    "Saved only": "केवल सहेजी गई",
    Opportunities: "अवसर",
    "Sort schemes": "योजनाएँ क्रमबद्ध करें",
    "Featured order": "चुनिंदा क्रम",
    "Title A to Z": "शीर्षक अ से ज्ञ",
    "Deadline soonest": "सबसे नज़दीकी अंतिम तिथि",
    "No matching records": "कोई मेल खाता रिकॉर्ड नहीं",
    "Try a different search or clear one of the filters.":
      "दूसरी खोज करें या कोई फ़िल्टर हटाएँ।",
    "Clear filters": "फ़िल्टर हटाएँ",
    Scholarship: "छात्रवृत्ति",
    Subsidy: "सब्सिडी",
    Grant: "अनुदान",
    Pension: "पेंशन",
    Training: "प्रशिक्षण",
    Insurance: "बीमा",
    Central: "केंद्रीय",
    State: "राज्य",
    "Review pending": "समीक्षा लंबित",
    Verified: "सत्यापित",
    "View details": "विवरण देखें",
    "Check official site": "आधिकारिक वेबसाइट देखें",
    "Nothing saved yet": "अभी कुछ भी सहेजा नहीं गया",
    "Bookmark a scheme to build your personal shortlist.":
      "अपनी व्यक्तिगत सूची बनाने के लिए किसी योजना को सहेजें।",
    "A little clarity goes a long way.": "थोड़ी स्पष्टता बहुत मदद करती है।",
    "Hello! I can help you use JanSahayak to find and understand government schemes. I can guide you step by step: open Find schemes, choose a search or filter, review a scheme's eligibility and official source, then save it if useful. What kind of support are you looking for?":
      "नमस्ते! मैं JanSahayak पर सरकारी योजनाएँ खोजने और समझने में आपकी मदद कर सकता/सकती हूँ। मैं चरण-दर-चरण मार्गदर्शन कर सकता/सकती हूँ: योजनाएँ खोजें खोलें, खोज या फ़िल्टर चुनें, योजना की पात्रता और आधिकारिक स्रोत देखें, फिर उपयोगी लगे तो उसे सहेजें। आपको किस तरह की सहायता चाहिए?",
    "Get help using JanSahayak to find schemes, understand available records, and verify official sources.":
      "JanSahayak पर योजनाएँ खोजने, उपलब्ध रिकॉर्ड समझने और आधिकारिक स्रोत की पुष्टि करने में सहायता पाएँ।",
    "Evidence-first assistant": "प्रमाण-आधारित सहायक",
    "Your scheme guide": "आपकी योजना मार्गदर्शिका",
    "I can help with this website and its scheme-finding features. I can't guarantee eligibility or government approval.":
      "मैं इस वेबसाइट और इसकी योजना खोज सुविधाओं में मदद कर सकता/सकती हूँ। मैं पात्रता या सरकारी स्वीकृति की गारंटी नहीं दे सकता/सकती।",
    "Reply language": "जवाब की भाषा",
    "Find a scheme in a few steps": "कुछ चरणों में योजना खोजें",
    "Open Find schemes.": "योजनाएँ खोजें खोलें।",
    "Search or filter by type and location.": "प्रकार और स्थान के आधार पर खोजें या फ़िल्टर करें।",
    "Check eligibility and the official source.": "पात्रता और आधिकारिक स्रोत जाँचें।",
    "Save schemes you want to revisit.": "जिन योजनाओं को बाद में देखना हो, उन्हें सहेजें।",
    "Guide me one step at a time to find schemes.": "मुझे योजनाएँ खोजने के लिए एक-एक चरण में मार्गदर्शन दें।",
    "How do I filter schemes by location?": "मैं स्थान के आधार पर योजनाएँ कैसे फ़िल्टर करूँ?",
    "How do I save a scheme?": "मैं कोई योजना कैसे सहेजूँ?",
    "Ask how to use JanSahayak or find a scheme…":
      "JanSahayak इस्तेमाल करने या योजना खोजने के बारे में पूछें…",
    "Start voice input": "आवाज़ से लिखना शुरू करें",
    "Stop voice input": "आवाज़ से लिखना रोकें",
    "Voice input in English": "अंग्रेज़ी में आवाज़ से लिखें",
    "Voice input in हिन्दी": "हिंदी में आवाज़ से लिखें",
    "Voice input in ਪੰਜਾਬੀ": "पंजाबी में आवाज़ से लिखें",
    "Voice input isn't available in this browser. Try Chrome or Edge, or type your message.":
      "इस ब्राउज़र में आवाज़ से लिखना उपलब्ध नहीं है। Chrome या Edge आज़माएँ, या अपना संदेश टाइप करें।",
    "Voice recording isn't supported in this browser. Try a recent Chrome, Edge, or Safari, or type your message.":
      "इस ब्राउज़र में आवाज़ रिकॉर्ड करना समर्थित नहीं है। नया Chrome, Edge या Safari आज़माएँ, या अपना संदेश टाइप करें।",
    "Microphone access was denied. Allow microphone access in your browser settings and try again.":
      "माइक्रोफ़ोन की अनुमति नहीं मिली। ब्राउज़र सेटिंग में अनुमति दें और फिर कोशिश करें।",
    "Could not start voice recording. Check microphone access and try again.":
      "आवाज़ रिकॉर्डिंग शुरू नहीं हो सकी। माइक्रोफ़ोन की अनुमति जाँचें और फिर कोशिश करें।",
    "Voice recording failed. Please try again.":
      "आवाज़ रिकॉर्डिंग विफल हुई। फिर से कोशिश करें।",
    "No speech was recorded. Try again.": "कोई आवाज़ रिकॉर्ड नहीं हुई। फिर से कोशिश करें।",
    "Audio recording exceeds the 25 MB limit.":
      "ऑडियो रिकॉर्डिंग 25 MB की सीमा से बड़ी है।",
    "Speech transcription failed. Try again.": "आवाज़ का लिप्यंतरण विफल हुआ। फिर से कोशिश करें।",
    "Transcribing voice input": "आवाज़ का लिप्यंतरण हो रहा है",
    "Voice recordings are sent to Groq for transcription.":
      "आवाज़ की रिकॉर्डिंग लिप्यंतरण के लिए Groq को भेजी जाती है।",
    "No speech was detected. Try speaking again.": "आवाज़ सुनाई नहीं दी। फिर से बोलकर देखें।",
    "Voice input stopped unexpectedly. Please try again.":
      "आवाज़ से लिखना अचानक रुक गया। फिर से कोशिश करें।",
    "Could not start voice input. Please try again.":
      "आवाज़ से लिखना शुरू नहीं हो सका। फिर से कोशिश करें।",
    "Don't share Aadhaar numbers, OTPs, bank details or other secrets in chat.":
      "चैट में आधार नंबर, ओटीपी, बैंक विवरण या अन्य गोपनीय जानकारी साझा न करें।",
    "AI can make mistakes. Confirm details on the official site.":
      "एआई से गलती हो सकती है। विवरण की पुष्टि आधिकारिक वेबसाइट पर करें।",
    Send: "भेजें",
    "YOUR PROFILE": "आपकी प्रोफ़ाइल",
    "Your life, your details.": "आपका जीवन, आपका विवरण।",
    "Share only what helps match you with schemes. Optional sensitive fields can be left blank.":
      "केवल वही जानकारी दें जो योजनाएँ खोजने में मदद करे। वैकल्पिक संवेदनशील जानकारी खाली छोड़ सकते हैं।",
    complete: "पूरी",
    "Personal details": "व्यक्तिगत विवरण",
    Appearance: "रूप-रंग",
    "Choose your preferred color theme.": "अपनी पसंदीदा रंग थीम चुनें।",
    Green: "हरा",
    Blue: "नीला",
    "Used to assess scheme rules, not to guarantee approval.":
      "इसका उपयोग योजना के नियम समझने के लिए होता है, स्वीकृति की गारंटी के लिए नहीं।",
    "Profile completeness": "प्रोफ़ाइल पूर्णता",
    "Fill relevant fields to improve the quality of matches.":
      "बेहतर सुझाव पाने के लिए संबंधित जानकारी भरें।",
    Profession: "पेशा",
    Student: "विद्यार्थी",
    Farmer: "किसान",
    Entrepreneur: "उद्यमी",
    "Job seeker": "नौकरी खोजने वाला",
    "Salaried employee": "वेतनभोगी कर्मचारी",
    "Self-employed": "स्वरोज़गार",
    "State / UT": "राज्य / केंद्र शासित प्रदेश",
    "Under 18": "18 वर्ष से कम",
    "18–24": "18–24 वर्ष",
    "25–34": "25–34 वर्ष",
    "35–44": "35–44 वर्ष",
    "45–59": "45–59 वर्ष",
    "60+": "60+ वर्ष",
    "Education level": "शिक्षा का स्तर",
    "No formal schooling": "औपचारिक शिक्षा नहीं",
    School: "स्कूल",
    "Higher secondary": "उच्च माध्यमिक",
    Diploma: "डिप्लोमा",
    Undergraduate: "स्नातक",
    Postgraduate: "स्नातकोत्तर",
    Doctorate: "डॉक्टरेट",
    Gender: "लिंग",
    Woman: "महिला",
    Man: "पुरुष",
    "Non-binary": "नॉन-बाइनरी",
    "Prefer not to say": "बताना नहीं चाहते",
    "Social category (optional)": "सामाजिक श्रेणी (वैकल्पिक)",
    General: "सामान्य",
    OBC: "ओबीसी",
    SC: "एससी",
    ST: "एसटी",
    EWS: "ईडब्ल्यूएस",
    "Disability status (optional)": "दिव्यांगता की स्थिति (वैकल्पिक)",
    Optional: "वैकल्पिक",
    "Choose profession": "पेशा चुनें",
    "Choose state / ut": "राज्य / केंद्र शासित प्रदेश चुनें",
    "Choose education level": "शिक्षा का स्तर चुनें",
    "Choose gender": "लिंग चुनें",
    "Choose social category (optional)": "सामाजिक श्रेणी चुनें (वैकल्पिक)",
    "Choose disability status (optional)": "दिव्यांगता की स्थिति चुनें (वैकल्पिक)",
    "Age group": "आयु वर्ग",
    "Annual family income": "परिवार की वार्षिक आय",
    "Prefer not to say / not provided": "बताना नहीं चाहते / उपलब्ध नहीं",
    "Below ₹1 lakh": "₹1 लाख से कम",
    "₹1–2.5 lakh": "₹1–2.5 लाख",
    "₹2.5–5 lakh": "₹2.5–5 लाख",
    "₹5–8 lakh": "₹5–8 लाख",
    "Above ₹8 lakh": "₹8 लाख से अधिक",
    District: "ज़िला",
    "Enter district": "ज़िला दर्ज करें",
    "Save profile": "प्रोफ़ाइल सहेजें",
    "Profile changes are saved to your account.": "प्रोफ़ाइल में बदलाव आपके खाते में सहेजे गए हैं।",
    "Guest profile changes stay in this session only.":
      "अतिथि प्रोफ़ाइल के बदलाव केवल इस सत्र में रहेंगे।",
    "Your information stays yours.": "आपकी जानकारी आपकी ही रहती है।",
    "JanSahayak should collect the minimum information needed to help you explore schemes.":
      "JanSahayak को योजनाएँ खोजने में मदद के लिए केवल आवश्यक जानकारी लेनी चाहिए।",
    "No full Aadhaar number": "पूरा आधार नंबर नहीं",
    "Optional sensitive fields": "संवेदनशील जानकारी वैकल्पिक",
    "No document uploads in this MVP": "इस शुरुआती संस्करण में दस्तावेज़ अपलोड नहीं",
    "Review before applying": "आवेदन से पहले समीक्षा करें",
    "Account & consent": "खाता और सहमति",
    "Sign in to enable a persistent profile when Supabase is configured.":
      "Supabase कॉन्फ़िगर होने पर स्थायी प्रोफ़ाइल के लिए साइन इन करें।",
    "Delete my data and account": "मेरा डेटा और खाता हटाएँ",
    "Clear session data": "सत्र का डेटा साफ़ करें",
    "ADMIN WORKSPACE": "एडमिन कार्यस्थल",
    "Review before it reaches people.": "लोगों तक पहुँचने से पहले समीक्षा करें।",
    "Add scheme draft": "योजना का प्रारूप जोड़ें",
    "Search configured topics": "कॉन्फ़िगर किए गए विषय खोजें",
    "Searching…": "खोज रहे हैं…",
    "Review and publish": "समीक्षा करें और प्रकाशित करें",
    "Review queue is clear": "समीक्षा सूची खाली है",
    "Verification notes": "सत्यापन नोट",
    "Record what you verified on the official source.":
      "आधिकारिक स्रोत पर सत्यापित जानकारी दर्ज करें।",
    "I verified this draft against its official source.":
      "मैंने इस प्रारूप की आधिकारिक स्रोत से पुष्टि की है।",
    Cancel: "रद्द करें",
    "Publishing…": "प्रकाशित हो रहा है…",
    "Publish verified scheme": "सत्यापित योजना प्रकाशित करें",
    Close: "बंद करें",
    "Administrator email": "एडमिन ईमेल",
    Password: "पासवर्ड",
    "Verifying access…": "पहुँच सत्यापित हो रही है…",
    "Sign in and verify role": "साइन इन करें और भूमिका सत्यापित करें",
    "Restricted access": "सीमित पहुँच",
    "Confirm that you reviewed the official source used for this draft.":
      "पुष्टि करें कि आपने इस प्रारूप के लिए आधिकारिक स्रोत की समीक्षा की है।",
  },
  pa: {
    "JanSahayak — Government Benefits, Made Simpler":
      "JanSahayak — ਸਰਕਾਰੀ ਲਾਭ, ਹੁਣ ਆਸਾਨ",
    "Benefits, made simpler": "ਲਾਭ, ਹੁਣ ਆਸਾਨ",
    WORKSPACE: "ਕਾਰਜ-ਖੇਤਰ",
    Overview: "ਝਲਕ",
    "Find schemes": "ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    "Saved schemes": "ਸੰਭਾਲੀਆਂ ਯੋਜਨਾਵਾਂ",
    "AI assistant": "ਏਆਈ ਸਹਾਇਕ",
    "My profile": "ਮੇਰੀ ਪ੍ਰੋਫ਼ਾਈਲ",
    "Admin workspace": "ਐਡਮਿਨ ਕਾਰਜ-ਖੇਤਰ",
    "Admin sign in": "ਐਡਮਿਨ ਸਾਈਨ ਇਨ",
    "Trust comes first": "ਭਰੋਸਾ ਸਭ ਤੋਂ ਪਹਿਲਾਂ",
    "Only reviewed records should be treated as verified. Always confirm details on the official portal.":
      "ਸਿਰਫ਼ ਜਾਂਚੇ ਹੋਏ ਰਿਕਾਰਡਾਂ ਨੂੰ ਹੀ ਪ੍ਰਮਾਣਿਤ ਮੰਨੋ। ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਹਮੇਸ਼ਾ ਅਧਿਕਾਰਤ ਪੋਰਟਲ ਤੋਂ ਕਰੋ।",
    "Official scheme directory": "ਅਧਿਕਾਰਤ ਯੋਜਨਾ ਡਾਇਰੈਕਟਰੀ",
    "Your profile": "ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ",
    "Signed in": "ਸਾਈਨ ਇਨ ਕੀਤਾ ਹੋਇਆ",
    "Personalize your matches": "ਆਪਣੇ ਸੁਝਾਅ ਨਿੱਜੀ ਬਣਾਓ",
    "Open menu": "ਮੀਨੂ ਖੋਲ੍ਹੋ",
    "Close menu": "ਮੀਨੂ ਬੰਦ ਕਰੋ",
    "Admin review": "ਐਡਮਿਨ ਸਮੀਖਿਆ",
    Workspace: "ਕਾਰਜ-ਖੇਤਰ",
    Language: "ਭਾਸ਼ਾ",
    Notifications: "ਸੂਚਨਾਵਾਂ",
    "You are all caught up. Notification delivery will be enabled as channels are configured.":
      "ਤੁਸੀਂ ਸਾਰੀਆਂ ਸੂਚਨਾਵਾਂ ਦੇਖ ਲਈਆਂ ਹਨ। ਚੈਨਲ ਸੈੱਟ ਹੋਣ 'ਤੇ ਸੂਚਨਾਵਾਂ ਉਪਲਬਧ ਹੋਣਗੀਆਂ।",
    "Sign out": "ਸਾਈਨ ਆਉਟ",
    "Sign in": "ਸਾਈਨ ਇਨ",
    "Your data. Your choice.": "ਤੁਹਾਡਾ ਡਾਟਾ। ਤੁਹਾਡੀ ਚੋਣ।",
    "Find support that fits your life.": "ਆਪਣੀ ਲੋੜ ਮੁਤਾਬਕ ਸਹਾਇਤਾ ਲੱਭੋ।",
    "Explore schemes and scholarships using your profile. Always confirm details with the official source.":
      "ਆਪਣੀ ਪ੍ਰੋਫ਼ਾਈਲ ਦੇ ਆਧਾਰ 'ਤੇ ਯੋਜਨਾਵਾਂ ਅਤੇ ਵਜ਼ੀਫ਼ੇ ਲੱਭੋ। ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਹਮੇਸ਼ਾ ਅਧਿਕਾਰਤ ਸਰੋਤ ਤੋਂ ਕਰੋ।",
    "Explore schemes": "ਯੋਜਨਾਵਾਂ ਵੇਖੋ",
    Dismiss: "ਹਟਾਓ",
    "YOUR PERSONAL BENEFITS COMPANION": "ਤੁਹਾਡਾ ਨਿੱਜੀ ਲਾਭ ਸਹਾਇਕ",
    "Good support should": "ਸਹੀ ਸਹਾਇਤਾ",
    "find its way to you.": "ਤੱਕ ਪਹੁੰਚਣੀ ਚਾਹੀਦੀ ਹੈ।",
    "Discover government schemes, scholarships and support opportunities based on who you are and what you need.":
      "ਤੁਸੀਂ ਕੌਣ ਹੋ ਅਤੇ ਤੁਹਾਨੂੰ ਕੀ ਚਾਹੀਦਾ ਹੈ, ਇਸ ਦੇ ਆਧਾਰ 'ਤੇ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ, ਵਜ਼ੀਫ਼ੇ ਅਤੇ ਸਹਾਇਤਾ ਦੇ ਮੌਕੇ ਲੱਭੋ।",
    "Find my schemes": "ਮੇਰੀਆਂ ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    "Complete my profile": "ਮੇਰੀ ਪ੍ਰੋਫ਼ਾਈਲ ਪੂਰੀ ਕਰੋ",
    "Official-source review": "ਅਧਿਕਾਰਤ ਸਰੋਤ ਦੀ ਸਮੀਖਿਆ",
    "Privacy-minded": "ਨਿੱਜਤਾ ਦਾ ਧਿਆਨ",
    "Education support": "ਸਿੱਖਿਆ ਸਹਾਇਤਾ",
    "Scholarships & grants": "ਵਜ਼ੀਫ਼ੇ ਅਤੇ ਗ੍ਰਾਂਟਾਂ",
    "For your profession": "ਤੁਹਾਡੇ ਪੇਸ਼ੇ ਲਈ",
    "Matches tailored to you": "ਤੁਹਾਡੇ ਲਈ ਢੁਕਵੇਂ ਸੁਝਾਅ",
    "Verified schemes": "ਪ੍ਰਮਾਣਿਤ ਯੋਜਨਾਵਾਂ",
    "Published records": "ਪ੍ਰਕਾਸ਼ਿਤ ਰਿਕਾਰਡ",
    "No verified records yet": "ਹਾਲੇ ਕੋਈ ਪ੍ਰਮਾਣਿਤ ਰਿਕਾਰਡ ਨਹੀਂ",
    "Saved for later": "ਬਾਅਦ ਲਈ ਸੰਭਾਲਿਆ",
    "Your personal shortlist": "ਤੁਹਾਡੀ ਨਿੱਜੀ ਸੂਚੀ",
    "Profile complete": "ਪ੍ਰੋਫ਼ਾਈਲ ਪੂਰੀ",
    "Improve your matches": "ਆਪਣੇ ਸੁਝਾਅ ਬਿਹਤਰ ਬਣਾਓ",
    "Review standard": "ਸਮੀਖਿਆ ਮਿਆਰ",
    "Manual approval required": "ਦਸਤੀ ਮਨਜ਼ੂਰੀ ਲੋੜੀਂਦੀ",
    "START HERE": "ਇੱਥੋਂ ਸ਼ੁਰੂ ਕਰੋ",
    "What brings you here?": "ਤੁਸੀਂ ਇੱਥੇ ਕਿਸ ਲਈ ਆਏ ਹੋ?",
    "Choose a path to find the right opportunities.":
      "ਸਹੀ ਮੌਕੇ ਲੱਭਣ ਲਈ ਇੱਕ ਰਾਹ ਚੁਣੋ।",
    "Browse all": "ਸਾਰੇ ਵੇਖੋ",
    "I'm a student": "ਮੈਂ ਵਿਦਿਆਰਥੀ ਹਾਂ",
    "Scholarships, fee support and education grants":
      "ਵਜ਼ੀਫ਼ੇ, ਫ਼ੀਸ ਸਹਾਇਤਾ ਅਤੇ ਸਿੱਖਿਆ ਗ੍ਰਾਂਟਾਂ",
    "I'm a farmer": "ਮੈਂ ਕਿਸਾਨ ਹਾਂ",
    "Agriculture support, subsidies and resources":
      "ਖੇਤੀਬਾੜੀ ਸਹਾਇਤਾ, ਸਬਸਿਡੀਆਂ ਅਤੇ ਸਰੋਤ",
    "I run a business": "ਮੈਂ ਕਾਰੋਬਾਰ ਚਲਾਉਂਦਾ/ਚਲਾਉਂਦੀ ਹਾਂ",
    "Entrepreneurship, MSME and business support":
      "ਉੱਦਮਤਾ, ਐਮਐਸਐਮਈ ਅਤੇ ਕਾਰੋਬਾਰੀ ਸਹਾਇਤਾ",
    "I'm looking for work": "ਮੈਂ ਕੰਮ ਲੱਭ ਰਿਹਾ/ਰਹੀ ਹਾਂ",
    "Training, employment and skill programmes":
      "ਸਿਖਲਾਈ, ਰੁਜ਼ਗਾਰ ਅਤੇ ਹੁਨਰ ਪ੍ਰੋਗਰਾਮ",
    "Set up profile": "ਪ੍ਰੋਫ਼ਾਈਲ ਬਣਾਓ",
    "Better matches start with your profile.": "ਬਿਹਤਰ ਸੁਝਾਅ ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਤੋਂ ਸ਼ੁਰੂ ਹੁੰਦੇ ਹਨ।",
    "Share only the details needed to assess eligibility. You can update your profile at any time.":
      "ਯੋਗਤਾ ਜਾਂਚਣ ਲਈ ਸਿਰਫ਼ ਲੋੜੀਂਦੀ ਜਾਣਕਾਰੀ ਦਿਓ। ਤੁਸੀਂ ਆਪਣੀ ਪ੍ਰੋਫ਼ਾਈਲ ਕਦੇ ਵੀ ਅੱਪਡੇਟ ਕਰ ਸਕਦੇ ਹੋ।",
    "SCHEME DETAILS": "ਯੋਜਨਾ ਦੇ ਵੇਰਵੇ",
    "Summary language": "ਸਾਰ ਦੀ ਭਾਸ਼ਾ",
    "Read aloud": "ਉੱਚੀ ਆਵਾਜ਼ ਵਿੱਚ ਪੜ੍ਹੋ",
    "Stop reading": "ਪੜ੍ਹਨਾ ਰੋਕੋ",
    "Read summary aloud": "ਸਾਰ ਉੱਚੀ ਆਵਾਜ਼ ਵਿੱਚ ਪੜ੍ਹੋ",
    "Stop reading summary": "ਸਾਰ ਪੜ੍ਹਨਾ ਰੋਕੋ",
    Pause: "ਰੋਕੋ",
    Resume: "ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ",
    Stop: "ਬੰਦ ਕਰੋ",
    "Pause reading summary": "ਸਾਰ ਪੜ੍ਹਨਾ ਰੋਕੋ",
    "Resume reading summary": "ਸਾਰ ਪੜ੍ਹਨਾ ਮੁੜ ਸ਼ੁਰੂ ਕਰੋ",
    "A reviewed summary is not available in this language yet.":
      "ਇਸ ਭਾਸ਼ਾ ਵਿੱਚ ਸਮੀਖਿਆ ਕੀਤਾ ਸਾਰ ਹਾਲੇ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।",
    "Admin reviewed record": "ਐਡਮਿਨ ਵੱਲੋਂ ਜਾਂਚਿਆ ਰਿਕਾਰਡ",
    "Verification required": "ਪ੍ਰਮਾਣਿਕਤਾ ਲੋੜੀਂਦੀ",
    "Check the source and current application status before applying.":
      "ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਸਰੋਤ ਅਤੇ ਮੌਜੂਦਾ ਅਰਜ਼ੀ ਸਥਿਤੀ ਜਾਂਚੋ।",
    "Application status": "ਅਰਜ਼ੀ ਦੀ ਸਥਿਤੀ",
    "Unknown — check official site": "ਅਣਜਾਣ — ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਵੇਖੋ",
    Deadline: "ਆਖ਼ਰੀ ਮਿਤੀ",
    "Not confirmed": "ਪੁਸ਼ਟੀ ਨਹੀਂ ਹੋਈ",
    "Government level": "ਸਰਕਾਰੀ ਪੱਧਰ",
    Department: "ਵਿਭਾਗ",
    "Not specified": "ਨਿਰਧਾਰਤ ਨਹੀਂ",
    "Documents to check": "ਜਾਂਚਣ ਵਾਲੇ ਦਸਤਾਵੇਜ਼",
    Saved: "ਸੰਭਾਲਿਆ",
    "Save scheme": "ਯੋਜਨਾ ਸੰਭਾਲੋ",
    "Open official source": "ਅਧਿਕਾਰਤ ਸਰੋਤ ਖੋਲ੍ਹੋ",
    BENEFIT: "ਲਾਭ",
    "Government scheme": "ਸਰਕਾਰੀ ਯੋਜਨਾ",
    Eligible: "ਯੋਗ",
    "Not eligible": "ਯੋਗ ਨਹੀਂ",
    Maybe: "ਸ਼ਾਇਦ",
    "RESTRICTED WORKSPACE": "ਸੀਮਤ ਕਾਰਜ-ਖੇਤਰ",
    "Administrator access only.": "ਸਿਰਫ਼ ਐਡਮਿਨ ਲਈ ਪਹੁੰਚ।",
    "Scheme review and publication tools are available only to accounts with an active server-assigned administrator role.":
      "ਯੋਜਨਾ ਸਮੀਖਿਆ ਅਤੇ ਪ੍ਰਕਾਸ਼ਨ ਸਾਧਨ ਸਿਰਫ਼ ਸਰਵਰ ਵੱਲੋਂ ਦਿੱਤੀ ਸਰਗਰਮ ਐਡਮਿਨ ਭੂਮਿਕਾ ਵਾਲੇ ਖਾਤਿਆਂ ਲਈ ਹਨ।",
    "Your current account is not verified for admin access.":
      "ਤੁਹਾਡਾ ਮੌਜੂਦਾ ਖਾਤਾ ਐਡਮਿਨ ਪਹੁੰਚ ਲਈ ਪ੍ਰਮਾਣਿਤ ਨਹੀਂ ਹੈ।",
    "Sign in with an administrator account.": "ਐਡਮਿਨ ਖਾਤੇ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ।",
    "Use an account provisioned as a reviewer, publisher, or super administrator.":
      "ਸਮੀਖਿਅਕ, ਪ੍ਰਕਾਸ਼ਕ ਜਾਂ ਸੁਪਰ ਐਡਮਿਨ ਵਜੋਂ ਸੈੱਟ ਕੀਤੇ ਖਾਤੇ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    "Administrator access is checked by the JanSahayak API after sign-in.":
      "ਸਾਈਨ ਇਨ ਤੋਂ ਬਾਅਦ JanSahayak API ਐਡਮਿਨ ਪਹੁੰਚ ਦੀ ਜਾਂਚ ਕਰਦੀ ਹੈ।",
    "Manual approval is mandatory": "ਦਸਤੀ ਮਨਜ਼ੂਰੀ ਲਾਜ਼ਮੀ ਹੈ",
    "Approving a candidate only moves it to Ready to edit; it will not appear on the citizen home page yet. Create a scheme draft, verify it, and publish it from Drafts to make it visible.":
      "ਕਿਸੇ ਸੰਭਾਵੀ ਯੋਜਨਾ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰਨ ਨਾਲ ਉਹ ਸਿਰਫ਼ ਸੋਧ ਲਈ ਤਿਆਰ ਹੁੰਦੀ ਹੈ; ਇਹ ਹਾਲੇ ਨਾਗਰਿਕ ਹੋਮ ਪੇਜ 'ਤੇ ਨਹੀਂ ਦਿਖੇਗੀ। ਦਿਖਾਉਣ ਲਈ ਯੋਜਨਾ ਦਾ ਖ਼ਾਕਾ ਬਣਾਓ, ਜਾਂਚੋ ਅਤੇ ਖ਼ਾਕੇ ਟੈਬ ਤੋਂ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ।",
    "Only administrator-reviewed, published listings appear here.":
      "ਇੱਥੇ ਸਿਰਫ਼ ਐਡਮਿਨ ਵੱਲੋਂ ਸਮੀਖਿਆ ਕੀਤੀਆਂ ਅਤੇ ਪ੍ਰਕਾਸ਼ਿਤ ਯੋਜਨਾਵਾਂ ਦਿਖਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    "No published schemes yet": "ਹਾਲੇ ਕੋਈ ਯੋਜਨਾ ਪ੍ਰਕਾਸ਼ਿਤ ਨਹੀਂ ਹੋਈ",
    "Schemes appear here only after an administrator reviews and publishes them.":
      "ਐਡਮਿਨ ਵੱਲੋਂ ਸਮੀਖਿਆ ਅਤੇ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰਨ ਤੋਂ ਬਾਅਦ ਹੀ ਯੋਜਨਾਵਾਂ ਇੱਥੇ ਦਿਖਦੀਆਂ ਹਨ।",
    "Import myScheme catalog": "myScheme ਕੈਟਾਲਾਗ ਆਯਾਤ ਕਰੋ",
    "Importing catalog…": "ਕੈਟਾਲਾਗ ਆਯਾਤ ਹੋ ਰਿਹਾ ਹੈ…",
    Previous: "ਪਿਛਲਾ",
    Next: "ਅੱਗੇ",
    Showing: "ਦਿਖਾਏ ਜਾ ਰਹੇ",
    Page: "ਪੰਨਾ",
    of: "ਵਿੱਚੋਂ",
    "Review queue pages": "ਸਮੀਖਿਆ ਕਤਾਰ ਦੇ ਪੰਨੇ",
    Candidates: "ਸੰਭਾਵੀ ਰਿਕਾਰਡ",
    "Awaiting review": "ਸਮੀਖਿਆ ਦੀ ਉਡੀਕ",
    Published: "ਪ੍ਰਕਾਸ਼ਿਤ",
    "Approved records": "ਮਨਜ਼ੂਰ ਰਿਕਾਰਡ",
    "Re-verification": "ਦੁਬਾਰਾ ਪ੍ਰਮਾਣਿਕਤਾ",
    "Drafts awaiting verification": "ਪ੍ਰਮਾਣਿਕਤਾ ਦੀ ਉਡੀਕ ਕਰਦੇ ਖ਼ਾਕੇ",
    "Scheme review queue": "ਯੋਜਨਾ ਸਮੀਖਿਆ ਕਤਾਰ",
    "Inspect the official source and confirm all critical fields.":
      "ਅਧਿਕਾਰਤ ਸਰੋਤ ਵੇਖੋ ਅਤੇ ਸਾਰੇ ਅਹਿਮ ਖੇਤਰਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ।",
    "Research queue": "ਖੋਜ ਕਤਾਰ",
    "Ready to edit": "ਸੋਧ ਲਈ ਤਿਆਰ",
    Drafts: "ਖ਼ਾਕੇ",
    Rejected: "ਰੱਦ ਕੀਤੇ",
    "Loading review candidates…": "ਸਮੀਖਿਆ ਲਈ ਸੰਭਾਵੀ ਰਿਕਾਰਡ ਲੋਡ ਹੋ ਰਹੇ ਹਨ…",
    Retry: "ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    "Search the web above to find new scheme candidates.":
      "ਯੋਜਨਾਵਾਂ ਦੇ ਨਵੇਂ ਸੰਭਾਵੀ ਰਿਕਾਰਡ ਲੱਭਣ ਲਈ ਉੱਪਰ ਵੈੱਬ 'ਤੇ ਖੋਜੋ।",
    "No records are currently in this workflow stage.":
      "ਇਸ ਕੰਮ ਦੇ ਪੜਾਅ ਵਿੱਚ ਇਸ ਵੇਲੇ ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਹੈ।",
    "Approval endpoints require a server-validated admin role. Hiding this page from navigation is not an access-control mechanism.":
      "ਮਨਜ਼ੂਰੀ ਐਂਡਪੌਇੰਟ ਲਈ ਸਰਵਰ-ਪ੍ਰਮਾਣਿਤ ਐਡਮਿਨ ਭੂਮਿਕਾ ਲੋੜੀਂਦੀ ਹੈ। ਨੈਵੀਗੇਸ਼ਨ ਤੋਂ ਇਹ ਸਫ਼ਾ ਲੁਕਾਉਣਾ ਪਹੁੰਚ-ਨਿਯੰਤਰਣ ਨਹੀਂ ਹੈ।",
    "Research web": "ਵੈੱਬ 'ਤੇ ਖੋਜ ਕਰੋ",
    "Search the web for a scheme, benefit, group, or region":
      "ਯੋਜਨਾ, ਲਾਭ, ਸਮੂਹ ਜਾਂ ਖੇਤਰ ਲਈ ਵੈੱਬ 'ਤੇ ਖੋਜੋ",
    "Web research query": "ਵੈੱਬ ਖੋਜ ਪੁੱਛਗਿੱਛ",
    "Read search evidence": "ਖੋਜ ਦੇ ਸਬੂਤ ਪੜ੍ਹੋ",
    "Department not confirmed": "ਵਿਭਾਗ ਦੀ ਪੁਸ਼ਟੀ ਨਹੀਂ ਹੋਈ",
    "Official source not supplied": "ਅਧਿਕਾਰਤ ਸਰੋਤ ਨਹੀਂ ਦਿੱਤਾ",
    "Found for:": "ਇਸ ਲਈ ਲੱਭਿਆ:",
    "Create a draft from research": "ਖੋਜ ਤੋਂ ਖ਼ਾਕਾ ਬਣਾਓ",
    "Add a scheme draft": "ਯੋਜਨਾ ਦਾ ਖ਼ਾਕਾ ਸ਼ਾਮਲ ਕਰੋ",
    "Verify the official source and scheme details. Saving creates an unpublished draft for separate review.":
      "ਅਧਿਕਾਰਤ ਸਰੋਤ ਅਤੇ ਯੋਜਨਾ ਵੇਰਵਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ। ਸੰਭਾਲਣ ਨਾਲ ਵੱਖਰੀ ਸਮੀਖਿਆ ਲਈ ਅਪ੍ਰਕਾਸ਼ਿਤ ਖ਼ਾਕਾ ਬਣੇਗਾ।",
    "Scheme title *": "ਯੋਜਨਾ ਦਾ ਸਿਰਲੇਖ *",
    "Official scheme name": "ਯੋਜਨਾ ਦਾ ਅਧਿਕਾਰਤ ਨਾਮ",
    "Scheme type": "ਯੋਜਨਾ ਦੀ ਕਿਸਮ",
    "Short description *": "ਛੋਟਾ ਵੇਰਵਾ *",
    "Describe the scheme based on its official source.":
      "ਅਧਿਕਾਰਤ ਸਰੋਤ ਦੇ ਆਧਾਰ 'ਤੇ ਯੋਜਨਾ ਦਾ ਵੇਰਵਾ ਦਿਓ।",
    "Official source URL *": "ਅਧਿਕਾਰਤ ਸਰੋਤ URL *",
    "Application URL": "ਅਰਜ਼ੀ URL",
    "State code / name": "ਰਾਜ ਕੋਡ / ਨਾਮ",
    "Leave blank for all India": "ਸਾਰੇ ਭਾਰਤ ਲਈ ਖਾਲੀ ਛੱਡੋ",
    "Responsible department": "ਜ਼ਿੰਮੇਵਾਰ ਵਿਭਾਗ",
    "Benefit summary": "ਲਾਭ ਦਾ ਸਾਰ",
    "Benefit as stated by official source": "ਅਧਿਕਾਰਤ ਸਰੋਤ ਵੱਲੋਂ ਦੱਸਿਆ ਲਾਭ",
    "Optional eligibility rule": "ਵਿਕਲਪਿਕ ਯੋਗਤਾ ਨਿਯਮ",
    "Profile field": "ਪ੍ਰੋਫ਼ਾਈਲ ਖੇਤਰ",
    Operator: "ਓਪਰੇਟਰ",
    "Expected value": "ਉਮੀਦ ਕੀਤਾ ਮੁੱਲ",
    "Document checklist item (optional)": "ਦਸਤਾਵੇਜ਼ ਸੂਚੀ ਆਈਟਮ (ਵਿਕਲਪਿਕ)",
    "Document name to confirm from the official source":
      "ਅਧਿਕਾਰਤ ਸਰੋਤ ਤੋਂ ਪੁਸ਼ਟੀ ਕਰਨ ਵਾਲੇ ਦਸਤਾਵੇਜ਼ ਦਾ ਨਾਮ",
    "I reviewed the official source for this draft. It will remain unpublished until a publisher completes the separate verification.":
      "ਮੈਂ ਇਸ ਖ਼ਾਕੇ ਦੇ ਅਧਿਕਾਰਤ ਸਰੋਤ ਦੀ ਸਮੀਖਿਆ ਕੀਤੀ ਹੈ। ਪ੍ਰਕਾਸ਼ਕ ਵੱਲੋਂ ਵੱਖਰੀ ਜਾਂਚ ਪੂਰੀ ਹੋਣ ਤੱਕ ਇਹ ਅਪ੍ਰਕਾਸ਼ਿਤ ਰਹੇਗਾ।",
    "Saving…": "ਸੰਭਾਲਿਆ ਜਾ ਰਿਹਾ ਹੈ…",
    "Save and publish": "ਸੰਭਾਲੋ ਅਤੇ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ",
    "ADMINISTRATOR SIGN IN": "ਐਡਮਿਨ ਸਾਈਨ ਇਨ",
    "Sign in with your provisioned administrator account. Access is verified by the server; a valid citizen account is not sufficient.":
      "ਆਪਣੇ ਨਿਰਧਾਰਤ ਐਡਮਿਨ ਖਾਤੇ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ। ਪਹੁੰਚ ਦੀ ਪੁਸ਼ਟੀ ਸਰਵਰ ਕਰਦਾ ਹੈ; ਨਾਗਰਿਕ ਖਾਤਾ ਕਾਫ਼ੀ ਨਹੀਂ ਹੈ।",
    "Admin accounts must be created in Supabase and assigned a role in the server-controlled admin registry. Never share credentials.":
      "ਐਡਮਿਨ ਖਾਤੇ Supabase ਵਿੱਚ ਬਣਾਓ ਅਤੇ ਸਰਵਰ-ਨਿਯੰਤਰਿਤ ਐਡਮਿਨ ਰਜਿਸਟਰੀ ਵਿੱਚ ਭੂਮਿਕਾ ਦਿਓ। ਲਾਗਇਨ ਜਾਣਕਾਰੀ ਕਦੇ ਸਾਂਝੀ ਨਾ ਕਰੋ।",
    "Close form": "ਫ਼ਾਰਮ ਬੰਦ ਕਰੋ",
    "Could not load review candidates.": "ਸਮੀਖਿਆ ਲਈ ਸੰਭਾਵੀ ਰਿਕਾਰਡ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕੇ।",
    "There are no approved records yet.": "ਹਾਲੇ ਕੋਈ ਮਨਜ਼ੂਰ ਰਿਕਾਰਡ ਨਹੀਂ ਹੈ।",
    Other: "ਹੋਰ",
    Yes: "ਹਾਂ",
    No: "ਨਹੀਂ",
    "WELCOME TO JANSAHAYAK": "ਜਨਸਹਾਇਕ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
    "Choose your language": "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    "Select the language you want to use across the website.":
      "ਪੂਰੀ ਵੈੱਬਸਾਈਟ 'ਤੇ ਵਰਤਣ ਲਈ ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ।",
    "Choose website language": "ਵੈੱਬਸਾਈਟ ਦੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    Continue: "ਜਾਰੀ ਰੱਖੋ",
    "Enter your OTP": "ਆਪਣਾ ਓਟੀਪੀ ਦਰਜ ਕਰੋ",
    "Sign in with your email": "ਆਪਣੇ ਈਮੇਲ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    "Enter the verification code sent to your email.":
      "ਆਪਣੇ ਈਮੇਲ 'ਤੇ ਭੇਜਿਆ ਗਿਆ ਪੁਸ਼ਟੀ ਕੋਡ ਦਰਜ ਕਰੋ।",
    "Use your email address to save your profile and bookmarks across sessions.":
      "ਵੱਖ-ਵੱਖ ਸੈਸ਼ਨਾਂ ਵਿੱਚ ਆਪਣੀ ਪ੍ਰੋਫ਼ਾਈਲ ਅਤੇ ਸੰਭਾਲੀਆਂ ਯੋਜਨਾਵਾਂ ਰੱਖਣ ਲਈ ਈਮੇਲ ਪਤਾ ਵਰਤੋ।",
    "Email address": "ਈਮੇਲ ਪਤਾ",
    "One-time password": "ਇੱਕ-ਵਾਰੀ ਪਾਸਵਰਡ",
    "Enter OTP": "ਓਟੀਪੀ ਦਰਜ ਕਰੋ",
    "Please wait…": "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕੋ…",
    "Verify & sign in": "ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਸਾਈਨ ਇਨ ਕਰੋ",
    "Send OTP": "ਓਟੀਪੀ ਭੇਜੋ",
    "OTP sent. Check your email.": "ਓਟੀਪੀ ਭੇਜ ਦਿੱਤਾ ਗਿਆ ਹੈ। ਆਪਣਾ ਈਮੇਲ ਵੇਖੋ।",
    "By continuing, you agree to use this service responsibly. Never share your OTP with anyone.":
      "ਅੱਗੇ ਵਧ ਕੇ ਤੁਸੀਂ ਇਸ ਸੇਵਾ ਨੂੰ ਜ਼ਿੰਮੇਵਾਰੀ ਨਾਲ ਵਰਤਣ ਲਈ ਸਹਿਮਤ ਹੋ। ਆਪਣਾ ਓਟੀਪੀ ਕਿਸੇ ਨਾਲ ਸਾਂਝਾ ਨਾ ਕਰੋ।",
    "Unable to continue. Check your email address and configuration.":
      "ਅੱਗੇ ਨਹੀਂ ਵੱਧ ਸਕੇ। ਆਪਣਾ ਈਮੇਲ ਪਤਾ ਅਤੇ ਸੰਰਚਨਾ ਜਾਂਚੋ।",
    "Signed in with email": "ਈਮੇਲ ਨਾਲ ਸਾਈਨ ਇਨ ਕੀਤਾ",
    "Sign in with email OTP": "ਈਮੇਲ ਓਟੀਪੀ ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ",
    "Profile changes are saved to your signed-in email account.":
      "ਪ੍ਰੋਫ਼ਾਈਲ ਵਿੱਚ ਕੀਤੀਆਂ ਤਬਦੀਲੀਆਂ ਤੁਹਾਡੇ ਸਾਈਨ-ਇਨ ਈਮੇਲ ਖਾਤੇ ਵਿੱਚ ਸੰਭਾਲੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।",
    "Could not sign out. Please try again.": "ਸਾਈਨ ਆਉਟ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "You have been signed out.": "ਤੁਸੀਂ ਸਾਈਨ ਆਉਟ ਹੋ ਗਏ ਹੋ।",
    "Session data cleared. No guest profile is stored on this device.":
      "ਸੈਸ਼ਨ ਡਾਟਾ ਸਾਫ਼ ਕਰ ਦਿੱਤਾ ਗਿਆ। ਇਸ ਡਿਵਾਈਸ 'ਤੇ ਮਹਿਮਾਨ ਪ੍ਰੋਫ਼ਾਈਲ ਸੰਭਾਲੀ ਨਹੀਂ ਜਾਂਦੀ।",
    "Profile saved for this session. Sign in to sync it securely across visits.":
      "ਪ੍ਰੋਫ਼ਾਈਲ ਇਸ ਸੈਸ਼ਨ ਲਈ ਸੰਭਾਲੀ ਗਈ। ਵੱਖ-ਵੱਖ ਦੌਰਿਆਂ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਤੌਰ 'ਤੇ ਸਿੰਕ ਕਰਨ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ।",
    "Could not load your profile. Please try again.":
      "ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ ਲੋਡ ਨਹੀਂ ਹੋ ਸਕੀ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "SCHEME EXPLORER": "ਯੋਜਨਾ ਖੋਜ",
    "Find what you may qualify for.": "ਜਾਣੋ ਕਿ ਤੁਸੀਂ ਕਿਹੜੀਆਂ ਯੋਜਨਾਵਾਂ ਲਈ ਯੋਗ ਹੋ ਸਕਦੇ ਹੋ।",
    "Search government opportunities and review the evidence before applying.":
      "ਸਰਕਾਰੀ ਮੌਕੇ ਲੱਭੋ ਅਤੇ ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਸਬੂਤ ਵੇਖੋ।",
    records: "ਰਿਕਾਰਡ",
    "Try scholarship, farmer support, business grant…":
      "ਵਜ਼ੀਫ਼ਾ, ਕਿਸਾਨ ਸਹਾਇਤਾ ਜਾਂ ਕਾਰੋਬਾਰੀ ਗ੍ਰਾਂਟ ਲੱਭੋ…",
    "Search schemes": "ਯੋਜਨਾਵਾਂ ਲੱਭੋ",
    "Filter by": "ਇਸ ਮੁਤਾਬਕ ਛਾਂਟੋ",
    "All types": "ਸਾਰੀਆਂ ਕਿਸਮਾਂ",
    "All India": "ਸਾਰਾ ਭਾਰਤ",
    "Saved only": "ਸਿਰਫ਼ ਸੰਭਾਲੀਆਂ",
    Opportunities: "ਮੌਕੇ",
    "Sort schemes": "ਯੋਜਨਾਵਾਂ ਕ੍ਰਮਬੱਧ ਕਰੋ",
    "Featured order": "ਚੁਣੇ ਹੋਏ ਕ੍ਰਮ ਵਿੱਚ",
    "Title A to Z": "ਸਿਰਲੇਖ ੳ ਤੋਂ ਞ",
    "Deadline soonest": "ਸਭ ਤੋਂ ਨੇੜਲੀ ਆਖ਼ਰੀ ਮਿਤੀ",
    "No matching records": "ਕੋਈ ਮੇਲ ਖਾਂਦਾ ਰਿਕਾਰਡ ਨਹੀਂ",
    "Try a different search or clear one of the filters.":
      "ਕੋਈ ਹੋਰ ਖੋਜ ਕਰੋ ਜਾਂ ਇੱਕ ਫ਼ਿਲਟਰ ਹਟਾਓ।",
    "Clear filters": "ਫ਼ਿਲਟਰ ਹਟਾਓ",
    Scholarship: "ਵਜ਼ੀਫ਼ਾ",
    Subsidy: "ਸਬਸਿਡੀ",
    Grant: "ਗ੍ਰਾਂਟ",
    Pension: "ਪੈਨਸ਼ਨ",
    Training: "ਸਿਖਲਾਈ",
    Insurance: "ਬੀਮਾ",
    Central: "ਕੇਂਦਰੀ",
    State: "ਰਾਜ",
    "Review pending": "ਸਮੀਖਿਆ ਬਾਕੀ",
    Verified: "ਪ੍ਰਮਾਣਿਤ",
    "View details": "ਵੇਰਵੇ ਵੇਖੋ",
    "Check official site": "ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਵੇਖੋ",
    "Nothing saved yet": "ਹਾਲੇ ਕੁਝ ਵੀ ਸੰਭਾਲਿਆ ਨਹੀਂ",
    "Bookmark a scheme to build your personal shortlist.":
      "ਆਪਣੀ ਨਿੱਜੀ ਸੂਚੀ ਬਣਾਉਣ ਲਈ ਕੋਈ ਯੋਜਨਾ ਸੰਭਾਲੋ।",
    "A little clarity goes a long way.": "ਥੋੜ੍ਹੀ ਜਿਹੀ ਸਪਸ਼ਟਤਾ ਬਹੁਤ ਮਦਦ ਕਰਦੀ ਹੈ।",
    "Hello! I can help you use JanSahayak to find and understand government schemes. I can guide you step by step: open Find schemes, choose a search or filter, review a scheme's eligibility and official source, then save it if useful. What kind of support are you looking for?":
      "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ JanSahayak 'ਤੇ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਅਤੇ ਸਮਝਣ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ। ਮੈਂ ਕਦਮ-ਦਰ-ਕਦਮ ਰਾਹ ਦਿਖਾ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ: ਯੋਜਨਾਵਾਂ ਲੱਭੋ ਖੋਲ੍ਹੋ, ਖੋਜ ਜਾਂ ਫਿਲਟਰ ਚੁਣੋ, ਯੋਜਨਾ ਦੀ ਯੋਗਤਾ ਅਤੇ ਅਧਿਕਾਰਤ ਸਰੋਤ ਵੇਖੋ, ਫਿਰ ਲੋੜ ਹੋਵੇ ਤਾਂ ਸੰਭਾਲੋ। ਤੁਹਾਨੂੰ ਕਿਸ ਤਰ੍ਹਾਂ ਦੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ?",
    "Get help using JanSahayak to find schemes, understand available records, and verify official sources.":
      "JanSahayak 'ਤੇ ਯੋਜਨਾਵਾਂ ਲੱਭਣ, ਉਪਲਬਧ ਰਿਕਾਰਡ ਸਮਝਣ ਅਤੇ ਅਧਿਕਾਰਤ ਸਰੋਤਾਂ ਦੀ ਪੁਸ਼ਟੀ ਕਰਨ ਵਿੱਚ ਮਦਦ ਲਵੋ।",
    "Evidence-first assistant": "ਸਬੂਤ-ਅਧਾਰਿਤ ਸਹਾਇਕ",
    "Your scheme guide": "ਤੁਹਾਡੀ ਯੋਜਨਾ ਗਾਈਡ",
    "I can help with this website and its scheme-finding features. I can't guarantee eligibility or government approval.":
      "ਮੈਂ ਇਸ ਵੈੱਬਸਾਈਟ ਅਤੇ ਇਸ ਦੀਆਂ ਯੋਜਨਾ-ਖੋਜ ਸਹੂਲਤਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ/ਸਕਦੀ ਹਾਂ। ਮੈਂ ਯੋਗਤਾ ਜਾਂ ਸਰਕਾਰੀ ਮਨਜ਼ੂਰੀ ਦੀ ਗਾਰੰਟੀ ਨਹੀਂ ਦੇ ਸਕਦਾ/ਸਕਦੀ।",
    "Reply language": "ਜਵਾਬ ਦੀ ਭਾਸ਼ਾ",
    "Find a scheme in a few steps": "ਕੁਝ ਕਦਮਾਂ ਵਿੱਚ ਯੋਜਨਾ ਲੱਭੋ",
    "Open Find schemes.": "ਯੋਜਨਾਵਾਂ ਲੱਭੋ ਖੋਲ੍ਹੋ।",
    "Search or filter by type and location.": "ਕਿਸਮ ਅਤੇ ਥਾਂ ਮੁਤਾਬਕ ਖੋਜੋ ਜਾਂ ਫਿਲਟਰ ਕਰੋ।",
    "Check eligibility and the official source.": "ਯੋਗਤਾ ਅਤੇ ਅਧਿਕਾਰਤ ਸਰੋਤ ਦੀ ਜਾਂਚ ਕਰੋ।",
    "Save schemes you want to revisit.": "ਜਿਹੜੀਆਂ ਯੋਜਨਾਵਾਂ ਮੁੜ ਵੇਖਣੀਆਂ ਹਨ, ਉਨ੍ਹਾਂ ਨੂੰ ਸੰਭਾਲੋ।",
    "Guide me one step at a time to find schemes.": "ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਲਈ ਮੈਨੂੰ ਇੱਕ-ਇੱਕ ਕਦਮ ਕਰਕੇ ਦੱਸੋ।",
    "How do I filter schemes by location?": "ਮੈਂ ਥਾਂ ਮੁਤਾਬਕ ਯੋਜਨਾਵਾਂ ਨੂੰ ਕਿਵੇਂ ਫਿਲਟਰ ਕਰਾਂ?",
    "How do I save a scheme?": "ਮੈਂ ਯੋਜਨਾ ਕਿਵੇਂ ਸੰਭਾਲਾਂ?",
    "Ask how to use JanSahayak or find a scheme…":
      "JanSahayak ਵਰਤਣ ਜਾਂ ਯੋਜਨਾ ਲੱਭਣ ਬਾਰੇ ਪੁੱਛੋ…",
    "Start voice input": "ਆਵਾਜ਼ ਨਾਲ ਲਿਖਣਾ ਸ਼ੁਰੂ ਕਰੋ",
    "Stop voice input": "ਆਵਾਜ਼ ਨਾਲ ਲਿਖਣਾ ਰੋਕੋ",
    "Voice input in English": "ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਆਵਾਜ਼ ਨਾਲ ਲਿਖੋ",
    "Voice input in हिन्दी": "ਹਿੰਦੀ ਵਿੱਚ ਆਵਾਜ਼ ਨਾਲ ਲਿਖੋ",
    "Voice input in ਪੰਜਾਬੀ": "ਪੰਜਾਬੀ ਵਿੱਚ ਆਵਾਜ਼ ਨਾਲ ਲਿਖੋ",
    "Voice input isn't available in this browser. Try Chrome or Edge, or type your message.":
      "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਵਾਜ਼ ਨਾਲ ਲਿਖਣਾ ਉਪਲਬਧ ਨਹੀਂ ਹੈ। Chrome ਜਾਂ Edge ਅਜ਼ਮਾਓ, ਜਾਂ ਆਪਣਾ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ।",
    "Voice recording isn't supported in this browser. Try a recent Chrome, Edge, or Safari, or type your message.":
      "ਇਸ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਆਵਾਜ਼ ਰਿਕਾਰਡ ਕਰਨਾ ਸਮਰਥਿਤ ਨਹੀਂ ਹੈ। ਨਵਾਂ Chrome, Edge ਜਾਂ Safari ਅਜ਼ਮਾਓ, ਜਾਂ ਸੁਨੇਹਾ ਟਾਈਪ ਕਰੋ।",
    "Microphone access was denied. Allow microphone access in your browser settings and try again.":
      "ਮਾਈਕ੍ਰੋਫ਼ੋਨ ਦੀ ਇਜਾਜ਼ਤ ਨਹੀਂ ਮਿਲੀ। ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਾਂ ਵਿੱਚ ਇਜਾਜ਼ਤ ਦਿਓ ਅਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Could not start voice recording. Check microphone access and try again.":
      "ਆਵਾਜ਼ ਰਿਕਾਰਡਿੰਗ ਸ਼ੁਰੂ ਨਹੀਂ ਹੋ ਸਕੀ। ਮਾਈਕ੍ਰੋਫ਼ੋਨ ਦੀ ਇਜਾਜ਼ਤ ਜਾਂਚੋ ਅਤੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Voice recording failed. Please try again.":
      "ਆਵਾਜ਼ ਰਿਕਾਰਡਿੰਗ ਅਸਫਲ ਹੋਈ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "No speech was recorded. Try again.": "ਕੋਈ ਆਵਾਜ਼ ਰਿਕਾਰਡ ਨਹੀਂ ਹੋਈ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Audio recording exceeds the 25 MB limit.":
      "ਆਡੀਓ ਰਿਕਾਰਡਿੰਗ 25 MB ਦੀ ਸੀਮਾ ਤੋਂ ਵੱਧ ਹੈ।",
    "Speech transcription failed. Try again.": "ਆਵਾਜ਼ ਦਾ ਲਿਪੀਅੰਤਰ ਅਸਫਲ ਹੋਇਆ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Transcribing voice input": "ਆਵਾਜ਼ ਦਾ ਲਿਪੀਅੰਤਰ ਹੋ ਰਿਹਾ ਹੈ",
    "Voice recordings are sent to Groq for transcription.":
      "ਆਵਾਜ਼ ਦੀ ਰਿਕਾਰਡਿੰਗ ਲਿਪੀਅੰਤਰ ਲਈ Groq ਨੂੰ ਭੇਜੀ ਜਾਂਦੀ ਹੈ।",
    "No speech was detected. Try speaking again.": "ਆਵਾਜ਼ ਸੁਣੀ ਨਹੀਂ ਗਈ। ਮੁੜ ਬੋਲ ਕੇ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Voice input stopped unexpectedly. Please try again.":
      "ਆਵਾਜ਼ ਨਾਲ ਲਿਖਣਾ ਅਚਾਨਕ ਰੁਕ ਗਿਆ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Could not start voice input. Please try again.":
      "ਆਵਾਜ਼ ਨਾਲ ਲਿਖਣਾ ਸ਼ੁਰੂ ਨਹੀਂ ਹੋ ਸਕਿਆ। ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    "Don't share Aadhaar numbers, OTPs, bank details or other secrets in chat.":
      "ਚੈਟ ਵਿੱਚ ਆਧਾਰ ਨੰਬਰ, ਓਟੀਪੀ, ਬੈਂਕ ਵੇਰਵੇ ਜਾਂ ਹੋਰ ਗੁਪਤ ਜਾਣਕਾਰੀ ਸਾਂਝੀ ਨਾ ਕਰੋ।",
    "AI can make mistakes. Confirm details on the official site.":
      "ਏਆਈ ਤੋਂ ਗ਼ਲਤੀ ਹੋ ਸਕਦੀ ਹੈ। ਵੇਰਵਿਆਂ ਦੀ ਪੁਸ਼ਟੀ ਅਧਿਕਾਰਤ ਵੈੱਬਸਾਈਟ ਤੋਂ ਕਰੋ।",
    Send: "ਭੇਜੋ",
    "YOUR PROFILE": "ਤੁਹਾਡੀ ਪ੍ਰੋਫ਼ਾਈਲ",
    "Your life, your details.": "ਤੁਹਾਡੀ ਜ਼ਿੰਦਗੀ, ਤੁਹਾਡੇ ਵੇਰਵੇ।",
    "Share only what helps match you with schemes. Optional sensitive fields can be left blank.":
      "ਸਿਰਫ਼ ਉਹ ਜਾਣਕਾਰੀ ਦਿਓ ਜੋ ਯੋਜਨਾਵਾਂ ਨਾਲ ਮੇਲ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰੇ। ਵਿਕਲਪਿਕ ਸੰਵੇਦਨਸ਼ੀਲ ਖੇਤਰ ਖਾਲੀ ਛੱਡ ਸਕਦੇ ਹੋ।",
    complete: "ਪੂਰੀ",
    "Personal details": "ਨਿੱਜੀ ਵੇਰਵੇ",
    Appearance: "ਦਿੱਖ",
    "Choose your preferred color theme.": "ਆਪਣੀ ਪਸੰਦ ਦੀ ਰੰਗ ਥੀਮ ਚੁਣੋ।",
    Green: "ਹਰਾ",
    Blue: "ਨੀਲਾ",
    "Used to assess scheme rules, not to guarantee approval.":
      "ਇਸ ਦੀ ਵਰਤੋਂ ਯੋਜਨਾ ਦੇ ਨਿਯਮ ਸਮਝਣ ਲਈ ਹੁੰਦੀ ਹੈ, ਮਨਜ਼ੂਰੀ ਦੀ ਗਾਰੰਟੀ ਲਈ ਨਹੀਂ।",
    "Profile completeness": "ਪ੍ਰੋਫ਼ਾਈਲ ਦੀ ਪੂਰਨਤਾ",
    "Fill relevant fields to improve the quality of matches.":
      "ਬਿਹਤਰ ਸੁਝਾਅ ਲੈਣ ਲਈ ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਭਰੋ।",
    Profession: "ਪੇਸ਼ਾ",
    Student: "ਵਿਦਿਆਰਥੀ",
    Farmer: "ਕਿਸਾਨ",
    Entrepreneur: "ਉੱਦਮੀ",
    "Job seeker": "ਨੌਕਰੀ ਲੱਭਣ ਵਾਲਾ",
    "Salaried employee": "ਤਨਖ਼ਾਹਦਾਰ ਕਰਮਚਾਰੀ",
    "Self-employed": "ਸਵੈ-ਰੁਜ਼ਗਾਰ",
    "State / UT": "ਰਾਜ / ਕੇਂਦਰ ਸ਼ਾਸਿਤ ਪ੍ਰਦੇਸ਼",
    "Under 18": "18 ਸਾਲ ਤੋਂ ਘੱਟ",
    "18–24": "18–24 ਸਾਲ",
    "25–34": "25–34 ਸਾਲ",
    "35–44": "35–44 ਸਾਲ",
    "45–59": "45–59 ਸਾਲ",
    "60+": "60+ ਸਾਲ",
    "Education level": "ਸਿੱਖਿਆ ਦਾ ਪੱਧਰ",
    "No formal schooling": "ਰਸਮੀ ਸਕੂਲੀ ਸਿੱਖਿਆ ਨਹੀਂ",
    School: "ਸਕੂਲ",
    "Higher secondary": "ਉੱਚ ਮਾਧਿਅਮਿਕ",
    Diploma: "ਡਿਪਲੋਮਾ",
    Undergraduate: "ਅੰਡਰਗ੍ਰੈਜੂਏਟ",
    Postgraduate: "ਪੋਸਟਗ੍ਰੈਜੂਏਟ",
    Doctorate: "ਡਾਕਟਰੇਟ",
    Gender: "ਲਿੰਗ",
    Woman: "ਔਰਤ",
    Man: "ਮਰਦ",
    "Non-binary": "ਨਾਨ-ਬਾਈਨਰੀ",
    "Prefer not to say": "ਦੱਸਣਾ ਨਹੀਂ ਚਾਹੁੰਦੇ",
    "Social category (optional)": "ਸਮਾਜਿਕ ਸ਼੍ਰੇਣੀ (ਵਿਕਲਪਿਕ)",
    General: "ਜਨਰਲ",
    OBC: "ਓਬੀਸੀ",
    SC: "ਐਸਸੀ",
    ST: "ਐਸਟੀ",
    EWS: "ਈਡਬਲਯੂਐਸ",
    "Disability status (optional)": "ਅਪੰਗਤਾ ਦੀ ਸਥਿਤੀ (ਵਿਕਲਪਿਕ)",
    Optional: "ਵਿਕਲਪਿਕ",
    "Age group": "ਉਮਰ ਸਮੂਹ",
    "Annual family income": "ਪਰਿਵਾਰ ਦੀ ਸਾਲਾਨਾ ਆਮਦਨ",
    "Prefer not to say / not provided": "ਦੱਸਣਾ ਨਹੀਂ ਚਾਹੁੰਦੇ / ਦਿੱਤੀ ਨਹੀਂ",
    "Below ₹1 lakh": "₹1 ਲੱਖ ਤੋਂ ਘੱਟ",
    "₹1–2.5 lakh": "₹1–2.5 ਲੱਖ",
    "₹2.5–5 lakh": "₹2.5–5 ਲੱਖ",
    "₹5–8 lakh": "₹5–8 ਲੱਖ",
    "Above ₹8 lakh": "₹8 ਲੱਖ ਤੋਂ ਵੱਧ",
    District: "ਜ਼ਿਲ੍ਹਾ",
    "Enter district": "ਜ਼ਿਲ੍ਹਾ ਦਰਜ ਕਰੋ",
    "Save profile": "ਪ੍ਰੋਫ਼ਾਈਲ ਸੰਭਾਲੋ",
    "Profile changes are saved to your account.": "ਪ੍ਰੋਫ਼ਾਈਲ ਦੇ ਬਦਲਾਅ ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਸੰਭਾਲੇ ਗਏ ਹਨ।",
    "Guest profile changes stay in this session only.":
      "ਮਹਿਮਾਨ ਪ੍ਰੋਫ਼ਾਈਲ ਦੇ ਬਦਲਾਅ ਸਿਰਫ਼ ਇਸ ਸੈਸ਼ਨ ਵਿੱਚ ਰਹਿਣਗੇ।",
    "Your information stays yours.": "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਤੁਹਾਡੀ ਹੀ ਰਹਿੰਦੀ ਹੈ।",
    "JanSahayak should collect the minimum information needed to help you explore schemes.":
      "JanSahayak ਨੂੰ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਲਈ ਸਿਰਫ਼ ਲੋੜੀਂਦੀ ਜਾਣਕਾਰੀ ਲੈਣੀ ਚਾਹੀਦੀ ਹੈ।",
    "No full Aadhaar number": "ਪੂਰਾ ਆਧਾਰ ਨੰਬਰ ਨਹੀਂ",
    "Optional sensitive fields": "ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਣਕਾਰੀ ਵਿਕਲਪਿਕ",
    "No document uploads in this MVP": "ਇਸ ਸ਼ੁਰੂਆਤੀ ਵਰਜਨ ਵਿੱਚ ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਨਹੀਂ",
    "Review before applying": "ਅਰਜ਼ੀ ਦੇਣ ਤੋਂ ਪਹਿਲਾਂ ਸਮੀਖਿਆ ਕਰੋ",
    "Account & consent": "ਖਾਤਾ ਅਤੇ ਸਹਿਮਤੀ",
    "Sign in to enable a persistent profile when Supabase is configured.":
      "Supabase ਸੈੱਟ ਹੋਣ 'ਤੇ ਸਥਾਈ ਪ੍ਰੋਫ਼ਾਈਲ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ।",
    "Delete my data and account": "ਮੇਰਾ ਡਾਟਾ ਅਤੇ ਖਾਤਾ ਮਿਟਾਓ",
    "Clear session data": "ਸੈਸ਼ਨ ਡਾਟਾ ਸਾਫ਼ ਕਰੋ",
    "ADMIN WORKSPACE": "ਐਡਮਿਨ ਕਾਰਜ-ਖੇਤਰ",
    "Review before it reaches people.": "ਲੋਕਾਂ ਤੱਕ ਪਹੁੰਚਣ ਤੋਂ ਪਹਿਲਾਂ ਸਮੀਖਿਆ ਕਰੋ।",
    "Add scheme draft": "ਯੋਜਨਾ ਦਾ ਖ਼ਾਕਾ ਸ਼ਾਮਲ ਕਰੋ",
    "Search configured topics": "ਸੈੱਟ ਕੀਤੇ ਵਿਸ਼ੇ ਲੱਭੋ",
    "Searching…": "ਖੋਜ ਜਾਰੀ ਹੈ…",
    "Review and publish": "ਸਮੀਖਿਆ ਕਰਕੇ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ",
    "Review queue is clear": "ਸਮੀਖਿਆ ਸੂਚੀ ਖਾਲੀ ਹੈ",
    "Verification notes": "ਪ੍ਰਮਾਣਿਕਤਾ ਨੋਟ",
    "Record what you verified on the official source.":
      "ਅਧਿਕਾਰਤ ਸਰੋਤ 'ਤੇ ਜਾਂਚੀ ਜਾਣਕਾਰੀ ਦਰਜ ਕਰੋ।",
    "I verified this draft against its official source.":
      "ਮੈਂ ਇਸ ਖ਼ਾਕੇ ਦੀ ਅਧਿਕਾਰਤ ਸਰੋਤ ਨਾਲ ਪੁਸ਼ਟੀ ਕੀਤੀ ਹੈ।",
    Cancel: "ਰੱਦ ਕਰੋ",
    "Publishing…": "ਪ੍ਰਕਾਸ਼ਿਤ ਹੋ ਰਿਹਾ ਹੈ…",
    "Publish verified scheme": "ਪ੍ਰਮਾਣਿਤ ਯੋਜਨਾ ਪ੍ਰਕਾਸ਼ਿਤ ਕਰੋ",
    Close: "ਬੰਦ ਕਰੋ",
    "Administrator email": "ਐਡਮਿਨ ਈਮੇਲ",
    Password: "ਪਾਸਵਰਡ",
    "Verifying access…": "ਪਹੁੰਚ ਦੀ ਜਾਂਚ ਜਾਰੀ ਹੈ…",
    "Sign in and verify role": "ਸਾਈਨ ਇਨ ਕਰਕੇ ਭੂਮਿਕਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    "Restricted access": "ਸੀਮਤ ਪਹੁੰਚ",
    "Confirm that you reviewed the official source used for this draft.":
      "ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਤੁਸੀਂ ਇਸ ਖ਼ਾਕੇ ਲਈ ਅਧਿਕਾਰਤ ਸਰੋਤ ਦੀ ਸਮੀਖਿਆ ਕੀਤੀ ਹੈ।",
  },
};

const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const defaultDocumentTitle = document.title;

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function getTranslation(value, language) {
  if (language === "en") return value;
  const dictionary = translations[language];
  const normalized = normalize(value);
  const translated = dictionary[normalized];
  if (!translated) return value;
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  return `${leading}${translated}${trailing}`;
}

function localizeTextNode(node, language) {
  const current = node.nodeValue || "";
  const previous = originalText.get(node);
  const source =
    previous && current === getTranslation(previous.value, previous.language)
      ? previous.value
      : current;
  originalText.set(node, { value: source, language });
  const translated = getTranslation(source, language);
  if (current !== translated) node.nodeValue = translated;
}

function localizeAttribute(element, attribute, language) {
  const current = element.getAttribute(attribute);
  if (current === null) return;
  let attributes = originalAttributes.get(element);
  if (!attributes) {
    attributes = new Map();
    originalAttributes.set(element, attributes);
  }
  const previous = attributes.get(attribute);
  const source =
    previous &&
    current === getTranslation(previous.value, previous.language)
      ? previous.value
      : current;
  attributes.set(attribute, { value: source, language });
  const translated = getTranslation(source, language);
  if (current !== translated) element.setAttribute(attribute, translated);
}

function localizeElement(element, language) {
  for (const attribute of ["aria-label", "title", "placeholder"]) {
    localizeAttribute(element, attribute, language);
  }
  for (const node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      localizeTextNode(node, language);
    } else if (
      node.nodeType === Node.ELEMENT_NODE &&
      !["SCRIPT", "STYLE", "TEXTAREA", "CODE"].includes(node.tagName)
    ) {
      localizeElement(node, language);
    }
  }
}

export function useWebsiteLocalization(rootRef, language) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    document.documentElement.lang =
      language === "hi" ? "hi" : language === "pa" ? "pa" : "en";
    document.title = getTranslation(defaultDocumentTitle, language);
    localizeElement(root, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          localizeTextNode(mutation.target, language);
        } else if (mutation.type === "attributes") {
          localizeAttribute(mutation.target, mutation.attributeName, language);
        } else {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
              localizeTextNode(node, language);
            } else if (
              node.nodeType === Node.ELEMENT_NODE &&
              !["SCRIPT", "STYLE", "TEXTAREA", "CODE"].includes(node.tagName)
            ) {
              localizeElement(node, language);
            }
          }
        }
      }
    });
    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["aria-label", "title", "placeholder"],
    });
    return () => observer.disconnect();
  }, [rootRef, language]);
}
