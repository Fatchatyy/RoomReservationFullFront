import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddfoyerService } from 'src/app/service/addfoyer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/helpers/auth.service';

@Component({
  selector: 'app-addfoyer',
  templateUrl: './addfoyer.component.html',
  styleUrls: ['./addfoyer.component.css']
})
export class AddfoyerComponent implements OnInit {
  Listefoyer: any = {};
  nouveauFoyer: { nomFoyer?: string, capaciteFoyer?: number } = {};
  monFormulaire: FormGroup;
  formSubmitted = false; // Ajouter un drapeau pour indiquer si le formulaire a été soumis
  token:any ="";

  constructor(
    private foyerservice: AddfoyerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth:AuthService
  ) {
    this.monFormulaire = this.formBuilder.group({
      nomFoyer: ['', [Validators.required]],
      capaciteFoyer: [null, Validators.required]
    });
  }

  onSupprimerClick() {
    console.log('Bouton "supprimer foyer" cliqué !');
    this.router.navigate(['/dashboard/listefoyer']);
  }

  register() {
    this.formSubmitted = true; // Marquer le formulaire comme soumis
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
    //console.log(this.token);
    
    if (this.monFormulaire.valid) {
      this.foyerservice.addfoyer(this.monFormulaire.value,this.token).subscribe(
        (resp:any) => {
          console.log(resp);
          //this.monFormulaire.reset();
        },
        (error:any) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit(): void {}
}
