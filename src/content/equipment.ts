export type EquipmentSpec = {
    label: string;
    value: string;
};

export type EquipmentItem = {
    name: string;
    detail?: string;
    note?: string;
    link?: string;
    image?: string;
};

export type EquipmentCategory = {
    id: string;
    title: string;
    description?: string;
    items: EquipmentItem[];
};

export type PCBuild = {
    name: string;
    tagline?: string;
    image?: string;
    specs: EquipmentSpec[];
};

export const pcBuild: PCBuild = {
    name: "Main rig",
    tagline: "My own build, for dev and gaming.",
    image: "/equipment/rig.jpg",
    specs: [
        { label: "CPU", value: "Intel Core i7-12700F · 12C / 20T" },
        { label: "GPU", value: "ASUS TUF RTX 3080 OC · 12 GB LHR" },
        { label: "RAM", value: "32 GB DDR4-3200 CL16 · T-Force Vulcan Z" },
        { label: "Storage", value: "2 TB NVMe · Silicon Power P34A60" },
        { label: "Motherboard", value: "MSI PRO B660M-A DDR4 · mATX" },
        { label: "PSU", value: "Corsair RM850 · 850W 80+ Gold" },
        { label: "Cooling", value: "Deepcool AK620 · dual-tower air" },
        { label: "Case", value: "Fractal Design Focus 2" },
        { label: "OS", value: "Windows 11 Home" },
    ],
};

export const equipment: EquipmentCategory[] = [
    {
        id: "displays",
        title: "Displays",
        items: [
            {
                name: "Pixio PX277",
                detail: '27" · 1440p · 144Hz',
                note: "Primary, for code and games",
                image: "/equipment/px277.png",
            },
            {
                name: "Pixio PX277",
                detail: '27" · 1440p · 144Hz',
                note: "Secondary, for reference and docs",
                image: "/equipment/px277.png",
            },
        ],
    },
    {
        id: "peripherals",
        title: "Peripherals",
        items: [
            {
                name: "Keychron K8",
                detail: "TKL · wireless mechanical",
                note: "Daily driver",
                image: "/equipment/kk8.png",
            },
        ],
    },
    {
        id: "audio",
        title: "Audio & Streaming",
        items: [
            {
                name: "Razer Seiren X",
                detail: "USB condenser mic",
                image: "/equipment/seirenx.png",
            },
        ],
    },
    {
        id: "mobile",
        title: "Mobile & Portable",
        items: [
            {
                name: "MacBook Pro (M1 Pro, 2021)",
                detail: "8 GB · 256 GB",
                note: "Travel + on-the-go dev",
                image: "/equipment/m1.png",
            },
            {
                name: "iPhone 14",
                detail: "Personal · daily driver",
                image: "/equipment/iphone14.png",
            },
        ],
    },
    {
        id: "printing",
        title: "3D Printing",
        items: [
            {
                name: "Bambu Lab P1S",
                detail: "Enclosed CoreXY",
                note: "Paired with an AMS Pro for multi-color prints",
                image: "/equipment/p1swams.png",
            },
        ],
    },
    {
        id: "software",
        title: "Software",
        items: [
            {
                name: "Cursor",
                detail: "Editor",
                note: "Main text editor",
                link: "https://cursor.com",
                image: "/equipment/cursor.png",
            },
            {
                name: "IntelliJ IDEA",
                detail: "IDE",
                note: "For anything on the JVM",
                link: "https://www.jetbrains.com/idea/",
                image: "/equipment/intellij.png",
            },
            {
                name: "KiCad",
                detail: "EDA",
                note: "Schematics and PCB layout",
                link: "https://www.kicad.org",
                image: "/equipment/kicad.png",
            },
            {
                name: "Fusion 360",
                detail: "CAD",
                note: "Mechanical CAD for everything that isn't a PCB",
                link: "https://www.autodesk.com/products/fusion-360/",
                image: "/equipment/fusion360.png",
            },
            {
                name: "Claude",
                detail: "Agent",
                note: "Main coding agent, alongside Codex",
                link: "https://claude.ai",
                image: "/equipment/claude.png",
            },
            {
                name: "Codex",
                detail: "Agent",
                note: "Main coding agent, alongside Claude",
                link: "https://openai.com/codex/",
                image: "/equipment/codex.png",
            },
            {
                name: "Dia",
                detail: "Browser",
                note: "On the MacBook",
                link: "https://www.diabrowser.com",
                image: "/equipment/dia.png",
            },
            {
                name: "Zen",
                detail: "Browser",
                note: "On the PC",
                link: "https://zen-browser.app",
                image: "/equipment/zen.png",
            },
        ],
    },
];
