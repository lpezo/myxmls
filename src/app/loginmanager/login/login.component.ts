import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from '../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  existsadmin = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService : AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authenticationService.getIsAdmin().subscribe(
      data => {
        this.existsadmin = data.result;
      },
      error => {
        this.toastr.error(error.error.message, 'Error');
          this.loading = false;
      }
    );

  }

  // for accessing to form fields
  get fval() { return this.loginForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
     this.authenticationService.login(this.fval.email.value, this.fval.password.value)
        .subscribe(
            data => {
              this.router.navigate(['/']);
            },
            error => {
              this.toastr.error(error.error.message, 'Error');
                this.loading = false;
            });
  }
}
