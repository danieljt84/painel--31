import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseAbastecimentoComponent } from './analise-abastecimento.component';

describe('AnaliseAbastecimentoComponent', () => {
  let component: AnaliseAbastecimentoComponent;
  let fixture: ComponentFixture<AnaliseAbastecimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaliseAbastecimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliseAbastecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
