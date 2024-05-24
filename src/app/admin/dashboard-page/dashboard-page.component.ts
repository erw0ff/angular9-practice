import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../shared/services/auth.service";
import {PostService} from "../../shared/post.service";
import {IPost} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy{

  posts: IPost[] = [];
  pSub: Subscription;
  searchStr: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
      console.log('posts: ', posts)
    })
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
  }


  remove(id: string) {

  }
}
