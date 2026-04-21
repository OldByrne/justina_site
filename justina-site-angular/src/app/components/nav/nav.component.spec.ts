import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all nav links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('.nav-link');
    expect(links.length).toBe(component.navLinks.length);
  });

  it('should mark the active section link as active', () => {
    component.activeSection = 'work';
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const activeLink = compiled.querySelector('.nav-link.active');
    expect(activeLink?.textContent?.trim()).toBe('Work');
  });

  it('should toggle mobile menu on hamburger click', () => {
    expect(component.mobileMenuOpen).toBeFalse();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBeTrue();
    component.toggleMobileMenu();
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('should close mobile menu when active section changes', () => {
    component.mobileMenuOpen = true;
    component.activeSection = 'about';
    component.ngOnChanges({
      activeSection: {
        currentValue: 'about',
        previousValue: 'work',
        firstChange: false,
        isFirstChange: () => false,
      }
    });
    expect(component.mobileMenuOpen).toBeFalse();
  });

  it('should report correct active state', () => {
    component.activeSection = 'experience';
    expect(component.isActive('experience')).toBeTrue();
    expect(component.isActive('work')).toBeFalse();
  });
});
