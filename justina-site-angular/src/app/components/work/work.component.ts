import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  QueryList,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WorkItem {
  id: number;
  name: string;
  tagline: string;
  period: string;
  ctaLabel: string;
  ctaLink: string;
  hasLiveLink: boolean;
  gradient: string;
  mockBgColor: string;
}

const STICKY_TOP = 80;
// How far (in px) past the sticky line the scroll must travel for blur to reach 100%.
const BLUR_TRAVEL_PX = 260;

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('workCard') workCardRefs!: QueryList<ElementRef<HTMLElement>>;

  workItems: WorkItem[] = [
    {
      id: 1,
      name: 'Nova Analytics',
      tagline: 'Building AI-powered insights for growth teams',
      period: "'23 – Present",
      ctaLabel: 'Explore Live',
      ctaLink: '#',
      hasLiveLink: true,
      gradient: 'linear-gradient(145deg, #e8f0fe, #d2e3fc)',
      mockBgColor: '#e8f0fe',
    },
    {
      id: 2,
      name: 'Flowdesk',
      tagline: 'Redesigning enterprise workflow automation',
      period: "'22 – '23",
      ctaLabel: 'Read Case Study',
      ctaLink: '#',
      hasLiveLink: false,
      gradient: 'linear-gradient(145deg, #f0fdf4, #dcfce7)',
      mockBgColor: '#f0fdf4',
    },
    {
      id: 3,
      name: 'Pulse Health',
      tagline: 'Consumer app for longitudinal health tracking',
      period: "'21 – '22",
      ctaLabel: 'Read Case Study',
      ctaLink: '#',
      hasLiveLink: false,
      gradient: 'linear-gradient(145deg, #fdf4ff, #fae8ff)',
      mockBgColor: '#fdf4ff',
    },
    {
      id: 4,
      name: 'Bridgepoint',
      tagline: 'No-code builder for complex B2B onboarding',
      period: "'20 – '21",
      ctaLabel: 'Read Case Study',
      ctaLink: '#',
      hasLiveLink: false,
      gradient: 'linear-gradient(145deg, #fff7ed, #ffedd5)',
      mockBgColor: '#fff7ed',
    },
  ];

  // Maps card index → the scrollY at which its next card first crossed the sticky line.
  // Cleared when the next card scrolls back above the sticky line.
  private readonly triggerScrollY = new Map<number, number>();

  private scrollListener = () => this.tick();

  ngOnInit(): void {
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  ngAfterViewInit(): void {
    this.tick();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.triggerScrollY.clear();
    this.tick();
  }

  private tick(): void {
    const cards = this.workCardRefs?.toArray();
    if (!cards?.length) return;

    const scrollY = window.scrollY;

    cards.forEach((ref, i) => {
      const card = ref.nativeElement;

      // Last card is never buried — always pristine.
      if (i >= cards.length - 1) {
        this.clearCard(card);
        return;
      }

      const nextTop = cards[i + 1].nativeElement.getBoundingClientRect().top;

      if (nextTop > STICKY_TOP) {
        // Next card hasn't reached the sticky line yet.
        // If we had a trigger recorded (user scrolled back up), clear it.
        this.triggerScrollY.delete(i);
        this.clearCard(card);
        return;
      }

      // Next card has reached or passed the sticky line.
      // Record the scrollY the very first time we observe this.
      if (!this.triggerScrollY.has(i)) {
        this.triggerScrollY.set(i, scrollY);
      }

      const trigger = this.triggerScrollY.get(i)!;
      const progress = Math.max(0, Math.min(1, (scrollY - trigger) / BLUR_TRAVEL_PX));

      card.style.transform = `scale(${1 - 0.05 * progress})`;
      card.style.filter = `blur(${8 * progress}px)`;
      card.style.opacity = String(1 - 0.25 * progress);
    });
  }

  private clearCard(card: HTMLElement): void {
    card.style.transform = '';
    card.style.filter = '';
    card.style.opacity = '';
  }
}
