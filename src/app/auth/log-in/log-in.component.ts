import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';
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
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required]
  })
  offers: any;
  carousel: any;
  isRegister: boolean = false;
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOffer()
  }




  // login aapi calling the auth service
  userLogin() {
    console.log(this.logInForm.value)
    if (this.logInForm.valid) {
      this.auth.logIn(this.logInForm.value).subscribe({
        next: (res) => {
          if (res.status=='200'){
            this.toastr.success(res.message)
            this.storage.setStorageItem("token", res.token)
            this.commonService.tokenService.next(res.token)
            this.router.navigate(['/'])
          }
          else{
            this.toastr.error(res.message)

          }

        },
        error: (err) => { console.log(err) }
      })
    }

  }

  getOffer() {
    this.commonService.getHeroSection().subscribe({
      next: (res) => {
        this.offers = res.data.offers

      }
    })
  }


}



