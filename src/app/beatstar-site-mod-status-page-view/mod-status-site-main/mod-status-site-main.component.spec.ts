import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModStatusSiteMainComponent } from './mod-status-site-main.component';

describe('ModStatusSiteMainComponent', () => {
  let component: ModStatusSiteMainComponent;
  let fixture: ComponentFixture<ModStatusSiteMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModStatusSiteMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModStatusSiteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
