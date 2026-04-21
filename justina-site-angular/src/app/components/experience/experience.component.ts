import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  logoLetter: string;
  logoColor: string;
  logoBg: string;
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences: ExperienceItem[] = [
    {
      id: 1,
      role: 'Founding Product Designer',
      company: 'Nova Analytics',
      period: '2023 – Present',
      description:
        'Joined pre-product. Designed every flow from first prototype to current analytics platform. Built design system, led user research, and shipped alongside engineering.',
      logoLetter: 'N',
      logoColor: '#fff',
      logoBg: '#1a1aff',
    },
    {
      id: 2,
      role: 'Senior Product Designer',
      company: 'Flowdesk',
      period: '2022 – 2023',
      description:
        'Hired to redesign the core product. Reworked primary flows, rebuilt the visual language, and introduced a design system the team still uses.',
      logoLetter: 'F',
      logoColor: '#fff',
      logoBg: '#16a34a',
    },
    {
      id: 3,
      role: 'Founding Product Designer',
      company: 'Pulse Health',
      period: '2021 – 2022',
      description:
        'Founding designer through seed round. Redesigned the core health-tracking product and introduced research practices that shaped how the team builds.',
      logoLetter: 'P',
      logoColor: '#fff',
      logoBg: '#9333ea',
    },
    {
      id: 4,
      role: 'Founding Product Designer',
      company: 'Bridgepoint',
      period: '2020 – 2021',
      description:
        'YC W21. Designed the no-code builder UX, ran customer discovery, and shipped the core feature: a visual workflow canvas with conditional logic.',
      logoLetter: 'B',
      logoColor: '#fff',
      logoBg: '#ea580c',
    },
    {
      id: 5,
      role: 'Senior UX Designer',
      company: 'Meridian Software',
      period: '2017 – 2020',
      description:
        'Led design on a B2B SaaS platform. Built the design system (40% faster builds). Managed two junior designers and redesigned the core product in under 6 months.',
      logoLetter: 'M',
      logoColor: '#fff',
      logoBg: '#0891b2',
    },
    {
      id: 6,
      role: 'UX Designer',
      company: 'Artefact Studio',
      period: '2015 – 2017',
      description:
        'Agency work across fintech, healthcare, and e-commerce. Shipped web products for 8 clients with cross-functional teams across design and engineering.',
      logoLetter: 'A',
      logoColor: '#fff',
      logoBg: '#475569',
    },
  ];
}
