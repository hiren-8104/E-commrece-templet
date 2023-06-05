import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  offers: any;
  regetrationsForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    country: ["India", Validators.required],
    mobile: ["", Validators.required],
    timezone: ["UTC+05:30", Validators.required],
    language: ["English", Validators.required],
  })
  constructor(private fb: FormBuilder, private authService: AuthService, public commonService: CommonService) { }

  ngOnInit(): void {
    this.getOffer()
  }
  registerUser() {
    console.log(this.regetrationsForm.value)
    if (this.regetrationsForm.valid) {
      this.authService.registratoin(this.regetrationsForm.value).subscribe({
        next: (res: any) => {
          console.log(res, "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        }
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
