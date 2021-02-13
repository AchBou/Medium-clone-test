import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagSearchbarComponent } from './tag-searchbar.component';

describe('TagSearchbarComponent', () => {
  let component: TagSearchbarComponent;
  let fixture: ComponentFixture<TagSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagSearchbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
