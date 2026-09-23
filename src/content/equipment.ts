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

const placeholder = (label: string, w = 320, h = 320) =>
    `https://placehold.co/${w}x${h}/171717/525252/webp?text=${encodeURIComponent(label)}`;

export const pcBuild: PCBuild = {
    name: "Main rig",
    tagline: "Custom build — daily driver for dev and gaming.",
    image: placeholder("Main+Rig", 960, 480),
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
                name: "Pixio PX277P",
                detail: "27\" · 1440p · 165Hz",
                note: "Primary — code + games",
                image: placeholder("Pixio+PX277P"),
            },
            {
                name: "Pixio PX277P",
                detail: "27\" · 1440p · 165Hz",
                note: "Secondary — reference & docs (matched pair)",
                image: placeholder("Pixio+PX277P"),
            },
        ],
    },
    {
        id: "peripherals",
        title: "Peripherals",
        items: [
            {
                name: "Tecware Phantom RGB",
                detail: "TKL · wired mechanical",
                note: "Daily driver",
                image: placeholder("Tecware+Phantom"),
            },
        ],
    },
    {
        id: "audio",
        title: "Audio & Streaming",
        items: [
            {
                name: "Sennheiser HD 6XX",
                detail: "Open-back headphones",
                image: placeholder("HD+6XX"),
            },
            {
                name: "Shure SM7B",
                detail: "Dynamic broadcast mic",
                note: "Cloudlifter CL-1 in the chain",
                image: placeholder("Shure+SM7B"),
            },
            {
                name: "Focusrite Scarlett 2i2 (4th gen)",
                detail: "USB audio interface",
                image: placeholder("Scarlett+2i2"),
            },
        ],
    },
    {
        id: "mobile",
        title: "Mobile & Portable",
        items: [
            {
                name: "MacBook Pro 14\" (M3 Pro)",
                detail: "18 GB · 1 TB",
                note: "Travel + on-the-go dev",
                image: placeholder("MBP+14"),
            },
            {
                name: "iPhone 15 Pro",
                detail: "Personal · daily driver",
                image: placeholder("iPhone+15+Pro"),
            },
            {
                name: "iPad Air (M2)",
                detail: "Notes and reading",
                image: placeholder("iPad+Air"),
            },
        ],
    },
    {
        id: "capture",
        title: "Capture",
        items: [
            {
                name: "Sony ZV-E10",
                detail: "APS-C mirrorless",
                note: "Sigma 16mm f/1.4",
                image: placeholder("Sony+ZV-E10"),
            },
            {
                name: "DJI Mini 3 Pro",
                detail: "Drone",
                image: placeholder("DJI+Mini+3"),
            },
        ],
    },
    {
        id: "desk",
        title: "Desk",
        items: [
            {
                name: "IKEA Bekant · Standing",
                detail: "160 × 80 cm",
                image: placeholder("Bekant"),
            },
            {
                name: "Herman Miller Aeron",
                detail: "Size B · remastered",
                image: placeholder("Aeron"),
            },
        ],
    },
];
