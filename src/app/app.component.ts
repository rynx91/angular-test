import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TextResponse } from './models/text.type';
import { CommonUtil } from './shared/common-util';
import { SnackbarComponent } from './shared/snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  textForm: FormGroup;
  textResponse: TextResponse = {
    upperCase: null,
    alternateCase: null,
    csv: false
  };

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
    this.textResponse.upperCase =  (this.textForm.get('text').value).trim().toUpperCase();
  }

  alternateCase() {
    var chars = this.textForm.get('text').value.trim().toUpperCase().split('');
    for (var i = 0; i < chars.length; i += 2) {
      chars[i] = chars[i].toLowerCase();
    }
    this.textResponse.alternateCase =  chars.join('');
  }

  createCsv() {
    var chars = this.textForm.get('text').value.trim().toUpperCase().split('');
    const rows = [
      chars
    ];
    
    let csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
    this.textResponse.csv = true;
  }

  resetTextResponse() {
    this.textResponse.alternateCase = null;
    this.textResponse.upperCase = null;
    this.textResponse.csv = false;
    SnackbarComponent.dismissSnackbar(this.snackBar);
  }

  validateForm(): boolean {
    CommonUtil.markFormAsTouched(this.textForm);
    return this.textForm.valid;
  }

  submit(code: number) {
    this.resetTextResponse();
    if(!this.validateForm()){
      SnackbarComponent.initErrorSnackbar(this.snackBar, 'Please insert a valid text');
      return;
    }
    switch (code) {
      case 0:
        this.upperCase();
        this.alternateCase();
        this.createCsv();
        break;
      case 1:
        this.upperCase();
        break;
      case 2:
        this.alternateCase();
        break;
      case 3:
        this.createCsv()
        break;
    }
    SnackbarComponent.initSuccessSnackbar(this.snackBar, 'Result: '+ this.constructResult());
  }

  constructResult() {
    let result = '';
    if(!!this.textResponse.upperCase) {
      result += this.textResponse.upperCase + '<br>';
    }
    if(!!this.textResponse.alternateCase) {
      result += this.textResponse.alternateCase + '<br>';
    }
    if(!!this.textResponse.csv) {
      result += 'CSV created!';
    }
    return result;
  }
}
