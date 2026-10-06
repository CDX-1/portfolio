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
    tagline: "Custom build — daily driver for dev and gaming.",
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
                note: "Primary — code + games",
                image: "/equipment/px277.png",
            },
            {
                name: "Pixio PX277",
                detail: '27" · 1440p · 144Hz',
                note: "Secondary — reference & docs (matched pair)",
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
];
