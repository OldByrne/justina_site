import { Component, Input, OnDestroy } from '@angular/core';
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
export class NavComponent implements OnDestroy {
  @Input() activeSection = 'services';

  mobileMenuOpen = false;

  navLinks: NavLink[] = [
    { label: 'Services', sectionId: 'services' },
    { label: 'Work', sectionId: 'work' },
    { label: 'Experience', sectionId: 'experience' },
    { label: 'About', sectionId: 'about' },
  ];

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    this.closeMenu();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  isActive(sectionId: string): boolean {
    return this.activeSection === sectionId;
  }

  private closeMenu(): void {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}
