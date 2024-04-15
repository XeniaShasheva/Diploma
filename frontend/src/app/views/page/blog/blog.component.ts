// 0.
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ActiveParamsType } from 'src/types/active-params.type';
import { ArticleCardType } from 'src/types/article-card.type';
import { debounceTime } from 'rxjs';
import { ArticleCategory } from 'src/types/article-categories.type';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit{

  articles: ArticleCardType[] = [];
  pages: number[] = []
  activeParams: ActiveParamsType={categories: []}
  activeParamsFilter: {url:string,name:string} [] = []
  appliedFilters: any=[]
  sortingOpen = false
  categoriesArticles:ArticleCategory[] = []
  statusSidebar: number = 1




  constructor(private articleService:ArticleService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private elementRef: ElementRef){}

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .pipe(
      debounceTime(500)
    )
    .subscribe(params=>{

      const activeParams:ActiveParamsType = {categories:[]}
      if(params.hasOwnProperty("categories")) {
        activeParams.categories=Array.isArray(params['categories']) ? params['categories'] : [params['categories']]
      }
      if(params.hasOwnProperty("page")) {
        this.activeParams.page =+params['page']
      }else{
        this.activeParams.page = 1
      }

      console.log(this.activeParams)
      this.activeParamsFilter = [];
      for(let i = 0;i<this.categoriesArticles.length;i++){
        if(this.activeParams.categories) {
          for (let f = 0; f <this.activeParams.categories?.length; f++) {
            if (this.categoriesArticles[i].url === this.activeParams.categories[f]) {
              this.activeParamsFilter.push({url:this.categoriesArticles[i].url, name:this.categoriesArticles[i].name})
            }
          }
        }
      }

      console.log(this.activeParamsFilter);

      this.articleService.getArticles(params)
      .subscribe(data=> {
        this.pages = []
        for(let i = 1; i <= data.pages; i++){
          this.pages.push(i);
        }
        this.articles = data.items;
        this.statusSidebar = data.pages;
      })
    })

      this.articleService.getCategoriesArticles()
      .subscribe(data => {
        this.categoriesArticles = data
        console.log( this.categoriesArticles);
      })
  }




  toggleSorting(): void {
    this.sortingOpen = !this.sortingOpen
  }

  @HostListener('document:click', ['$event.target'])
  onClick(element: Element):void {
    if(!element.closest('.sortingOpen')){
    this.sortingOpen = false;
}

  }
  openPage(page:number): void {
    this.activeParams.page=page
    this.router.navigate(['/blog'],{
      queryParams:this.activeParams
    })
  }

  openPrevPage(): void {
    if(this.activeParams.page&&this.activeParams.page>1) {
      this.activeParams.page--;
      this.router.navigate(['/blog'],{
      queryParams:this.activeParams
    })
    }
  }
  openNextPage(): void {
    if(this.activeParams.page&&this.activeParams.page<this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/blog'],{
      queryParams:this.activeParams
    })
    }
  }

  updateFilterParam(urlStatus:[string,string,boolean?]){
    let url = urlStatus[0]
    let statusFilterType =  urlStatus[2]

    if(this.activeParams.categories){
      const existingTypeInParams = this.activeParams.categories.find(item=>item===url)

      if(existingTypeInParams && !statusFilterType){
        this.activeParams.categories=this.activeParams.categories.filter(item=>item !== url)

      }else{
        this.activeParams.categories=[...this.activeParams.categories,url]
      }
    }else if(statusFilterType){
      this.activeParams.categories = [url]

    }

    this.router.navigate(['/blog'],{
      queryParams:this.activeParams
    })

  }
}
