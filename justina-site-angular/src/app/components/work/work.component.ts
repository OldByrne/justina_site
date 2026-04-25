import {
  AfterViewInit,
  Component,
  HostListener,
  OnDestroy,
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
}

const STICKY_TOP = 80; // must match $sticky-top in work.component.scss

type AnimEntry = { card: HTMLElement; startY: number; travelPx: number };

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements AfterViewInit, OnDestroy {
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
    },
  ];

  private animData: AnimEntry[] = [];
  private scrollListener!: () => void;

  ngAfterViewInit(): void {
    // Double rAF: first frame finishes Angular's render, second gives the browser time to lay out
    requestAnimationFrame(() => requestAnimationFrame(() => this.setup()));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollListener);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.setup();
  }

  // Traverse offsetParent chain for absolute document top — immune to scroll position and sticky state.
  private docTop(el: HTMLElement): number {
    let top = 0;
    let cur: HTMLElement | null = el;
    while (cur) { top += cur.offsetTop; cur = cur.offsetParent as HTMLElement | null; }
    return top;
  }

  private setup(): void {
    const cards = this.workCardRefs.toArray();
    if (!cards.length) return;

    // startY: scroll position where card i+1 first overlaps card i's bottom.
    // travelPx: scroll distance until card i+1 fully covers card i (= card i's height).
    this.animData = cards.slice(0, -1).map((ref, i) => {
      const card = ref.nativeElement;
      const nextDocTop = this.docTop(cards[i + 1].nativeElement);
      const cardHeight = card.offsetHeight;
      return { card, startY: nextDocTop - STICKY_TOP - cardHeight, travelPx: cardHeight };
    });

    if (this.scrollListener) window.removeEventListener('scroll', this.scrollListener);
    this.scrollListener = () => this.tick();
    window.addEventListener('scroll', this.scrollListener, { passive: true });
    this.tick();
  }

  private tick(): void {
    const sy = window.scrollY;
    this.animData.forEach(({ card, startY, travelPx }) => {
      const p = Math.max(0, Math.min(1, (sy - startY) / travelPx));
      if (p === 0) {
        card.style.transform = card.style.filter = card.style.opacity = '';
      } else {
        card.style.transform = `scale(${1 - 0.05 * p})`;
        card.style.filter = `blur(${8 * p}px)`;
        card.style.opacity = String(1 - p);
      }
    });
  }
}
