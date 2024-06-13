import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dah',
  templateUrl: './dah.component.html',
  styleUrls: ['./dah.component.css']
})
export class DahComponent implements OnInit {

  id:any=""
  token:any=""
  fullname =""
  tok:any

  constructor(private auth:AuthService, private route:Router) {
    
  } 

  ngOnInit(): void {
    this.auth.userToken$.subscribe((data:any)=>{
      console.log(data);
      this.tok=data
      this.token = jwtDecode(data)
      this.id=this.token.id
      
    })
      this.auth.getUserInfo(this.id,this.tok).subscribe((data:any)=>{
        this.fullname = data.firstName+" "+data.lastName
      })
  }

  logout(){
    this.auth.updateUserToken(null)
    this.route.navigate(['/signin'])
  }

}
