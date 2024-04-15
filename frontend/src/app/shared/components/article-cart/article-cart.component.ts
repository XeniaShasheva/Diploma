import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleCardType } from 'src/types/article-card.type';

@Component({
  selector: 'article-cart',
  templateUrl: './article-cart.component.html',
  styleUrls: ['./article-cart.component.scss'],
})
export class ArticleCartComponent {
@Input() article!:ArticleCardType
serviceInput:string|null = null



@Output() onCountChange:EventEmitter<string> = new EventEmitter<string>()

showPopup():void{
  this.onCountChange.emit(this.article.title)
}
}
