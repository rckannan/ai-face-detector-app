import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppfaceuserComponent } from './appfaceuser.component';

describe('AppfaceuserComponent', () => {
  let component: AppfaceuserComponent;
  let fixture: ComponentFixture<AppfaceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppfaceuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppfaceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
