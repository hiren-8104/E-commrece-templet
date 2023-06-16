import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  offers: any;
  isOptSend: boolean = false;

  forgetPasswordForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]]
  })
  upadatePasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    resetOtp: ['', Validators.required],
    newPassword: ['', Validators.required]
  })
  constructor(
    private commonService: CommonService,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.getOffer()
    this.upadatePasswordForm.disable()
  }
  getOffer() {
    this.commonService.getHeroSection().subscribe({
      next: (res) => {
        this.offers = res.data.offers

      }
    })


  }
  sendOtp() {
    if (this.forgetPasswordForm.valid) {
      this.auth.forgetpassword(this.forgetPasswordForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.upadatePasswordForm.controls['email'].setValue(this.forgetPasswordForm.value.email)
          this.isOptSend = true;
          this.upadatePasswordForm.enable()

        }
      })
    }
  }
  changePassword() {
    if (this.upadatePasswordForm.valid) {
      this.auth.resetpassword(this.upadatePasswordForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.success("Password updated successfully")
          this.router.navigate(['auth/login']);

        }
      })
    }
  }
}
