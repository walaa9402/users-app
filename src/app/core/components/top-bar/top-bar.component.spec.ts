import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { AuthService } from '../../services/auth.service';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create a spy object for AuthService with a UserToken property
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      UserToken: null // Default to null to simulate logged-out state
    });

    await TestBed.configureTestingModule({
      imports: [TopBarComponent], // Import the standalone component
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return "login" when user is not logged in', () => {
    // Ensure the UserToken is null to simulate a logged-out state
    Object.defineProperty(authServiceSpy, 'UserToken', { get: () => null });
    fixture.detectChanges(); // Trigger change detection
    expect(component.mainActionText).toBe('login');
  });

  it('should return "enquire" when user is logged in', () => {
    // Simulate a valid login token
    Object.defineProperty(authServiceSpy, 'UserToken', { get: () => 'valid-token' });
    fixture.detectChanges(); // Trigger change detection
    expect(component.mainActionText).toBe('enquire');
  });
});
