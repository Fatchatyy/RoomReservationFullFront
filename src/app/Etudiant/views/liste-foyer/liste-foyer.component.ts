import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { FoyerService } from 'src/app/service/foyer.service';

@Component({
  selector: 'app-liste-foyer',
  templateUrl: './liste-foyer.component.html',
  styleUrls: ['./liste-foyer.component.css']
})
export class ListeFoyerComponent implements OnInit {
  constructor(private foyerservice: FoyerService,private auth :AuthService){


  }
  ngOnInit(): void {
this.recuperfoyer();  }
  Listefoyer: any = [];
  key: string = 'id';
  reverse: boolean = false;
  token:any="";
  sort(column: string) {
    this.key = column;
    this.reverse = !this.reverse;
  
    this.Listefoyer.sort((a: any, b: any) => {
      const order = this.reverse ? -1 : 1;
      return order * (a[column] - b[column]);
    });
  }
  recuperfoyer() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.token = data;
      console.log("fatouma",this.token);
    })
    this.foyerservice.getAllfoyer(this.token).subscribe(
      (data) => {
        console.log("sdscd",data);
        this.Listefoyer = data;
        console.log(this.Listefoyer)
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
