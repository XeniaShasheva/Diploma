import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AllCommentsType } from 'src/types/all-comments.type';
import { DefaultResponseType } from 'src/types/default-response.type';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }

  getAllCommentsPage(params:{offset:number,article:string}):Observable<AllCommentsType> {
    return this.http.get<AllCommentsType>('http://localhost:3000/api/'+'comments',{
      params: params
    })
  }


  addComment(text:string,article:string):Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>('http://localhost:3000/api/'+'comments',{
      text: text,
      article: article
    })
  }

  actionsComment(idComment:string,action:string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>('http://localhost:3000/api/'+'comments/'+idComment+'/apply-action',{
      action
    })
  }
  getArticleCommentActionUser(params:{articleId:string}): Observable<{comment:string,action:string} []> {
    return this.http.get<{comment:string,action:string}[]>('http://localhost:3000/api/'+'comments/article-comment-actions',{
      params: params
    })
  }
}
