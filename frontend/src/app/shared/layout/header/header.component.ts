import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { share } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DefaultResponseType } from 'src/types/default-response.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  isLoged: boolean = false
  // name=this.authService.userInfo
  name:string|null = this.authService.userInfo

  constructor(private authService:AuthService,
    private _snackBar:MatSnackBar,
    private router:Router,
    public route: ActivatedRoute){
      this.isLoged = this.authService.getIsLoggedIn()

    }
    activeFragment = this.route.fragment.pipe(share());

    ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn:boolean)=>{
      this.isLoged = isLoggedIn;
     })

     this.authService.name$.subscribe((nameIn:string)=>{
      this.name = nameIn;
     })


    }

  logout(): void  {
    this.authService.logout()
    .subscribe({
      next:(data:DefaultResponseType)=>{
        this.doLoggout()

      },
      error:(errResponse:HttpErrorResponse)=>{
      this.doLoggout()
      }
    })
  }
  doLoggout(): void {
    this.authService.removeTokens()
    this.authService.userId = null
    this.authService.userInfo = null
    this._snackBar.open('Вы вышли из системы')
    this.router.navigate(['/'])
   }
}
