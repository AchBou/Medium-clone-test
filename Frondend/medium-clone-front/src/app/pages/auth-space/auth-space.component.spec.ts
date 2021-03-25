import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthSpaceComponent } from './auth-space.component';

describe('AuthSpaceComponent', () => {
  let component: AuthSpaceComponent;
  let fixture: ComponentFixture<AuthSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthSpaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
