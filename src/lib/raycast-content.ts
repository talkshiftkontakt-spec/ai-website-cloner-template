import type {
  AiFeature,
  AutomationCard,
  ExtensionCard,
  ExtensionCategory,
  FeatureTile,
  FooterColumn,
  NavLink,
  Testimonial,
  YoutubeVideo,
} from "@/types/raycast";

export const navLinks: NavLink[] = [
  { label: "Store", href: "/store" },
  { label: "Pro", href: "/pro" },
  { label: "AI", href: "/core-features/ai" },
  { label: "iOS", href: "/ios" },
  { label: "Windows", href: "/windows" },
  { label: "Teams", href: "/teams" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export const extensionCategories: ExtensionCategory[] = [
  "Productivity",
  "Engineering",
  "Design",
  "Writing",
];

export const extensionCards: ExtensionCard[] = [
  {
    name: "Linear",
    description:
      "Create, search and modify your issues without leaving your keyboard.",
    category: "Productivity",
    gradient: "from-[#1a2744] via-[#152038] to-[#0d1424]",
  },
  {
    name: "Google Translate",
    description:
      "Use Google Translate to effortlessly translate into multiple languages",
    category: "Productivity",
    gradient: "from-[#132447] via-[#0f1c38] to-[#0a1228]",
  },
  {
    name: "Spotify",
    description:
      "Search for music and podcasts, browse your library, and control playback.",
    category: "Productivity",
    gradient: "from-[#0f2a1c] via-[#0c2218] to-[#081610]",
  },
  {
    name: "Arc",
    description: "Navigate your open tabs or search through your browser history.",
    category: "Productivity",
    gradient: "from-[#2a1830] via-[#1e1224] to-[#120c18]",
  },
  {
    name: "TinyPNG",
    description: "Compress the selected images in Finder with TinyPNG.",
    category: "Productivity",
    gradient: "from-[#1a2030] via-[#141822] to-[#0c1018]",
  },
  {
    name: "1Password",
    description:
      "Easily grab any password or credential from your 1Password vaults.",
    category: "Productivity",
    gradient: "from-[#1c2438] via-[#141c2c] to-[#0c1420]",
  },
  {
    name: "JIRA",
    description:
      "Manage your JIRA issues and sprints without leaving your keyboard.",
    category: "Engineering",
    gradient: "from-[#1a2a44] via-[#142238] to-[#0c1628]",
  },
  {
    name: "Slack",
    description: "Set your presence, see unread messages and search your chats.",
    category: "Engineering",
    gradient: "from-[#2a1a30] via-[#201428] to-[#140c18]",
  },
  {
    name: "Zoom",
    description:
      "See your upcoming calls and jump straight into them from Raycast.",
    category: "Engineering",
    gradient: "from-[#142440] via-[#101c34] to-[#0a1424]",
  },
  {
    name: "Timers",
    description: "Start stopwatches and timers to keep track of your daily tasks.",
    category: "Engineering",
    gradient: "from-[#1c2030] via-[#141822] to-[#0c1018]",
  },
  {
    name: "Pomodoro",
    description:
      "Control pomodoro timers and see the current interval in the menu bar.",
    category: "Engineering",
    gradient: "from-[#301818] via-[#241212] to-[#180c0c]",
  },
  {
    name: "Notion",
    description: "The fastest way to search and create Notion pages.",
    category: "Design",
    gradient: "from-[#1a1a22] via-[#141418] to-[#0c0c10]",
    previewSrc: "/images/raycast/features/notion.13382e38.png",
  },
  {
    name: "Todoist",
    description: "Check your Todoist tasks and quickly create new ones",
    category: "Design",
    gradient: "from-[#301820] via-[#241418] to-[#180c10]",
  },
  {
    name: "Google Search",
    description: "Need to know something fast? Google it straight from Raycast.",
    category: "Design",
    gradient: "from-[#182030] via-[#121828] to-[#0c1018]",
  },
  {
    name: "Obsidian",
    description:
      "Capture information, manage tasks and pin notes to your menu bar.",
    category: "Writing",
    gradient: "from-[#2a1830] via-[#201228] to-[#140c1a]",
  },
  {
    name: "Google Chrome",
    description: "Search open tabs, bookmarks and history in Google Chrome.",
    category: "Writing",
    gradient: "from-[#301818] via-[#241212] to-[#180c0c]",
  },
  {
    name: "CleanShot X",
    description: "Trigger CleanShot X screen captures right from your keyboard.",
    category: "Writing",
    gradient: "from-[#182428] via-[#121c20] to-[#0c1418]",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Guillermo Rauch",
    handle: "@rauchg",
    role: "CEO, Vercel",
    avatarSrc: "/images/raycast/avatars/guillermo.1ede87e2.png",
    favoriteFeature: "AI Chat",
    quote: "Realtime knowledge, anywhere in your OS.",
  },
  {
    name: "Marques Brownlee",
    handle: "@MKBHD",
    role: "Creator, MKBHD",
    avatarSrc: "/images/raycast/avatars/mkbhd.3978890d.jpg",
  },
  {
    name: "Koen Bok",
    handle: "@koenbok",
    role: "Founder, Framer",
    avatarSrc: "/images/raycast/avatars/koen.6d1f621a.png",
  },
  {
    name: "Andreas Storm",
    handle: "@avstorm",
    role: "Designer & Iconograph",
    avatarSrc: "/images/raycast/avatars/avstorm.501925b2.jpeg",
  },
  {
    name: "Adam Wathan",
    handle: "@adamwathan",
    role: "Creator, Tailwind CSS",
    avatarSrc: "/images/raycast/avatars/adamwathan.7d406127.png",
  },
  {
    name: "Wes Bos",
    handle: "@wesbos",
    role: "Co-host, SyntaxFM",
    avatarSrc: "/images/raycast/avatars/wesbos.9d09a8a6.png",
  },
  {
    name: "Ridd",
    handle: "@ridd_design",
    role: "Creator, Dive Club",
    avatarSrc: "/images/raycast/avatars/ridd.33ab2cf2.png",
  },
  {
    name: "Max Stoiber",
    handle: "@mxstbr",
    role: "CEO, Stellate",
    avatarSrc: "/images/raycast/avatars/mxstbr.500c6710.png",
  },
  {
    name: "Zach Holman",
    handle: "@holman",
    role: "Angel Investor",
    avatarSrc: "/images/raycast/avatars/zachholman.4b5fe06c.png",
  },
  {
    name: "Ansub",
    handle: "@justansub",
    role: "Founding Engineer",
    avatarSrc: "/images/raycast/avatars/justansub.9b20ee4a.jpeg",
  },
  {
    name: "Kitze",
    handle: "@thekitze",
    role: "Founder",
    avatarSrc: "/images/raycast/avatars/thekitze.bf1fb689.jpeg",
  },
  {
    name: "Florian Kiem",
    handle: "@flornkm",
    role: "Design Engineer",
    avatarSrc: "/images/raycast/avatars/flornkm.80084690.jpeg",
  },
  {
    name: "Wojtek Witkowski",
    handle: "@pugson",
    role: "Design Engineer",
    avatarSrc: "/images/raycast/avatars/pugson.7221ae03.jpeg",
  },
  {
    name: "Steven Tey",
    handle: "@steventey",
    role: "Founder, Dub",
    avatarSrc: "/images/raycast/avatars/steventey.cf42b43e.jpeg",
  },
  {
    name: "Gavin Nelson",
    handle: "@gavmn",
    role: "Designer, OpenAI",
    avatarSrc: "/images/raycast/avatars/gavmn.0d1ce528.jpeg",
  },
];

export const automationCards: AutomationCard[] = [
  {
    title: "Snippets",
    description:
      "Tired of typing the same thing? Create a snippet and insert it by simply typing its keyword.",
    imageSrc: "/images/raycast/features/snippets-blue-glass.3f8eb367.png",
    wide: true,
  },
  {
    title: "Quicklinks",
    description:
      "Say goodbye to open tabs. Create quicklinks to launch anything from anywhere.",
    imageSrc: "/images/raycast/features/quicklinks-showcase.4179f21c.png",
  },
  {
    title: "Hotkeys and Aliases",
    description:
      "Speed up your workflow by assigning hotkeys or aliases to common commands or apps.",
  },
];

export const featureTiles: FeatureTile[] = [
  {
    title: "Notes",
    description: "It can take notes.",
    imageSrc: "/images/raycast/features/raycast-notes.d46cb687.png",
  },
  {
    title: "Flight Tracker",
    description: "Track your flights.",
    imageSrc: "/images/raycast/features/flight-tracker.41d98c94.png",
  },
  {
    title: "Translator",
    description: "Convert anything.",
    imageSrc: "/images/raycast/features/translator.5ac0ae60.png",
  },
  {
    title: "File Search",
    description: "Search files.",
    imageSrc: "/images/raycast/features/file-search.cc18c68b.png",
  },
  {
    title: "Script Commands",
    description: "Run scripts.",
    imageSrc: "/images/raycast/features/script-commands.9e5497a7.png",
  },
  {
    title: "Window Management",
    description: "Manage your windows.",
    imageSrc: "/images/raycast/features/window-management.42db743b.png",
  },
  {
    title: "Calendar",
    description: "Plan your day.",
    imageSrc: "/images/raycast/features/schedule.ff46670c.png",
  },
  {
    title: "Reminders",
    description: "Remind you of stuff.",
    imageSrc: "/images/raycast/features/reminders.68fbffbc.png",
  },
  {
    title: "Focus",
    description: "Stay in the zone.",
    imageSrc: "/images/raycast/features/focus.4af7b56f.png",
  },
  {
    title: "Emoji Picker",
    description: "Pick the perfect emoji.",
    imageSrc: "/images/raycast/features/emoji-picker.fd3ad392.png",
  },
  {
    title: "Calculator",
    description: "Do the math.",
    imageSrc: "/images/raycast/features/calculator.d0b6fc01.png",
  },
  {
    title: "Screenshot Search",
    description: "Find what you captured.",
    imageSrc: "/images/raycast/features/screenshot-search.bf4d4d93.png",
  },
];

export const aiFeatures: AiFeature[] = [
  {
    title: "Ask Anything, Anytime, Anywhere.",
    description:
      "Quick AI combines the power of AI with the web to answer any question.",
  },
  {
    title: "Always On ChatGPT.",
    description:
      "Stuck while coding? Need help writing an email? Meet your new virtual assistant.",
  },
  {
    title: "Your Automation Assistant.",
    description:
      "Create your own AI Commands to automate repetitive tasks and eliminate chores.",
  },
];

export const youtubeVideos: YoutubeVideo[] = [
  {
    title: "Introducing Raycast Focus",
    thumbSrc: "/images/raycast/youtube/yt-4Hi21ZpdrOc.jpg",
    href: "https://www.youtube.com/watch?v=4Hi21ZpdrOc",
  },
  {
    title: "Mastering Quicklinks in Raycast",
    thumbSrc: "/images/raycast/youtube/yt-6knS3y39f7k.jpg",
    href: "https://www.youtube.com/watch?v=6knS3y39f7k",
  },
  {
    title: "Raycast Notes is Finally Out",
    thumbSrc: "/images/raycast/youtube/yt-9KvmDCy23g0.jpg",
    href: "https://www.youtube.com/watch?v=9KvmDCy23g0",
  },
  {
    title: "Raycast AI",
    thumbSrc: "/images/raycast/youtube/yt-A4bewhG4724.jpg",
    href: "https://www.youtube.com/watch?v=A4bewhG4724",
  },
  {
    title: "Window Management",
    thumbSrc: "/images/raycast/youtube/yt-HDQIvbLCF7Y.jpg",
    href: "https://www.youtube.com/watch?v=HDQIvbLCF7Y",
  },
  {
    title: "Extensions",
    thumbSrc: "/images/raycast/youtube/yt-NZwqx_dS-k0.jpg",
    href: "https://www.youtube.com/watch?v=NZwqx_dS-k0",
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Store", href: "/store" },
      { label: "Pro", href: "/pro" },
      { label: "Teams", href: "/teams" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Browser Extension", href: "/browser-extension" },
      { label: "Developers", href: "/developers" },
      { label: "iOS", href: "/ios" },
      { label: "Windows", href: "/windows" },
      { label: "Raycast 2.0", href: "/new" },
      { label: "API Docs", href: "https://developers.raycast.com", external: true },
      { label: "Manual", href: "/manual" },
      { label: "Troubleshooting", href: "/troubleshooting" },
      { label: "Raycast vs Alfred", href: "/raycast-vs-alfred" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Core Features",
    links: [
      { label: "Raycast AI", href: "/core-features/ai" },
      { label: "Raycast Notes", href: "/core-features/notes" },
      { label: "Raycast Focus", href: "/core-features/focus" },
      { label: "Clipboard History", href: "/core-features/clipboard-history" },
      { label: "Window Management", href: "/core-features/window-management" },
      { label: "Snippets", href: "/core-features/snippets" },
      { label: "File Search", href: "/core-features/file-search" },
      { label: "Quicklinks", href: "/core-features/quicklinks" },
      { label: "Calculator", href: "/core-features/calculator" },
      { label: "Calendar", href: "/core-features/calendar" },
      { label: "System", href: "/core-features/system" },
      { label: "Emoji Picker", href: "/core-features/emoji-picker" },
    ],
  },
  {
    title: "Top Extensions",
    links: [
      { label: "Design Tools", href: "/store?category=Design" },
      { label: "Developer Tools", href: "/store?category=Developer+Tools" },
      { label: "Pomodoro Timer", href: "/store?q=pomodoro" },
      { label: "Productivity", href: "/store?category=Productivity" },
      { label: "Project Management", href: "/store?category=Project+Management" },
      { label: "Time Management", href: "/store?category=Time+Management" },
      { label: "Transcript", href: "/store?q=transcript" },
      { label: "Translation", href: "/store?q=translation" },
      { label: "Work From Home", href: "/store?category=Work+From+Home" },
      { label: "AI", href: "/store?category=AI" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Manifesto", href: "/manifesto" },
      { label: "Customers", href: "/customers" },
      { label: "Careers", href: "/careers" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Acceptable Use Policy", href: "/acceptable-use" },
      { label: "DPA", href: "/dpa" },
      { label: "Trust Center", href: "https://trust.raycast.com", external: true },
      { label: "Press Kit", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Community Stories", href: "/stories" },
      { label: "Ambassadors", href: "/ambassadors" },
      { label: "Slack", href: "/slack" },
      { label: "X/Twitter", href: "https://twitter.com/raycast", external: true },
      { label: "GitHub", href: "https://github.com/raycast", external: true },
      { label: "Dribbble", href: "https://dribbble.com/raycast", external: true },
    ],
  },
  {
    title: "By Raycast",
    links: [
      { label: "Glaze", href: "https://glaze.raycast.com", external: true },
      { label: "Try Raycast AI", href: "https://ray.so/ai", external: true },
      { label: "Explore Snippets", href: "https://ray.so/snippets", external: true },
      { label: "Explore Quicklinks", href: "https://ray.so/quicklinks", external: true },
      { label: "Prompts", href: "https://ray.so/prompts", external: true },
      { label: "Chat Presets", href: "https://ray.so/presets", external: true },
      { label: "ray.so", href: "https://ray.so", external: true },
      { label: "Icon Maker", href: "https://ray.so/icon", external: true },
      { label: "Merch", href: "https://raycast.com/store/merch", external: true },
      { label: "Wallpapers", href: "https://ray.so/wallpapers", external: true },
    ],
  },
];

export const featureDockItems = [
  {
    id: "clipboard",
    label: "Clipboard History",
    title: "Remember Everything.",
    caption:
      "Stop playing Clipboard ping pong - with Clipboard History you'll never forget anything.",
  },
  {
    id: "ai",
    label: "AI",
    title: "Be Curious.",
    caption:
      "Have a question? Why google it when you can just ask AI without leaving your keyboard?",
  },
  {
    id: "emoji",
    label: "Emoji & Symbols",
    title: "Express Yourself.",
    caption:
      "Search for emojis and symbols and paste them into any context.",
  },
  {
    id: "calculator",
    label: "Calculator",
    title: "Calculate Anything.",
    caption:
      "Convert currencies or units, calculate time differences and much more - all in natural language.",
  },
  {
    id: "window",
    label: "Window Management",
    title: "Tidy Up.",
    caption:
      "Resize and reorganize your focused window without touching your mouse.",
  },
] as const;
