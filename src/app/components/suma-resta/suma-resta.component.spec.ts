import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumaRestaComponent } from './suma-resta.component';

describe('SumaRestaComponent', () => {
  let component: SumaRestaComponent;
  let fixture: ComponentFixture<SumaRestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SumaRestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumaRestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
