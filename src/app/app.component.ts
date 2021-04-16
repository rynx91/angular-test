import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CommonUtil } from './shared/common-util';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  textForm: FormGroup;
  result: string = '';

  constructor(private fb: FormBuilder, public snackBar: MatSnackBar){

  }

  ngOnInit() {
    this.initTextForm();
  }

  initTextForm() {
    this.textForm = this.fb.group({
      text: ['', [Validators.required, Validators.pattern(CommonUtil.ALPHABETS_PATTERN)]]
    });
  }

  upperCase() {
    this.resetResult();
    if(!this.validateForm()){
      SnackbarComponent.initErrorSnackbar(this.snackBar, 'Please insert a valid text');
      return;
    }
    this.result = (this.textForm.get('text').value).trim().toUpperCase();
    SnackbarComponent.initSuccessSnackbar(this.snackBar, 'Result: '+this.result);
  }

  alternateCase() {
    this.resetResult();
    if(!this.validateForm()){
      SnackbarComponent.initErrorSnackbar(this.snackBar, 'Please insert a valid text');
      return;
    }
    var chars = this.textForm.get('text').value.trim().toUpperCase().split('');
    for (var i = 0; i < chars.length; i += 2) {
      chars[i] = chars[i].toLowerCase();
    }
    this.result =  chars.join('');
    SnackbarComponent.initSuccessSnackbar(this.snackBar, 'Result: '+this.result);
  }

  createCsv() {
    this.resetResult();
    if(!this.validateForm()){
      SnackbarComponent.initErrorSnackbar(this.snackBar, 'Please insert a valid text');
      return;
    }
    var chars = this.textForm.get('text').value.trim().toUpperCase().split('');
    const rows = [
      chars
    ];
    
    let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    this.result = 'CSV created!';
    SnackbarComponent.initSuccessSnackbar(this.snackBar, 'Result: '+this.result);
  }

  resetResult() {
    this.result = '';
    SnackbarComponent.dismissSnackbar(this.snackBar);
  }

  validateForm(): boolean {
    CommonUtil.markFormAsTouched(this.textForm);
    return this.textForm.valid;
  }
}
