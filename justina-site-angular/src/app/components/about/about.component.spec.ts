import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an email address', () => {
    expect(component.email).toBeTruthy();
    expect(component.email).toContain('@');
  });

  it('should have exactly 3 photos', () => {
    expect(component.photos.length).toBe(3);
  });

  it('should render 3 mobile photo placeholders', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const mobilPhotos = compiled.querySelectorAll('.photo-placeholder-mobile');
    expect(mobilPhotos.length).toBe(3);
  });

  it('should render the desktop single photo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const desktopPhoto = compiled.querySelector('.about-photo-desktop .photo-placeholder');
    expect(desktopPhoto).toBeTruthy();
  });

  it('should display the email in the contact block', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const emailDisplay = compiled.querySelector('.email-display');
    expect(emailDisplay?.textContent).toContain(component.email);
  });

  it('should have a book a call link', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bookBtn = compiled.querySelector('.book-btn');
    expect(bookBtn?.textContent?.trim()).toContain('Book a Call');
  });

  it('should have a section title of "About me"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.section-title');
    expect(title?.textContent?.trim()).toBe('About me');
  });

  it('should call clipboard API on copyEmail', () => {
    const clipboardSpy = spyOn(navigator.clipboard, 'writeText').and.returnValue(
      Promise.resolve()
    );
    component.copyEmail();
    expect(clipboardSpy).toHaveBeenCalledWith(component.email);
  });
});
