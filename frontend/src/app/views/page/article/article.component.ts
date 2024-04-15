import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ArticleService } from 'src/app/shared/services/article.service';
import { CommentsService } from 'src/app/shared/services/comments.service';
import { ArticleCardType } from 'src/types/article-card.type';
import { ArticleCommentType } from 'src/types/article-comment.type';
import { ArticleType } from 'src/types/article.type';
import { DefaultResponseType } from 'src/types/default-response.type';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit{

  constructor(
    private activateRoute:ActivatedRoute,
    private authService:AuthService,
    private _snackBar:MatSnackBar,
    private articleService:ArticleService,
    private commentsService:CommentsService){

    }

    loader:boolean=false

    articles:any
    artictesRelateds!:ArticleCardType[]
    comments:ArticleCommentType[]=[]
    isLogged:boolean = false
    commentPage:number=3
    addCommentsButton:boolean=true
    inputComment:string=''


  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
      .subscribe((data:ArticleType)=>{
        this.articles = data
        this.comments = data.comments
      })
      this.articleService.getRelatedArticles(params['url'])
      .subscribe((data:ArticleCardType[]) => {
        this.artictesRelateds = data
      })
      this.isLogged = this.authService.getIsLoggedIn();

    })
  }

  addComments(): void {
    this.loader = true;
    this.addCommentsButton = false;

        setTimeout(() => {
          this.commentsService.getAllCommentsPage({offset:this.commentPage,article:this.articles!.id})
          .pipe(
            finalize(() => {
              this.loader=false
              if(this.commentPage<this.articles!.commentsCount){
                this.addCommentsButton = true;
              }
          })
          )
          .subscribe(data=>{
            this.comments=[...this.comments,...data.comments]
          })

          this.commentPage+=10
        },1500)
  }



  addComment(): void {
    this.commentsService.addComment(this.inputComment,this.articles!.id)
    .subscribe(data => {
      if((data as DefaultResponseType).error){
        throw new Error((data as DefaultResponseType).message)
      }
      this._snackBar.open((data as DefaultResponseType).message)

      this.activateRoute.params.subscribe(params => {

        this.articleService.getArticle(params['url'])

        .subscribe((data:ArticleType) => {
          this.articles = data
          this.comments = data.comments
        })
      })
    })
    this.inputComment = ''
  }


}
