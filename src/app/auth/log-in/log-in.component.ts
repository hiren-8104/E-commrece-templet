import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup = this.fb.group({
    username: ["mor_2314", Validators.required],
    password: ["83r5^_", Validators.required]
  })
  constructor(
    private commonService:CommonService,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router) { }

  ngOnInit(): void {

  }


  // login aapi calling the auth service
  userLogin() {
    if (this.logInForm.valid) {
      console.log(this.logInForm.value)
      this.auth.logIn(this.logInForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.storage.setStorageItem("token", res.token)
          this.commonService.allHidden.next(true);
          this.router.navigate(['/'])
        },
        error: (err) => {console.log(err)}
      })
    }
  }
}
