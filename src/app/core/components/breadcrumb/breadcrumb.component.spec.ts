import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadcrumbComponent } from './breadcrumb.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

// Mock interface for breadcrumb items
interface IBreadcrumbItem {
  label: string;
  link: string;
}

// Mock child component for testing purposes
@Component({
  selector: 'app-breadcrumb',
  template: `<ng-content></ng-content>`,
})
class MockBreadcrumbComponent {
  @Input({ required: true }) breadcrumbItems!: IBreadcrumbItem[];
}

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  const mockBreadcrumbItems: IBreadcrumbItem[] = [
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: 'Shoes', link: '/products/shoes' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbComponent], // Import the standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept breadcrumb items as input', () => {
    component.breadcrumbItems = mockBreadcrumbItems;
    fixture.detectChanges();

    expect(component.breadcrumbItems.length).toBe(3);
    expect(component.breadcrumbItems[0].label).toBe('Home');
    expect(component.breadcrumbItems[1].link).toBe('/products');
  });

  it('should render breadcrumb items correctly', () => {
    component.breadcrumbItems = mockBreadcrumbItems;
    fixture.detectChanges();

    const breadcrumbElements = fixture.debugElement.queryAll(By.css('.breadcrumb_item'));
    expect(breadcrumbElements.length).toBe(3);

    expect(breadcrumbElements[0].nativeElement.textContent).toContain('Home');
    expect(breadcrumbElements[1].nativeElement.textContent).toContain('Products');
    expect(breadcrumbElements[2].nativeElement.textContent).toContain('Shoes');
  });
});
