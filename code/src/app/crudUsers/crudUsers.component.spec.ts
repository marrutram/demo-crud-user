import { TestBed, async } from '@angular/core/testing';
import { CrudUsersComponent } from './crudUsers.component';
describe('CrudUsersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CrudUsersComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CrudUsersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'code'`, async(() => {
    const fixture = TestBed.createComponent(CrudUsersComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('code');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(CrudUsersComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to code!');
  }));
});
