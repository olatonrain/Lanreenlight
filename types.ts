export interface NavItem {
    label: string;
    href: string;
}

export interface Stat {
    value: string;
    label: string;
    colorClass?: string;
}

export interface EAStats {
    label: string;
    value: string;
    valueColor?: string;
}

export interface ExpertAdvisor {
    id: number;
    name: string;
    description: string;
    type: string;
    typeColorClass: string;
    typeBgClass: string;
    iconClass: string;
    iconColorClass: string;
    stats: EAStats[];
    price: string;
    borderColorHover: string;
}

export interface ServiceItem {
    iconClass: string;
    iconColorClass: string;
    description: string;
}

export interface PartnerReason {
    iconClass: string;
    iconWrapperHoverBorder: string;
    iconColorClass: string;
    title: string;
    description: string;
}
