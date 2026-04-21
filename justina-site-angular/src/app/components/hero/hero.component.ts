import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface ServiceHighlight {
  label: string;
  featured?: boolean;
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

  serviceHighlights: ServiceHighlight[] = [
    { label: 'Product strategy' },
    { label: 'User research' },
    { label: 'MVP scoping' },
    { label: 'QA ownership', featured: true },
    { label: 'Design systems' },
    { label: 'Prototyping' },
  ];

  currentTestimonial = 0;
  private autoPlayInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  prev(): void {
    this.stopAutoPlay();
    this.currentTestimonial =
      (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    this.startAutoPlay();
  }

  next(): void {
    this.stopAutoPlay();
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    this.startAutoPlay();
  }

  get activeTestimonial(): Testimonial {
    return this.testimonials[this.currentTestimonial];
  }
}
