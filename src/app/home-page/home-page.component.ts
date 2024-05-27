import {Component, OnInit} from "@angular/core";
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {IPost} from "../shared/interfaces";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{

  posts$: Observable<IPost[]>

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getAll()
  }

}
