import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { NotificationsService, Options, Position } from 'angular2-notifications';
import { EtudiantService } from 'src/app/service/etudiant.service';
import { NotifierService } from 'angular-notifier';
import { delay, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/helpers/auth.service';


@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.css']
})
export class EtudiantFormComponent implements OnInit{
  etudiant : any = {};
  id = 0;
  token:any="";
  private notifier: NotifierService;
  constructor(private etudiantService:EtudiantService,private router:Router,private ac:ActivatedRoute,notifier: NotifierService, private auth: AuthService){
    this.notifier = notifier;
  }
  
  /**
   * Show a notification
   *
   * @param {string} type    Notification type
   * @param {string} message Notification message
   */
  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

 /* onHandleTag(tag: string) {
   this.os.SendTag("tech", tag).then(() =>{
     console. log("Sent tag: " + tag);
   });
  }*/
  ngOnInit() {
    //this.os.onInit();
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    this.id = this.ac.snapshot.params['id'];
      this.etudiantService.fetchUserById(this.id,this.token).subscribe({
        next : (data)=>this.etudiant = data as any
      })
      console.log("user id: ", this.id);
      console.log("this.etudiant: ", this.etudiant);
  }

  add(f: NgForm) {
   // console.log(typeof(f.value))
    //console.log("function works !")
    if (this.id == undefined) {
      console.log("checking etudiant for add",this.etudiant);
      this.auth.userToken$.subscribe((data:any)=>{
        this.token=data;
      })
      this.etudiantService.addEtudiant(this.etudiant,this.token).pipe(
        // Ajouter un délai de 2000 millisecondes (2 secondes) avant de naviguer
        delay(2000),
        // Utiliser tap pour effectuer une action pendant le délai (comme afficher un notifier)
        tap(() => {
          // Code pour afficher le notifier
          // ...
        }),
        // Naviguer vers '/dashboard/ListeEtudiant' après le délai
        switchMap(() => this.router.navigate(['/dashboard/ListeEtudiant']))
      ).subscribe();
    
    } else {
      console.log("chekcing etudiant for update", this.etudiant)
      this.auth.userToken$.subscribe((data:any)=>{
        this.token=data;
      })
      this.etudiantService.updateEtudiant(this.etudiant, this.id,this.token).pipe(// Ajouter un délai de 2000 millisecondes (2 secondes) avant de naviguer
      delay(2000),
      // Utiliser tap pour effectuer une action pendant le délai (comme afficher un notifier)
      tap(() => {
        // Code pour afficher le notifier
        // ...
      }),
      // Naviguer vers '/dashboard/ListeEtudiant' après le délai
      switchMap(() => this.router.navigate(['/dashboard/ListeEtudiant']))
    ).subscribe();
      
    }
  }

  getButtonMessage() {
    console.log(this.id)
    return this.id !== undefined ? 'Update etudiant' : 'Add etudiant';
  }
}
