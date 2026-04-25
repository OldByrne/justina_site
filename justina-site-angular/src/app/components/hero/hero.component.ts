import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface ServiceItem {
  label: string;
  description: string;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = [
    {
      name: 'Alex Chen',
      role: 'Founder',
      company: 'Nexus AI',
      quote: '"Justina joined us before we had a product. She scoped it, designed every flow, and shipped it with the team. The product we have today is because she owned it end to end from day one."',
    },
    {
      name: 'Maria Santos',
      role: 'CEO',
      company: 'Flowpoint',
      quote: '"Rare to find a designer who can hold a complex technical system in their head while still sweating every detail of the user experience. Justina does both without effort."',
    },
    {
      name: 'James Okafor',
      role: 'CTO',
      company: 'Stackline',
      quote: '"Our engineers loved working with Justina. She understood constraints, collaborated deeply on architecture decisions, and her specs were always implementation-ready."',
    },
  ];

  serviceItems: ServiceItem[] = [
    { label: 'Product strategy',    description: 'I work with founders to define what to build first, what to cut, and how to sequence decisions before a line of code is written.' },
    { label: 'User research',       description: 'I run the research — interviews, usability tests, and synthesis — and connect it directly to design decisions.' },
    { label: 'Fundraising support', description: 'Decks, prototypes, and design narratives that help early teams raise from investors who need to see the vision.' },
    { label: 'Eng partnership',     description: 'I collaborate with engineers from sprint planning to QA. They don\'t get a spec thrown over a wall.' },
    { label: 'Business analysis',   description: 'I map the flows, find where things break or slow down, and propose fixes with the data to back them up.' },
    { label: '0→1 product design',  description: 'End-to-end design ownership from blank canvas to shipped product, including systems, components, and documentation.' },
    { label: 'Generative AI',       description: 'Designing interfaces for AI-native products — where the output is unpredictable and the UX has to earn trust fast.' },
  ];

  activeServiceIndex = 3;
  currentTestimonial = 0;
  private autoPlayTimer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    clearInterval(this.autoPlayTimer);
  }

  selectService(index: number): void {
    this.activeServiceIndex = index;
  }

  wheelItemStyle(index: number): Record<string, string> {
    const delta = index - this.activeServiceIndex;
    const absD = Math.abs(delta);
    return {
      transform: `translateY(${delta * 40}px) rotateX(${delta * 20}deg)`,
      opacity: String(Math.max(0.12, 1 - absD * 0.22)),
      filter: absD > 0 ? `blur(${Math.min(absD * 2, 8)}px)` : 'none',
    };
  }

  prev(): void { this.navigate(-1); }
  next(): void { this.navigate(1); }

  get activeTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonial];
  }

  private navigate(delta: number): void {
    const n = this.testimonials.length;
    this.currentTestimonial = (this.currentTestimonial + delta + n) % n;
    clearInterval(this.autoPlayTimer);
    this.startAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => this.navigate(1), 5000);
  }
}
