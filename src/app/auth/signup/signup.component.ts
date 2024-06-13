import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { CustomValidator } from '../customValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formSubmitted = false;
  signupForm!: FormGroup;

  role: any = '';
  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.userRole$.subscribe((data: any) => {
      this.role = data;
    });
    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [Validators.required, CustomValidator.onlyLettersValidator],
        ],
        lastName: [
          '',
          [Validators.required, CustomValidator.onlyLettersValidator],
        ],
        login: ['', [Validators.required, CustomValidator.emailValidator]],
        password: [
          '',
          [Validators.required, CustomValidator.passwordValidators],
        ],
        confirmpassword: ['', [Validators.required]],
      },
      {
        validators: CustomValidator.MustMatch('password', 'confirmpassword'),
      }
    );
  }

  register() {
    this.formSubmitted = true;
    console.log("clicked",this.signupForm.valid,"?", !this.signupForm.errors)
    
   // if (this.signupForm.valid && !this.signupForm.errors) {
      console.log("is the issue here ?");
      this.auth.register(this.signupForm.value).subscribe((data: any) => {
        console.log("sign up data:",data, this.signupForm.errors);
        console.log("sign up data:" ,this.role);
      });
 //   }
  }
}
