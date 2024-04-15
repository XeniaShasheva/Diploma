import { Component,OnInit} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OwlOptions } from 'ngx-owl-carousel-o';

import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { ArticleService } from 'src/app/shared/services/article.service';
import { ArticleCardType } from 'src/types/article-card.type';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements OnInit{

  mainOffers = [
    {
      img:'header1.png',
      text:'Предложение месяца',
      title:"Продвижение в Instagram для вашего бизнеса -15%!",
    },
    {
      img:'header2.png',
      text:'Акция',
      title:'Нужен грамотный копирайтер?',
      description:'Весь декабрь у нас действует акция на работу копирайтера.'
    },
    {
      img:'header3.png',
      text:'Новость дня',
      title:'6 место в ТОП-10 SMM-агенств Москвы!',
      description:'Мы благодарим каждого, кто голосовал за нас!'
    }
  ]
  reviews=[
    {
      img:'reviews1.png',
      name:'Станислав',
      text:'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      img:'reviews2.png',
      name:'Алёна',
      text:'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      img:'reviews3.png',
      name:'Мария',
      text:'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      img:'reviews3.png',
      name:'Мария',
      text:'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    },
    {
      img:'reviews3.png',
      name:'Мария',
      text:'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    }
  ]
  services=[
  {
    image:'/assets/img/main/services/services1.png',
    title:'Создание сайтов',
    description:'В краткие сроки мы создадим качественный и самое главное продающий сайт для продвижения Вашего бизнеса!',
    price: 'От 7 500₽',
  },
  {
    image:'/assets/img/main/services/services2.png',
    title:'Продвижение',
    description:'Вам нужен качественный SMM-специалист или грамотный таргетолог? Мы готовы оказать Вам услугу “Продвижения” на наивысшем уровне!',
    price: 'От 3 500₽',
  },
  {
    image:'/assets/img/main/services/services3.png',
    title:'Реклама',
    description:'Без рекламы не может обойтись ни один бизнес или специалист. Обращаясь к нам, мы гарантируем быстрый прирост клиентов за счёт правильно настроенной рекламы.',
    price: 'От 1 000₽',
  },
  {
    image:'/assets/img/main/services/services4.png',
    title:'Копирайтинг',
    description:'Наши копирайтеры готовы написать Вам любые продающие текста, которые не только обеспечат рост охватов, но и помогут выйти на новый уровень в продажах.',
    price: 'От 750₽',
  },
  ]

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 800,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      }
    },
    nav: false
  }
  reviewsOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    margin: 26,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: false
  }



  constructor(
    private dialog: MatDialog,
    private articleServices:ArticleService
    ){}

  topArticles:ArticleCardType[]=[]

ngOnInit(): void {
  this.articleServices.getTopArticles()
  .subscribe((data)=>{
    this.topArticles = data
  })
}
dialogRef:MatDialogRef<any>|null=null


  popupServTest(value:string){
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: { name: 'Заявка на услугу', input:value },
    });

    this.dialogRef.afterClosed().subscribe(result => {});

  }


  showPopup(){
    this.dialogRef = this.dialog.open(PopupComponent, {
      data: { name: 'Закажите бесплатную консультацию!', input:'' },
    });
    this.dialogRef.afterClosed().subscribe(result => {});
  }
}
