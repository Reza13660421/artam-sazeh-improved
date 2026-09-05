export interface Slide {
    id: number;
    title: string;
    kicker?: string;
    desc?: string;
    manager?: string;
    btn1Text?: string;
    btn1Link?: string;
    btn2Text?: string;
    btn2Link?: string;
    image?: string;
    order?: number;
    active?: boolean;
}

export interface Project {
    id: number;
    name: string;
    location: string;
    status: string;
    progress: number;
    image?: string;
    description?: string;
}

export interface Service {
    id: number;
    title: string;
    icon: string;
    desc: string;
}

export interface Testimonial {
    id: number;
    name: string;
    title: string;
    text: string;
    status: 'pending' | 'approved' | 'rejected';
    rating: number;
    date?: string;
}

export interface Blog {
    id: number;
    title: string;
    category: string;
    date: string;
    content?: string;
}

export interface Settings {
    brand: string;
    subBrand: string;
    phone: string;
    email: string;
    address: string;
    footer: string;
}

export interface Consultation {
    id: number;
    name: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read';
}

export interface Admin {
    id: number;
    fullName: string;
    username: string;
    password: string;
    role: 'full' | 'content';
    phone: string;
    permissions: string[];
}

export interface AppData {
    slides: Slide[];
    projects: Project[];
    services: Service[];
    testimonials: Testimonial[];
    blogs: Blog[];
    settings: Settings;
    consultations: Consultation[];
    admins: Admin[];
}