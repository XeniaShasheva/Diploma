import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArticleCategory } from 'src/types/article-categories.type';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveParamsType } from 'src/types/active-params.type';

@Component({
  selector: 'type-filter',
  templateUrl: './type-filter.component.html',
  styleUrls: ['./type-filter.component.scss']
})
export class TypeFilterComponent implements OnInit{

  constructor(private articleService:ArticleService,
    private router:Router,
    private activatedRoute:ActivatedRoute,){}

@Input() categoriesArticle!:ArticleCategory
@Output() urlStatusArticle:EventEmitter<[string,string,boolean]> = new EventEmitter<[string,string,boolean]>()


activeParams:ActiveParamsType={categories:[]}
active:boolean=false

updateActive(): void {
  this.active =!this.active;
  this.urlStatusArticle.emit([this.categoriesArticle.url,this.categoriesArticle.name,this.active]);
}
ngOnInit(): void {
  this.activatedRoute.queryParams
  .subscribe(data => {
    if(data['categories']) {
      this.active = data['categories'].includes(this.categoriesArticle.url);
    }
  })
}
}
