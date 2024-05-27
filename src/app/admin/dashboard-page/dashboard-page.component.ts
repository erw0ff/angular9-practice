import {Component, OnDestroy, OnInit} from "@angular/core";
import {PostService} from "../../shared/post.service";
import {IPost} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit, OnDestroy{

  posts: IPost[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr: string = '';

  constructor(
    private postService: PostService,
    private alert: AlertService) { }

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe(posts => {
      this.posts = posts;
    })
  }

  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
    })
    this.alert.warning('post was deleted')
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe()
    }
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
    console.log('destroyed')
  }

}
