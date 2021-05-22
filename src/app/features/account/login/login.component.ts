import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '../../../services';
import { applicationUrls } from '../../../seedwork';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to the form fields
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

    this.loading = true;

    let username = this.f.username.value;
    let password = this.f.password.value;

    this.accountService.login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          let returnUrl = this.route.snapshot.queryParams['returnUrl'] || applicationUrls.root;
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.loading = false;
        }
      });
  }

}
