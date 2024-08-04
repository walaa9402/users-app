import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { AuthService } from '../../services/auth.service';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      UserToken: null
    });

    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
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
    Object.defineProperty(authServiceSpy, 'UserToken', { get: () => null });
    fixture.detectChanges();
    expect(component.mainActionText).toBe('login');
  });

  it('should return "enquire" when user is logged in', () => {
    Object.defineProperty(authServiceSpy, 'UserToken', { get: () => 'valid-token' });
    fixture.detectChanges();
    expect(component.mainActionText).toBe('enquire');
  });
});
