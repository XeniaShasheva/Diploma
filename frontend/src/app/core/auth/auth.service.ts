import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { DefaultResponseType } from 'src/types/default-response.type';
import { LoginResponseType } from 'src/types/login-response.type';
import { UserInfo } from 'src/types/user-info.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenKey:string = 'accessToken'
  public refreshTokenKey:string = 'refreshToken'
  public userIdKey:string = 'userId'
  public userInfoKey:string = 'userInfo'

  public isLogged$: Subject<boolean>=new Subject<boolean>()
  private isLogged=!!localStorage.getItem(this.accessTokenKey)


  name$: Subject<string>=new Subject<string>()

  constructor(private http:HttpClient) { }

  login(email:string,password:string,rememberMe:boolean):Observable<LoginResponseType|DefaultResponseType>{
    return this.http.post<LoginResponseType|DefaultResponseType>('http://localhost:3000/api/'+'login',{
      email,
      password,
      rememberMe
    })
  }
  signup(name:string,email:string,password:string):Observable<DefaultResponseType|LoginResponseType>{
    return this.http.post<DefaultResponseType|LoginResponseType>('http://localhost:3000/api/'+'signup',{
      name,
      email,
      password
    })
  }

  refresh():Observable<DefaultResponseType|LoginResponseType>{

    const tokens = this.getTokens()
    if(tokens&&tokens.refreshToken){
      return this.http.post<DefaultResponseType|LoginResponseType>('http://localhost:3000/api/'+'refresh',{
        refreshToken:tokens.refreshToken
      })
    }
   throw throwError(()=>'can not use token')

  }

  getInfoUser():Observable<UserInfo>{
    return this.http.get<UserInfo>('http://localhost:3000/api/'+'users')
  }

  get userInfo():null|string{
    return localStorage.getItem(this.userInfoKey)
  }

  set userInfo(info:string|null){
    if(info){
      localStorage.setItem(this.userInfoKey,info)
    }else{
      localStorage.removeItem(this.userInfoKey)
    }
  }

  public getIsLoggedIn(){
    return this.isLogged
  }

  public setTokens(accessToken:string,refreshToken:string):void{
    localStorage.setItem(this.accessTokenKey,accessToken)
    localStorage.setItem(this.refreshTokenKey,refreshToken)
    this.isLogged = true
    this.isLogged$.next(true)
  }

  public removeTokens():void{
    localStorage.removeItem(this.accessTokenKey)
    localStorage.removeItem(this.refreshTokenKey)
    this.isLogged = false
    this.isLogged$.next(false)
  }

  public getTokens():{accessToken:string|null,refreshToken:string|null}{
    return{
      accessToken: localStorage.getItem(this.accessTokenKey),
      refreshToken: localStorage.getItem(this.refreshTokenKey),
    }
  }

  get userId():null|string{
    return localStorage.getItem(this.userIdKey)
  }

  set userId(id:string|null){
    if(id){
      localStorage.setItem(this.userIdKey,id)
    }else{
      localStorage.removeItem(this.userIdKey)
    }
  }




  logout():Observable<DefaultResponseType>{
    const tokens = this.getTokens()
    if(tokens && tokens.refreshToken){
      return this.http.post<DefaultResponseType>('http://localhost:3000/api/'+'logout',{
        refreshToken:tokens.refreshToken
      })
    }
    throw throwError(()=>{
      'can not found token'
    })
  }

}
