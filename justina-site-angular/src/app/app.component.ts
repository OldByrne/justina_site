import { Component, HostListener, OnInit } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { WorkComponent } from './components/work/work.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { AboutComponent } from './components/about/about.component';

const SECTIONS = ['services', 'work', 'experience', 'about'] as const;
type Section = typeof SECTIONS[number];

const LILAC:  [number, number, number] = [240, 235, 255]; // #f0ebff — services
const YELLOW: [number, number, number] = [254, 252, 232]; // #fefce8 — experience

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
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const fade = (id: string) =>
      clamp((vh - (document.getElementById(id)?.getBoundingClientRect().top ?? vh)) / vh);

    // Services = lilac, fades to white as Work enters
    const tLilac = 1 - fade('work');
    // Experience = yellow, fades in as Experience enters, back to white as About enters
    const tYellow = clamp(fade('experience') - fade('about'));

    const mix = (l: number, y: number) =>
      Math.round(255 + (l - 255) * tLilac + (y - 255) * tYellow);
    this.bgColor = `rgb(${mix(LILAC[0], YELLOW[0])},${mix(LILAC[1], YELLOW[1])},${mix(LILAC[2], YELLOW[2])})`;
  }
}
