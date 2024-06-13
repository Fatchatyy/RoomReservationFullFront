import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { Router } from '@angular/router';
import { CustomValidator } from "src/app/auth/customValidator";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userNotFound = false;
  formSubmitted = false;
  error = '';
  constructor(private auth: AuthService, private route: Router) {}

  loginForm = new FormGroup({
    login: new FormControl('', [
      Validators.required,
      CustomValidator.emailValidator,
    ]),
    password: new FormControl('', [
      Validators.required,
      CustomValidator.passwordValidator,
    ]),
  });

  // login() {
  //   this.formSubmitted = true;
  //   this.auth.login(this.loginForm.value).subscribe(
  //     (data: any) => {
  //       console.log(data);
  //       this.auth.updateUserRole(data.role);
  //       this.auth.updateUserToken(data.token);
  //       if (data.role === 'ADMIN') {
  //         this.route.navigate(['/dashboard/listefoyer']);
  //       }
  //       if (data.role === 'UNIVERSITY') {
  //         this.route.navigate(['/etudiant']);
  //       }
  //       if (data.role === 'SUPERADMIN') {
  //         this.route.navigate(['/signup']);
  //       }
  //     },
  //     (error: any) => {
  //       console.log(error.error.message);
  //       this.error = error.error.message;
  //       this.userNotFound = true;
  //     }
  //   );
  // }
  login(){
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe({
        next:(data)=>{
          if(data && data.role=="ADMIN"){
            Swal.fire({
              icon: "success",
              title: "Welcome",
              text: "Your account !",
               
            });
            this.route.navigateByUrl('dashboard/listefoyer')
           
            this.auth.updateUserRole(data.role);
        this.auth.updateUserToken(data.token);
          }
          else{
            Swal.fire({
              icon: "success",
              title: "Welcome",
              text: "Your account !",
               
            });
            this.route.navigateByUrl('etudiant');
            this.auth.updateUserRole(data.role);
            this.auth.updateUserToken(data.token);
          }
        },
        error:(error)=>{
 
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
          this.userNotFound = true;
          
        }
      })
      
    }else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid data!",
       
      });
    }
  }
}
