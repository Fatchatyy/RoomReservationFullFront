import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//import { NotificationsService, Options, Position } from 'angular2-notifications';
import { UniversiteService } from 'src/app/service/universite.service';
import { NotifierService } from 'angular-notifier';
import { delay, tap, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/helpers/auth.service';

@Component({
  selector: 'app-universite-form',
  templateUrl: './universite-form.component.html',
  styleUrls: ['./universite-form.component.css']
})
export class UniversiteFormComponent implements OnInit{
  universite : any = {};
  id = 0;
  private notifier: NotifierService;
  token : any="";
  constructor(private universiteService:UniversiteService,private router:Router,private ac:ActivatedRoute,notifier: NotifierService,private auth :AuthService){
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
    this.id = this.ac.snapshot.params['id'];
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
      this.universiteService.fetchUniversiteById(this.id,this.token).subscribe({
        next : (data)=>this.universite = data as any
      })
      console.log("universite id: ", this.id);
      console.log("this.universite: ", this.universite);
  }

  add(f: NgForm) {
   // console.log(typeof(f.value))
    //console.log("function works !")
    if (this.id == undefined) {
      console.log("checking universite for add",this.universite);
      this.auth.userToken$.subscribe((data:any)=>{
        this.token=data;
      })
      this.universiteService.addUniversite(this.universite,this.token).pipe(
        // Ajouter un délai de 2000 millisecondes (2 secondes) avant de naviguer
        delay(2500),
        // Utiliser tap pour effectuer une action pendant le délai (comme afficher un notifier)
        tap(() => {
          // Code pour afficher le notifier
          // ...
        }),
        // Naviguer vers '/dashboard/ListeUniversite' après le délai
        switchMap(() => this.router.navigate(['/dashboard/ListeUniversite']))
      ).subscribe();
    
    } else {
      console.log("chekcing universite for update", this.universite)
      this.auth.userToken$.subscribe((data:any)=>{
        this.token=data;
      })
      this.universiteService.updateUniversite(this.universite, this.id,this.token).pipe(
        // Ajouter un délai de 2000 millisecondes (2 secondes) avant de naviguer
        delay(2500),
        // Utiliser tap pour effectuer une action pendant le délai (comme afficher un notifier)
        tap(() => {
          // Code pour afficher le notifier
          // ...
        }),
        // Naviguer vers '/dashboard/ListeUniversite' après le délai
        switchMap(() => this.router.navigate(['/dashboard/ListeUniversite']))
      ).subscribe();
      
    }
  }

  getButtonMessage() {
    console.log(this.id)
    return this.id !== undefined ? 'Update universite' : 'Add universite';
  }
}
