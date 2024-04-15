import { Component} from '@angular/core';
import { PopupComponent } from '../../components/popup/popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],

})
export class FooterComponent {


  dialogRef: MatDialogRef<any>|null = null;

  constructor(
    private dialog: MatDialog,
    public route: ActivatedRoute)
  {}
    activeFragment = this.route.fragment.pipe(share());

    showPopup(): void {
      this.dialogRef = this.dialog.open(PopupComponent, {
        data: { name: 'Закажите бесплатную консультацию!', input:'' },
      });
      this.dialogRef.afterClosed().subscribe(result => {});
    }


}
