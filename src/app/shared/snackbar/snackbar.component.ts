import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';

export const ICON_SUCCESS = 'success';
export const ICON_ERROR = 'error';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  message: String;
  icon: string;
  title: string;


  public static initSuccessSnackbar(snackBar: MatSnackBar, message: string, duration?: number): void {
    SnackbarComponent.initCustomSnackbar(snackBar, message, ICON_SUCCESS, 'success-snack-bar-container', true);
  }

  public static initErrorSnackbar(snackBar: MatSnackBar, message: string, duration?: number): void {
    SnackbarComponent.initCustomSnackbar(snackBar, message, ICON_ERROR, 'error-snack-bar-container', true);
  }

  public static initCustomSnackbar(snackBar: MatSnackBar, message: string, type: string, additionalClass?: string, isShowDismissBtn?: boolean): void {
    snackBar.openFromComponent(SnackbarComponent, {
      horizontalPosition: 'start',
      panelClass: ['common-snack-bar-container', additionalClass],
      data: { type, message, isShowDismissBtn: Boolean(isShowDismissBtn) }
    });
  }

  constructor( @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarInterface, public snackBar: MatSnackBar) {
    this.prepareData();
  }

  ngOnInit() {
  }

  private prepareData(): void {
    if (!this.data.type) {
      this.icon = '';
      this.title = '';
    }
    if (this.data.type === ICON_SUCCESS) {
      this.icon = 'check_box';
      this.title = 'SUCCESS!';
    }
    if (this.data.type === ICON_ERROR) {
      this.icon = 'error_outline';
      this.title = 'ERROR!';
    }
  }


  close() {
    this.snackBar.dismiss();
  }

  public static dismissSnackbar(snackBar: MatSnackBar) {
    snackBar.dismiss();
  }

}

export interface SnackbarInterface {
  type: string;
  isShowDismissBtn: boolean;
  message?: string;
}
