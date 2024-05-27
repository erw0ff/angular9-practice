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

  getById(id: string): Observable<IPost> {
    return this.http.get<IPost>(`${environment['fbDbUrl']}/posts/${id}.json`)
      .pipe(
        map((post: IPost) => {
          return {
            ...post,
            id,
            date: new Date(post.date),
          }
        })
      )
  }

  remove(id: string): Observable<void> {
    console.log('response ID remove: ', id)
    return this.http.delete<void>(`${environment['fbDbUrl']}/posts/${id}.json`)
  }

  update(post: IPost): Observable<IPost> {
    return this.http.patch<IPost>(`${environment['fbDbUrl']}/posts/${post.id}.json`, post)
  }
}
