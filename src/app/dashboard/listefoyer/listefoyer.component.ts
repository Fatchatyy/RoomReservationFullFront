import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { AuthService } from 'src/app/core/helpers/auth.service';
import { DeletefoyerService } from 'src/app/service/deletefoyer.service';
import { FoyerService } from 'src/app/service/foyer.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-listefoyer',
  templateUrl: './listefoyer.component.html',
  styleUrls: ['./listefoyer.component.css']
})
export class ListefoyerComponent implements OnInit {
  nouveauFoyer: { nomFoyer?: string, capaciteFoyer?: number } = {};
  Listefoyer: any = {};
  foyerData: { [key: string]: any } = {}; // ou le type approprié de votre objet
  token:any =""

  constructor(private foyerservice: FoyerService, private router: Router, private foyerservices: DeletefoyerService, private cdr: ChangeDetectorRef, private auth :AuthService) {
  }

  ngOnInit(): void {
    this.recuperfoyer();
  }

  onButtonClick() {
    console.log('Bouton "add foyer" cliqué !');
    this.router.navigate(['/dashboard/addfoyer']);
  }
  updateForm=new FormGroup({
    idFoyer:new FormControl('',Validators.required),
    nomFoyer:new FormControl('',Validators.required),
    capaciteFoyer:new FormControl('',Validators.required)
  })


  getFoyer(id:number){
    this.auth.userToken$.subscribe((data:any)=>{
      this.token=data;
    })
this.foyerservice.getfoyerByID(id,this.token).subscribe({
  next:(data)=>{
    this.updateForm.patchValue(data);
  },
  error:(error)=>{
console.log(error)
  }
})
  }
  recuperfoyer() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.token = data;
    })
    this.foyerservice.getAllfoyer(this.token).subscribe(
      (data:any) => {
        console.log(data);
        this.Listefoyer = data;
      },
      (error:any) => {
        console.error(error);
      }
    );
  }

  onDeleteFoyer(foyerId: number) {
    const userConfirmed = window.confirm('Voulez-vous vraiment supprimer ce foyer?');
    
    if (userConfirmed) {
      this.auth.userToken$.subscribe((data:any)=>{
        this.token = data;
      })
      this.foyerservices.deletefoyer(foyerId,this.token).subscribe(
        () => {
          console.log('Suppression réussie');
          
          this.actualiserInterfaceUtilisateur(foyerId);
          
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    } else {
      console.log('Suppression annulée');
    }
  }

  actualiserInterfaceUtilisateur(foyerId: number) {
   
    this.Listefoyer = this.Listefoyer.filter((foyer: any) => foyer.idFoyer !== foyerId);
  }
  foyerToUpdate={
    name:"",
    capacite:"",  }

    edit(){
      if(this.updateForm.valid){
        this.foyerservice.updatefoyerr(this.updateForm.value,this.token).subscribe({
          next:(data)=>{
            Swal.fire({
              title: "Are you sure?",
              text: "You won't to update this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, update it!"
            }).then((data) => {
              if (data.isConfirmed) {
                Swal.fire({
                  title: "updated!",
                  text: "Your file has been updated",
                  icon: "success"
                });
                this.recuperfoyer();
              }
            });
           
          },
          error:(error)=>{
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        })
      }
        }

        updatefoyer(){
          
          this.auth.userToken$.subscribe((data:any)=>{
            this.token=data;
          })
          this.foyerservice.updatefoyerr(this.foyerToUpdate,this.token).subscribe()

        }
        searchForm = new FormGroup({
          searchQuery: new FormControl('')
        });
      
        // Méthode de recherche
        search() {
          const searchQueryControl = this.searchForm.get('searchQuery');
        
          // Vérifier si le contrôle existe et s'il a une valeur
          if (searchQueryControl && searchQueryControl.value) {
            const query = searchQueryControl.value.toLowerCase();
            this.Listefoyer = this.Listefoyer.filter((foyer: any) =>
              foyer.nomFoyer.toLowerCase().includes(query)
            );
          }
        }
        refreshList() {
          this.recuperfoyer();
        }
        key: string = 'id';
        reverse: boolean = false;
        
        sort(column: string) {
          this.key = column;
          this.reverse = !this.reverse;
        
          this.Listefoyer.sort((a: any, b: any) => {
            const order = this.reverse ? -1 : 1;
            return order * (a[column] - b[column]);
          });
        }
    
 
}





;

