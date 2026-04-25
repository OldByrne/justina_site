import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkComponent } from './work.component';

describe('WorkComponent', () => {
  let component: WorkComponent;
  let fixture: ComponentFixture<WorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have at least one work item', () => {
    expect(component.workItems.length).toBeGreaterThan(0);
  });

  it('should render a card for each work item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.work-card');
    expect(cards.length).toBe(component.workItems.length);
  });

  it('should not render any sentinel elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const sentinels = compiled.querySelectorAll('.card-sentinel');
    expect(sentinels.length).toBe(0);
  });

  it('should render the correct title for each work item', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = compiled.querySelectorAll('.work-title');
    titles.forEach((el, i) => {
      expect(el.textContent?.trim()).toBe(component.workItems[i].name);
    });
  });

  it('should apply increasing z-index to cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll<HTMLElement>('.work-card'));
    cards.forEach((card, i) => {
      expect(card.style.zIndex).toBe(String(i + 1));
    });
  });

  it('should show live CTA button for items with hasLiveLink', () => {
    const liveItems = component.workItems.filter(w => w.hasLiveLink);
    const compiled = fixture.nativeElement as HTMLElement;
    const liveBtns = compiled.querySelectorAll('.cta-btn--live');
    expect(liveBtns.length).toBe(liveItems.length);
  });

  it('should show globe icon for items without live link', () => {
    const noLiveItems = component.workItems.filter(w => !w.hasLiveLink);
    const compiled = fixture.nativeElement as HTMLElement;
    const globes = compiled.querySelectorAll('.cta-globe');
    expect(globes.length).toBe(noLiveItems.length);
  });

  it('should not have any .work-item-wrapper elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const wrappers = compiled.querySelectorAll('.work-item-wrapper');
    expect(wrappers.length).toBe(0);
  });

  it('should not apply blur/scale to cards at page load', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = Array.from(compiled.querySelectorAll<HTMLElement>('.work-card'));
    cards.forEach(card => {
      expect(card.style.filter).toBe('');
      expect(card.style.transform).toBe('');
    });
  });
});
