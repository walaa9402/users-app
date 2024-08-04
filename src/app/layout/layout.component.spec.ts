import { ComponentFixture, TestBed } from '@angular/core/testing';
import LayoutComponent from './layout.component';
import { AuthService } from '../core/services/auth.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      UserToken: null // Default to null to simulate logged-out state
    });

    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent          // Import the standalone component if used as such
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
