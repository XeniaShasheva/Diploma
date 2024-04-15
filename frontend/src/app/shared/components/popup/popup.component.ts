import {  Component,  Inject} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { RequestService } from '../../services/request.service';



@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],


})
export class PopupComponent {
   titlePopup:string=''
   inputTitle:string=''


  constructor(
  @Inject(MAT_DIALOG_DATA) public data: {name: string, input:string},
  private fb:FormBuilder,
  private requestService:RequestService) { }


  ngAfterViewChecked(){
   if(this.data.input.length){
      this.serviceForm.get('serviceType')?.setValue(this.data.input);
    }
  }

    showServicePopupForm:boolean = true
  // dealogRef:MatDialogRef<any>|null=null


    serviceForm = this.fb.group({
      serviceType: [{value:'', disabled: true}],
      name: ['',[Validators.required,Validators.pattern(/^([А-ЯЁ][а-яё\s]+)$/)]],
      phone: ['',[Validators.required,Validators.pattern(/^[0-9]{1,}$/)]],
    })

    sendServiceFormData(): void {
      if(this.serviceForm.get('serviceType')?.value) {
        this.requestService.sendRequests(this.serviceForm.get('name')?.value!,this.serviceForm.get('phone')?.value!,
        'order',this.serviceForm.get('serviceType')?.value!).subscribe((data)=>{
              if(data.error){
                throw new Error(data.message);
              }
              this.serviceForm.reset();
              this.showServicePopupForm = false;
        })

      }else if (!this.serviceForm.get('serviceType')?.value) {
        this.requestService.sendRequests(this.serviceForm.get('name')?.value!,this.serviceForm.get('phone')?.value!,
        'consultation').subscribe((data)=>{
          if (data.error) {
            throw new Error(data.message);
          }
          this.serviceForm.reset();
          this.showServicePopupForm = false;
        })
      }
    }
}
