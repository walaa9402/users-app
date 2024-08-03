import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';
import { LoaderService } from './core/services/loader.service';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let loaderServiceSpy: jasmine.SpyObj<LoaderService>;
  let requestCountSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    // Create a BehaviorSubject to simulate loader state
    requestCountSubject = new BehaviorSubject<number>(0);

    loaderServiceSpy = jasmine.createSpyObj('LoaderService', [], {
      requestCount$: requestCountSubject.asObservable()
    });

    await TestBed.configureTestingModule({
      imports: [RouterOutlet, AppComponent],
      providers: [
        { provide: LoaderService, useValue: loaderServiceSpy },
        ChangeDetectorRef // Provide ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLoading to true when requestCount$ emits a value greater than 0', () => {
    requestCountSubject.next(1); // Simulate loader active
    expect(component.isLoading).toBeTrue();
  });

  it('should set isLoading to false when requestCount$ emits 0', () => {
    requestCountSubject.next(0); // Simulate no loader
    expect(component.isLoading).toBeFalse();
  });

  it('should call detectChanges when requestCount$ changes', () => {
    const detectChangesSpy = spyOn(component.cd, 'detectChanges');
    requestCountSubject.next(2); // Simulate loader active
    expect(detectChangesSpy).toHaveBeenCalled();
  });
});
