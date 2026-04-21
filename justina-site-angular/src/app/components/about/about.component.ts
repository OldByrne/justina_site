import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Photo {
  alt: string;
  bgColor: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  email = 'hello@justina.design';
  calLink = '#';

  photos: Photo[] = [
    { alt: 'Justina at a design conference', bgColor: '#d4a373', label: 'At work' },
    { alt: 'Justina in her studio', bgColor: '#8d99ae', label: 'Studio' },
    { alt: 'Justina with her dog', bgColor: '#b7c4cf', label: 'Off duty' },
  ];

  copyEmail(): void {
    navigator.clipboard.writeText(this.email).catch(() => {
      // fallback: silently fail if clipboard API unavailable
    });
  }
}
