import { TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { AuthService } from '../../services/auth.service';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['UserToken']);

    TestBed.configureTestingModule({
      imports: [TopBarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    const fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return "login" when user is not logged in', () => {
    authService.UserToken = null;
    expect(component.mainActionText).toBe('login');
  });

  it('should return "enquire" when user is logged in', () => {
    authService.UserToken = 'valid-token';
    expect(component.mainActionText).toBe('enquire');
  });
});
