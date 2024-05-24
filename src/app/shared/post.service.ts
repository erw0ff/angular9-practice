import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {FbCreateResponse, IPost} from "./interfaces";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})

export class PostService {

  constructor(private http: HttpClient) {}

  create(post: IPost): Observable<IPost> {
    return this.http.post<FbCreateResponse>(`${environment['fbDbUrl']}/posts.json`, post)
      .pipe(
        map((response: FbCreateResponse) => {
          return {
            ...post,
            id: response.name,
            date: new Date(post.date),
          } as IPost
        })
      )
  }

  getAll() {
    return this.http.get(`${environment['fbDbUrl']}/posts.json`)
      .pipe(
        tap(response => console.log(response)),
        map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => {
            return {
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }
          })

      }))
  }
}
