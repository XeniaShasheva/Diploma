import { Component, Input, OnInit } from '@angular/core';
import { ArticleCommentType } from 'src/types/article-comment.type';
import { CommentsService } from '../../services/comments.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'comment-cart',
  templateUrl: './comment-cart.component.html',
  styleUrls: ['./comment-cart.component.scss']
})
export class CommentCartComponent  implements OnInit{



  @Input()comment!:ArticleCommentType
  @Input()articleId!:string;
  myLike:number=0;
  myDislike:number=0;
  myViolate:boolean=false
  issLogged = this.authService.getIsLoggedIn()


  constructor(
    private commentsService:CommentsService,
    private _snackBar:MatSnackBar,
    private authService:AuthService){
    }


  ngOnInit(): void {

    if(!this.issLogged){
      return
    }

    this.myViolate = false;
    this.commentsService.getArticleCommentActionUser({articleId:this.articleId})
    .subscribe(data=>{
     let i = data.find(itm=>{
        return this.comment.id === itm.comment
      })
     if(i && i.action==='like'){
      this.myLike = 1;
     }else if(i && i.action==='dislike'){
      this.myDislike = 1;
     }
    })
  }



  like(): void {
    if(!this.issLogged){
      this._snackBar.open('Войдите или зарегистрируйтесь');
      return;
    }

      if(this.myLike==0 && this.myDislike==0){
        this.myLike++;
        this.comment.likesCount++;
        this.requestLike('like');
        this._snackBar.open('Ваш голос учтен');
      }

      else if(this.myLike>=0 && this.myDislike==1){
        this.myLike++;
        this.comment.likesCount++;
          this.myDislike--;
        this.comment.dislikesCount--;
        this.requestLike('like');
      }
  }



  dislike(): void {
    if(!this.issLogged){
      this._snackBar.open('Войдите или зарегистрируйтесь');
      return;
    }

      if(this.myDislike == 0 && this.myLike == 0){
        this.myDislike++;
        this.comment.dislikesCount++;
        this.requestLike('dislike');
        this._snackBar.open('Ваш голос учтен');
      }

      else if(this.myDislike >= 0 && this.myLike == 1){
        this.myLike--;
        this.comment.likesCount--;
        this.myDislike++;
        this.comment.dislikesCount++;
        this.requestLike('dislike');
      }
  }


  requestLike(action:string): void {
    this.commentsService.actionsComment(this.comment.id,action)
    .subscribe(()=>{})
  }

  violate(): void {
    if(!this.issLogged) {
      this._snackBar.open('Войдите или зарегистрируйтесь') ;
      return;
    }

    if (!this.myViolate) {
      this.myViolate=true
      this.requestLike('violate');
      this._snackBar.open('Жалоба отправлена');
    } else {
      this._snackBar.open('Жалоба уже отправлена');
    }

  }

}
