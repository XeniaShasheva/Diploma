import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveParamsType } from 'src/types/active-params.type';
import { ArticleCardType } from 'src/types/article-card.type';
import { ArticleCategory } from 'src/types/article-categories.type';
import { ArticleType } from 'src/types/article.type';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }


  getTopArticles():Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]> ('http://localhost:3000/api/'+'articles/top');
  }
  getArticles(params: ActiveParamsType):Observable< {count:number, pages:number, items:ArticleCardType[]}>{
    return this.http.get<{count:number, pages:number, items:ArticleCardType[]}> ('http://localhost:3000/api/'+'articles',{
      params: params
    })
  }
  getCategoriesArticles(): Observable<ArticleCategory[]> {
    return this.http.get<ArticleCategory[]>('http://localhost:3000/api/'+'categories');
  }
  getArticle(url:string): Observable<ArticleType> {
    return this.http.get<ArticleType>('http://localhost:3000/api/'+'articles/'+url);
  }
  getRelatedArticles(url:string): Observable<ArticleCardType[]> {
    return this.http.get<ArticleCardType[]>('http://localhost:3000/api/'+'articles/related/'+url);
  }
}
