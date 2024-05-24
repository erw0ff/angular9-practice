import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {IFbAuthResponse, IUser} from "../../../shared/interfaces";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({providedIn: 'root'})

export class AuthService {

  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) { }

  get token(): string {
    const expDate: Date = new Date(localStorage.getItem('fb-token-exp'));
    if (new Date() > expDate) {
      this.logout()
      return null
    }
    return localStorage.getItem('fb-token');
  }

  login(user: IUser): Observable<IFbAuthResponse> {
    user.returnSecureToken = true;
    return this.http.post<IFbAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken),  //tap((response) => this.setToken(response))
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null);
  }

  isAuthentificated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error.error

    console.log(message);

    switch (message) {
      case "INVALID_LOGIN_CREDENTIALS":
        this.error$.next('Неверный email или password')
        break;
    }

    return throwError(error)
  }

  private setToken(response: IFbAuthResponse | null): void {
    if (response) {
      const expDate: Date = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
