import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IUser} from "../../shared/interfaces";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{

  form: FormGroup = new FormGroup({});
  submitted: boolean = false;
  message: string = ''

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      if (params['loginAgain']) {
        this.message = 'Войдите в аккаунт'
      } else if (params['authFailed']) {
        this.message = 'Session timeout. Login again'
      }
    })

    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })

  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true;
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset();
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false;
    }, () =>
      this.submitted = false
    )

  }
}
