import { Component } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.css']
})
export class GlobalErrorComponent {
  constructor(
    public errorService : ErrorService,
    private _toastService: ToastService,){}


    
  OnInit():void{
    console.log(this.errorService.error$);
  }

}
