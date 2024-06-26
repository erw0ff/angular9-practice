import {Pipe, PipeTransform} from "@angular/core";
import {IPost} from "../../shared/interfaces";

@Pipe({
  name: 'searchPosts'
})

export class SearchPipe implements PipeTransform {
  transform(posts: IPost[], search: string = ''): IPost[] {
    if (!search.trim()) {
      return posts
    }

    return posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
  }

}
