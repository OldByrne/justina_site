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

  it('should render a wheel item for each service', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.wheel-item');
    expect(items.length).toBe(component.serviceItems.length);
  });

  it('should mark the active wheel item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const active = compiled.querySelectorAll('.wheel-item--active');
    expect(active.length).toBe(1);
  });

  it('should update activeServiceIndex on selectService()', () => {
    component.selectService(0);
    expect(component.activeServiceIndex).toBe(0);
  });

  it('should return a transform style from wheelItemStyle()', () => {
    const style = component.wheelItemStyle(0);
    expect(style['transform']).toContain('rotateX');
  });
});
