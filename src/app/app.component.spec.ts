import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {

      // refine the test module by declaring the test component
      TestBed.configureTestingModule({
          imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatFormFieldModule,
            ReactiveFormsModule,
            MatInputModule,
            FormsModule,
            MatSnackBarModule,
            MatIconModule,
            MatButtonModule],
          declarations: [AppComponent, SnackbarComponent],
          schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [SnackbarComponent]
        }
      });

      // create component and test fixture
      fixture = TestBed.createComponent(AppComponent);

      // get test component from the fixture
      component = fixture.componentInstance;
      component.ngOnInit();
  });

  it('form invalid when empty', () => {
      expect(component.textForm.valid).toBeFalsy();
  });

  it('text field validity', () => {
      let errors = {};
      let text = component.textForm.controls['text'];
      expect(text.valid).toBeFalsy();

      // Text field is required
      errors = text.errors || {};
      expect(errors['required']).toBeTruthy();

      // Set text to something invalid
      text.setValue('test123');
      errors = text.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeTruthy();

      // Set text to something valid
      text.setValue('test');
      errors = text.errors || {};
      expect(errors['required']).toBeFalsy();
      expect(errors['pattern']).toBeFalsy();
      component.resetResult();
  });

  it('submitting text to perform all 3 actions', () => {
    expect(component.textForm.valid).toBeFalsy();
    component.textForm.controls['text'].setValue('hello world');
    expect(component.textForm.valid).toBeTruthy();

    // Trigger the submit function
    component.submit(0);

    // Now we can check to make sure the emitted value is correct
    expect(component.result).toBe('<br>HELLO WORLD<br>hElLo wOrLd<br>CSV created!');
    component.resetResult();
});

  it('submitting text to convert to uppercase', () => {
      expect(component.textForm.valid).toBeFalsy();
      component.textForm.controls['text'].setValue('hello world');
      expect(component.textForm.valid).toBeTruthy();

      // Trigger the submit function
      component.submit(1);

      // Now we can check to make sure the emitted value is correct
      expect(component.result).toBe('HELLO WORLD<br>');
      component.resetResult();
  });

  it('submitting text to convert to alternate case', () => {
    expect(component.textForm.valid).toBeFalsy();
    component.textForm.controls['text'].setValue('hello world');
    expect(component.textForm.valid).toBeTruthy();

    // Trigger the submit function
    component.submit(2);

    // Now we can check to make sure the emitted value is correct
    expect(component.result).toBe('hElLo wOrLd<br>');
    component.resetResult();
  });

  it('submitting text to create CSV', () => {
    expect(component.textForm.valid).toBeFalsy();
    component.textForm.controls['text'].setValue('hello world');
    expect(component.textForm.valid).toBeTruthy();

    // Trigger the submit function
    component.submit(3);

    // Now we can check to make sure the emitted value is correct
    expect(component.result).toBe('CSV created!');
    component.resetResult();
  });

  const materialIcons = document.createElement('link');
  materialIcons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  materialIcons.rel = 'stylesheet';
  document.head.appendChild(materialIcons);

});
