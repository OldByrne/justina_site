import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavLink {
  label: string;
  sectionId: string;
}

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnChanges {
  @Input() activeSection = 'services';

  mobileMenuOpen = false;

  navLinks: NavLink[] = [
    { label: 'Services', sectionId: 'services' },
    { label: 'Work', sectionId: 'work' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'About', sectionId: 'about' },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeSection'] && this.mobileMenuOpen) {
      this.mobileMenuOpen = false;
    }
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }
}
