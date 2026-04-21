import { Component, HostListener, OnInit } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { WorkComponent } from './components/work/work.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { AboutComponent } from './components/about/about.component';

const SECTIONS = ['services', 'work', 'experience', 'about'] as const;
type Section = typeof SECTIONS[number];

// Light lilac target: #f0ebff → rgb(240, 235, 255)
const LILAC: [number, number, number] = [240, 235, 255];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, HeroComponent, WorkComponent, ExperienceComponent, AboutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  activeSection: Section = 'services';
  bgColor = '#ffffff';

  ngOnInit(): void {
    this.tick();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.tick();
  }

  private tick(): void {
    this.updateActiveSection();
    this.updateBg();
  }

  private updateActiveSection(): void {
    const threshold = window.innerHeight * 0.35;
    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const el = document.getElementById(SECTIONS[i]);
      if (el && el.getBoundingClientRect().top <= threshold) {
        this.activeSection = SECTIONS[i];
        return;
      }
    }
    this.activeSection = 'services';
  }

  private updateBg(): void {
    const vh = window.innerHeight;
    const workTop = document.getElementById('work')?.getBoundingClientRect().top ?? vh;
    const expTop = document.getElementById('experience')?.getBoundingClientRect().top ?? vh;

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    // t goes 0→1 as Work enters the viewport, then 1→0 as Experience enters
    const t = clamp(clamp((vh - workTop) / vh) - clamp((vh - expTop) / vh));

    const r = Math.round(255 - (255 - LILAC[0]) * t);
    const g = Math.round(255 - (255 - LILAC[1]) * t);
    const b = Math.round(255 - (255 - LILAC[2]) * t);
    this.bgColor = `rgb(${r},${g},${b})`;
  }
}
