export const site = {
  name: 'Dilusha Chandrasiri',
  shortName: 'Dilusha',
  title: 'CS & AI Engineer',
  tagline: 'Building reliable, human-friendly products with lean stacks and applied machine learning.',
  email: 'tenathdilusha@gmail.com',
  emailObfuscated: 'tenathdilusha@gmail.com',
  linkedin: 'https://www.linkedin.com/in/dilusha-chandrasiri/',
  github: 'https://github.com/TenathDilusha',
  cv: '/assets/cv.pdf',
  profileImage: '/assets/profile_pic.jpg',
};

export const projects = [
  {
    id: 'documind',
    title: 'DocuMind',
    description: 'Local RAG system for PDF Q&A with FastAPI, FAISS, and Ollama.',
    details:
      'Upload PDFs, embed chunks with FAISS, and chat with documents entirely on your machine. Built for privacy-first research and study workflows without sending files to the cloud.',
    image: '/assets/documind-social-preview.png',
    href: 'https://github.com/TenathDilusha/DocuMind',
    period: '2025–',
    tags: ['Python', 'FastAPI', 'FAISS', 'RAG', 'Ollama'],
    featured: true,
  },
  {
    id: 'eventhive',
    title: 'EventHive',
    description: 'Role-based event management with NestJS, React, and PostgreSQL.',
    details:
      'Full-stack platform for organizers, attendees, and admins. Includes JWT authentication, role-based access control, and event lifecycle management from creation to registration.',
    image: '/assets/event.jpeg',
    href: 'https://github.com/TenathDilusha/EventHive',
    period: '2025',
    tags: ['NestJS', 'React', 'PostgreSQL', 'TypeScript'],
    featured: true,
  },
  {
    id: 'student-ai',
    title: 'Student Assistant AI',
    description: 'React + Node.js study chatbot powered by the Gemini API.',
    details:
      'Conversational assistant for coursework help — context-aware replies, clean chat UI, and a Node backend that proxies requests to Gemini with sensible rate limiting.',
    image: '/assets/assisstance.jpeg',
    href: 'https://github.com/TenathDilusha/AI-chatbot',
    period: '2024',
    tags: ['React', 'Node.js', 'Gemini API'],
    featured: true,
  },
  {
    id: 'dsa-genie',
    title: 'DSA Genie',
    description: 'Interactive DSA helper using retrieval-augmented generation.',
    details:
      'Ask data-structure and algorithm questions and get explanations grounded in curated content. Uses RAG to surface relevant examples instead of generic LLM answers.',
    image: '/assets/DSA.jpeg',
    href: 'https://github.com/TenathDilusha/DSA-genie',
    period: '2024',
    tags: ['Python', 'RAG', 'LLM'],
    featured: true,
  },
  {
    id: 'mora-kings',
    title: 'Mora Kings',
    description: 'Official site for the University of Moratuwa chess team.',
    details:
      'Team news, player profiles, tournament results, and event updates — a lightweight public site for the university chess community.',
    image: '/assets/morakings.png',
    href: 'https://github.com/TenathDilusha/Mora-Kings',
    period: '2024',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: false,
  },
  {
    id: 'travelmate',
    title: 'TravelMate',
    description: 'ML-driven travel recommendations with Flask and React.',
    details:
      'Suggests destinations from user preferences and history. Flask API serves recommendations; React frontend presents interactive trip planning.',
    image: '/assets/travel.jpeg',
    href: 'https://github.com/TenathDilusha/TravelMate',
    period: '2024',
    tags: ['Flask', 'React', 'Machine Learning'],
    featured: false,
  },
  {
    id: 'clinic',
    title: 'Clinic Management System',
    description: 'Appointments and treatments with Next.js, PostgreSQL, and JWT auth.',
    details:
      'Role-based clinic workflow for scheduling, patient records, and treatment tracking. Secure authentication and clear separation between staff and patient views.',
    image: '/assets/clinic.jpg',
    href: 'https://github.com/TenathDilusha/clinic-management-system',
    period: '2023',
    tags: ['Next.js', 'PostgreSQL', 'Auth'],
    featured: false,
  },
  {
    id: 'crypto',
    title: 'Cryptocurrency Converter',
    description: 'Live fiat/crypto conversion using public exchange APIs.',
    details:
      'Real-time rate lookups and conversion between currencies via Node.js and public market data APIs.',
    image: '/assets/crypto.jpg',
    href: 'https://github.com/TenathDilusha/CryptoCurrency-Converter',
    period: 'Past',
    tags: ['Node.js', 'REST API'],
    featured: false,
  },
  {
    id: 'password-manager',
    title: 'Password Manager',
    description: 'Python Tkinter vault with generator and local encrypted storage.',
    details:
      'Desktop app for generating strong passwords and storing credentials locally with encryption — no cloud dependency.',
    image: '/assets/password.png',
    href: 'https://github.com/TenathDilusha/password-manager',
    period: 'Past',
    tags: ['Python', 'Tkinter'],
    featured: false,
  },
];

export const utilityProjects = [
  {
    id: 'pomodoro',
    title: 'Pomodoro Timer',
    description: 'Productivity timer with session logging.',
    image: '/assets/pomodoro.png',
    href: 'https://github.com/TenathDilusha/pomodoro-timer',
  },
  {
    id: 'flashcards',
    title: 'French Flashcards',
    description: 'GUI flashcard app for language practice.',
    image: '/assets/Flashcards.jpg',
    href: 'https://github.com/TenathDilusha/french-flashcards',
  },
  {
    id: 'snake',
    title: 'Classic Games',
    description: 'Snake, Pong, and Turtle Crossing — OOP and event handling practice.',
    image: '/assets/Snake_OG-logo.jpg',
    href: 'https://github.com/TenathDilusha/Snake-Game',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const allProjects = projects;

export const about = {
  image: '/assets/about_pic.jpg',
  paragraphs: [
    'I am a Computer Science and Engineering undergraduate at the University of Moratuwa — focused on full-stack development, applied AI, and building systems that are secure and pleasant to use.',
    'I grew up at Maliyadeva College, Kurunegala, where mathematics and problem-solving first clicked. Today I enjoy turning ambiguous ideas into shippable products with lean, well-chosen stacks.',
    'My work spans RAG-powered tools, role-based web platforms, and ML-assisted applications. I care about clear architecture, thoughtful UX, and code that teammates can trust.',
  ],
};

export const highlights = [
  {
    id: 'chess',
    title: 'Chess & Competition',
    description:
      'FIDE-rated player on the University of Moratuwa team. Colours Award recipient in 2024. Built Mora Kings to showcase team news and results.',
    image: '/assets/chess_1.jpeg',
    imageAlt: 'Dilusha at a chess competition',
    imageSecondary: '/assets/colours.jpeg',
    imageAltSecondary: 'University Colours Award ceremony',
  },
  {
    id: 'education',
    title: 'University of Moratuwa',
    description:
      'Studying at one of South Asia\'s leading engineering universities — coursework in AI, systems, databases, and software design.',
    image: '/assets/cse.jpeg',
    imageAlt: 'University of Moratuwa',
  },
];

export const experiencePreview = [
  {
    title: 'University of Moratuwa',
    description: 'B.Sc. in Computer Science and Engineering — AI, systems, and software design.',
    period: 'Present',
    image: '/assets/cse.jpeg',
  },
  {
    title: 'Postman API Student Expert',
    description: 'REST workflows, collections, environments, and API testing.',
    period: 'Certified',
    image: '/assets/education.png',
  },
  {
    title: 'Hackathons',
    description: 'IEEEXtreme, Enigma finalist, and SLIIT Xtreme competitive programming.',
    period: '2023–',
    image: '/assets/ieeextream.jpeg',
  },
];

export const skills = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'] },
  { label: 'Frontend', items: ['React', 'Next.js', 'HTML', 'CSS'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Flask'] },
  { label: 'Database', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { label: 'AI / ML', items: ['RAG', 'FAISS', 'Ollama', 'Gemini API', 'Scikit-learn', 'Pandas'] },
  { label: 'Tooling', items: ['Git', 'Postman', 'VS Code', 'Linux', 'Docker'] },
];

export const hackathons = [
  {
    name: 'IEEEXtreme',
    detail: '24-hour global programming challenge with algorithmic problems under strict time limits.',
    image: '/assets/ieeextream.jpeg',
  },
  {
    name: 'Enigma',
    detail: 'University innovation hackathon finalist — rapid prototyping and pitching under constraints.',
    image: '/assets/enigma.jpeg',
  },
  {
    name: 'SLIIT Xtreme',
    detail: 'Inter-university competitive programming — sharpening DSA and debugging speed.',
    image: '/assets/sliit.jpeg',
  },
];

export const certifications = [
  {
    label: 'Postman API Student Expert',
    href: 'https://badges.parchment.com/public/assertions/_Fpq6V6lTni69izdB3DZZw?identity__email=tenathdilusha@gmail.com',
  },
  {
    label: 'Introduction to Machine Learning',
    href: '/assets/certificates/UOM_230101R - Intro to Machine Learning (1).png',
  },
  {
    label: 'Pandas for Data Analysis',
    href: '/assets/certificates/UOM_230101R - Pandas (1).png',
  },
  {
    label: 'Data Cleaning',
    href: '/assets/certificates/UOM_230101R - Data Cleaning (2).png',
  },
  {
    label: 'Feature Engineering',
    href: '/assets/certificates/UOM_230101R - Feature Engineering (1).png',
  },
];
