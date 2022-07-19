import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MainViewComponent } from './main-view.component'
import { MockNgConfigModule } from '@northfork/mock-ng-config'

describe('MainViewComponent', () => {
  let component: MainViewComponent
  let fixture: ComponentFixture<MainViewComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MockNgConfigModule],
        declarations: [MainViewComponent],
      }).compileComponents()
    }),
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
