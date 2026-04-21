import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExperienceComponent } from './experience.component';

describe('ExperienceComponent', () => {
  let component: ExperienceComponent;
  let fixture: ComponentFixture<ExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list item for each experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.experience-item');
    expect(items.length).toBe(component.experiences.length);
  });

  it('should display the role for each experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const roles = compiled.querySelectorAll('.exp-role');
    roles.forEach((el, i) => {
      expect(el.textContent?.trim()).toBe(component.experiences[i].role);
    });
  });

  it('should display the correct logo letter for each experience', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logos = compiled.querySelectorAll('.exp-logo');
    logos.forEach((el, i) => {
      expect(el.textContent?.trim()).toBe(component.experiences[i].logoLetter);
    });
  });

  it('should apply a background color to logos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logos = Array.from(compiled.querySelectorAll<HTMLElement>('.exp-logo'));
    logos.forEach(el => {
      expect(el.style.background).toBeTruthy();
    });
  });

  it('should have a section title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.section-title');
    expect(title?.textContent?.trim()).toBe('Experience');
  });

  it('should have at least 4 experience items', () => {
    expect(component.experiences.length).toBeGreaterThanOrEqual(4);
  });
});
