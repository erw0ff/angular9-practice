import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IPost} from "../../shared/interfaces";

@Component({
  selector: 'app-create',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit{
  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const post: IPost = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    }
    console.log(post);
  }
}
