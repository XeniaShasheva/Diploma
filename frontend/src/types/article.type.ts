import { ArticleCommentType } from "./article-comment.type";

export type ArticleType={
    text:string,
    comments: ArticleCommentType[],
    commentsCount:number,
    id:string,
    title:string;
    description:string,
    image:string,
    date:string,
    category?:string;
    url:string,
}