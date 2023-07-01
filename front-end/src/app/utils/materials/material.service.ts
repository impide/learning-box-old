import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { IDialogConfig } from '../../interfaces/material.interface';

@Injectable({ providedIn: 'root' })
export class MaterialService {
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  openSnackBar(message: string, durationInSeconds: number): void {
    this._snackBar.open(message, 'Close', {
      duration: durationInSeconds * 1000,
    });
  }

  openDialog(component: ComponentType<any>, configs?: IDialogConfig): void {
    this.dialog.open(component, {
      panelClass: [...configs.panelClass] || null,
      autoFocus: configs.autoFocus || null
    });
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }
}
