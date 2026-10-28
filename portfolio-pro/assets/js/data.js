/* =====================================================================
   PORTFOLIO CONTENT — edit this file to update the website.
   - Every list below is rendered automatically; add or remove entries freely.
   - Entries marked `placeholder: true` are shown with a dashed "To add" style
     while SITE.showPlaceholders is true. Set it to false before publishing
     to hide every placeholder at once.
   ===================================================================== */

const SITE = {
  showPlaceholders: true,

  // Optional: a form service endpoint (e.g. https://formspree.io/f/xxxxxxx).
  // Leave empty and the contact form will open the visitor's email app instead.
  formEndpoint: "",

  name: "Meji A G",
  email: "mejigeorge2002@gmail.com",
  phone: "+91 77366 68497",
  phoneHref: "+917736668497",
  location: "Thrissur, Kerala",
  linkedin: "https://www.linkedin.com/in/meji-a-g-a272aa200/",
  github: "", // add a GitHub profile URL here

  resumes: [
    { label: "Teaching CV", note: "Assistant Professor roles", file: "assets/resumes/Meji_A_G_Teaching_CV.pdf" },
    { label: "QA Resume", note: "QA / software testing roles", file: "assets/resumes/Meji_A_G_QA_Resume.pdf" },
    { label: "Software Engineer Resume", note: "Software engineering roles", file: "assets/resumes/Meji_A_G_Software_Engineer_Resume.pdf" },
  ],
};

/* ---------------- Career focus (the three cards) ---------------- */
const CAREERS = [
  {
    id: "teaching",
    status: "Current role",
    title: "Assistant Professor",
    summary: "Teaching Computer Science to BCA students across all three years, with theory classes, programming labs, mentoring and class advising.",
    skills: ["DBMS", "Python", "Data Structures", "Cryptography", "Data Science", "Mentoring"],
    highlight: "Top student score of 98/100 in Fundamentals of Data Science (last semester).",
    cta: { label: "View teaching experience", href: "#experience" },
  },
  {
    id: "qa",
    status: "Open to opportunities",
    title: "QA Engineer",
    summary: "Testing my own web and mobile apps: writing test cases, checking flows end to end, validating API responses in Postman and confirming data with SQL.",
    skills: ["Manual testing", "Test cases", "Postman", "API testing", "SQL", "Bug reporting"],
    highlight: "Three apps tested end to end, including Firebase and REST API integrations.",
    cta: { label: "See testing projects", filter: "qa" },
  },
  {
    id: "swe",
    status: "Open to opportunities",
    title: "Software Engineer",
    summary: "Building web and mobile applications with React and Flutter, connecting REST APIs and Firebase, on top of strong data structures and database fundamentals.",
    skills: ["React", "Flutter", "Python", "JavaScript", "REST APIs", "PostgreSQL", "Git"],
    highlight: "One Flutter mobile app and two React web apps built.",
    cta: { label: "See development projects", filter: "swe" },
  },
];

/* ---------------- Experience timeline ---------------- */
const EXPERIENCE = [
  {
    title: "Assistant Professor, Department of Computer Science",
    org: "ECR Institute of Management Studies",
    place: "Udupi, Karnataka · Affiliated to Mangalore University",
    dates: "Jan 2026 – Present",
    current: true,
    responsibilities: [
      "Teach DBMS, Python Programming, Data Structures, Cryptography and Fundamentals of Data Science to first-, second- and third-year BCA students.",
      "Conduct programming labs: guide implementation, review and debug student code, and evaluate lab records.",
      "Prepare lesson plans, lecture notes, assignments and internal assessments in line with the university syllabus.",
      "Class Advisor: track attendance, academic progress and student welfare.",
      "Mentor students individually, handle examination duties and help organise departmental events.",
    ],
    achievements: [
      "Students scored up to 98/100 in Fundamentals of Data Science in the last semester university examination.",
      "Class results improved compared with previous batches in the subjects handled.",
    ],
    tools: ["Python", "SQL", "Data Structures", "Lab instruction"],
  },
  {
    placeholder: true,
    title: "Previous role, internship or training",
    org: "Organisation name",
    place: "Location",
    dates: "Dates",
    responsibilities: ["Add earlier teaching, internship or industry experience here, if any."],
  },
];

/* ---------------- Skills (no percentage bars — honest labels instead) ---------------- */
const SKILLS = [
  {
    group: "Academic",
    items: [
      { name: "Teaching & mentoring", level: "Current role" },
      { name: "DBMS, Python, Data Structures, Cryptography, Data Science", level: "Teaching now" },
      { name: "Lesson planning & academic assessment", level: "Current role" },
      { name: "Class advising", level: "Current role" },
      { name: "Communication & presentation", level: "Daily" },
    ],
  },
  {
    group: "Quality Assurance",
    items: [
      { name: "Manual & functional testing", level: "Project experience" },
      { name: "Test case design & execution", level: "Project experience" },
      { name: "API testing with Postman", level: "Project experience" },
      { name: "Regression, smoke & sanity testing", level: "Familiar" },
      { name: "Bug reporting & defect life cycle", level: "Familiar" },
      { name: "Data checks with SQL", level: "Project experience" },
      { name: "Automation testing (e.g. Selenium)", level: "Add if applicable", placeholder: true },
    ],
  },
  {
    group: "Software Engineering",
    items: [
      { name: "Python, JavaScript, Dart", level: "Projects & teaching" },
      { name: "React (web)", level: "Project experience" },
      { name: "Flutter (mobile)", level: "Project experience" },
      { name: "REST APIs & Firebase", level: "Project experience" },
      { name: "PostgreSQL & SQL", level: "Projects & teaching" },
      { name: "Git & version control", level: "Working knowledge" },
      { name: "Debugging & problem solving", level: "Daily in labs" },
    ],
  },
];

/* ---------------- Projects ----------------
   categories: "academic" | "qa" | "swe"  (a project can be in more than one)
   image: optional path to a screenshot, e.g. "assets/img/bookmate.png"
   links: add github / demo URLs when available                              */
const PROJECTS = [
  {
    title: "Book Mate",
    type: "Mobile app",
    categories: ["swe", "qa"],
    description: "A book recommendation app with login, category selection and book details.",
    problem: "Helping readers discover books by category without searching manually.",
    contribution: "Implemented the recommendation features and the login, category selection and book detail flows, and tested each integration point.",
    tech: ["Flutter", "Dart", "Firebase", "Google Books API"],
    testing: "Verified the login, category and book detail flows end to end, and checked Firebase Authentication and Google Books API responses for correctness.",
    image: "",
    links: { github: "", demo: "" },
  },
  {
    title: "Weather App",
    type: "Web app",
    categories: ["swe", "qa"],
    description: "Real-time weather updates based on the user's location.",
    problem: "Showing accurate, current weather for where the user is.",
    contribution: "Developed the weather data fetching and location-based display in React.",
    tech: ["React", "JavaScript", "REST API"],
    testing: "Validated API responses against what the interface displays, and checked UI consistency.",
    image: "",
    links: { github: "", demo: "" },
  },
  {
    title: "Movie Database",
    type: "Web app",
    categories: ["swe", "qa"],
    description: "A responsive web app to browse and search movies using an external API.",
    problem: "Making it quick to search for a movie and see its details.",
    contribution: "Built dynamic search, movie detail pages and the responsive React interface.",
    tech: ["React", "JavaScript", "REST API", "HTML", "CSS"],
    testing: "Checked search results, detail pages and the responsive layout against the external API data.",
    image: "",
    links: { github: "", demo: "" },
  },
  {
    placeholder: true,
    title: "Example: Academic project",
    type: "Academic",
    categories: ["academic"],
    description: "Placeholder — replace with an M.Sc. / BCA project, a lab initiative or student project you guided.",
    problem: "What problem did it address?",
    contribution: "What was your role?",
    tech: ["Tools used"],
    testing: "",
    image: "",
    links: { github: "", demo: "" },
  },
];

/* ---------------- Education & development ---------------- */
const EDUCATION = [
  { title: "Master of Science in Computer Science", org: "University of Kerala", dates: "2023 – 2025", note: "CGPA 8.0" },
  { title: "Bachelor of Computer Applications", org: "University of Calicut", dates: "2020 – 2023", note: "CGPA 7.2" },
];

const DEVELOPMENT = [
  { kind: "Certification", title: "Add a certification (e.g. NPTEL, ISTQB)", org: "Issuer", dates: "Year", link: "", placeholder: true },
  { kind: "Technical training", title: "Add a course or technical training", org: "Provider", dates: "Year", link: "", placeholder: true },
  { kind: "Workshop / FDP", title: "Add a workshop, FDP or conference", org: "Organiser", dates: "Year", link: "", placeholder: true },
];
