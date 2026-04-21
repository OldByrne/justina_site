import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on the first testimonial', () => {
    expect(component.currentTestimonial).toBe(0);
  });

  it('should advance testimonial on next()', () => {
    component.next();
    expect(component.currentTestimonial).toBe(1);
  });

  it('should wrap around to last on prev() from first', () => {
    component.currentTestimonial = 0;
    component.prev();
    expect(component.currentTestimonial).toBe(component.testimonials.length - 1);
  });

  it('should wrap around to first on next() from last', () => {
    component.currentTestimonial = component.testimonials.length - 1;
    component.next();
    expect(component.currentTestimonial).toBe(0);
  });

  it('should return the active testimonial object', () => {
    component.currentTestimonial = 1;
    expect(component.activeTestimonial).toBe(component.testimonials[1]);
  });

  it('should render the headline', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headline = compiled.querySelector('.headline');
    expect(headline?.textContent).toContain('Justina');
  });

  it('should render service highlights', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const tags = compiled.querySelectorAll('.service-tag');
    expect(tags.length).toBe(component.serviceHighlights.length);
  });

  it('should have at least one featured service', () => {
    const featured = component.serviceHighlights.filter(s => s.featured);
    expect(featured.length).toBeGreaterThan(0);
  });
});
