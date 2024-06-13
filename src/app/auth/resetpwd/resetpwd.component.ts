import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css'],
})
export class ResetpwdComponent implements OnInit {
  resetForm!: FormGroup;
  constructor(
    private userAuthService: AuthService,
    private fb: FormBuilder,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    // if (this.resetForm.valid) {

    this.userAuthService.initiatePasswordReset(this.resetForm.value).subscribe(
      (data: any) => {
        // Reset form after successful submission
        //this.resetForm.reset();
        console.log('Reset link sent successfully.', data.token);
        this.userAuthService.updateUserToken(data.token);
        this.route.navigate(['/signin']);
      },
      (error) => {
        console.error('Error sending reset link:', error);
      }
    );
    // } else {
    //   // Mark the form controls as touched to display validation messages
    //   this.resetForm.markAllAsTouched();
    //   console.log('Form is invalid. Please check the fields.');
    // }
  }
}
