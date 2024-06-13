import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/helpers/auth.service';
import { ReservationService } from 'src/app/service/reservation.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.css']
})
export class ListeReservationComponent implements OnInit {
  listeReservation: any = {};
  token!: string;
  recaptchaResponse: string = '';
  captchaVerified = false; // Add a flag to track if captcha is verified
  tokenn:any ="";

  constructor(private reservationService: ReservationService, private _router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const captchaDisplayed = localStorage.getItem('captchaDisplayed');
    if (!captchaDisplayed) {
      this.showCaptcha();
      localStorage.setItem('captchaDisplayed', 'true');
    }
    
    this.recuperReservation();
  }

  showCaptcha() {
    this.captchaVerified = false;
  }
  renderRecaptcha() {
    console.log("rendering");
    const element = document.getElementById('recaptcha-id');
    if (element) {
      grecaptcha.render(element, {
        'sitekey': '6Lf2jSMpAAAAAGp3_Kjy1Fx2nbgBE2yqsDlOMG8L'
        // other optional parameters
      });
      console.log("rendered");
    } else {
      console.error('reCAPTCHA placeholder element not found.');
    }
  }
  ngAfterViewInit(): void {
    this.renderRecaptcha();
  }

  recuperReservation() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn = data;
    })
    this.reservationService.getAllReservation(this.tokenn).subscribe(
      (data) => {
        console.log(data);
        this.listeReservation = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ToDetails(reservation: any) {

    this._router.navigate(['dashboard', reservation.idReservation, reservation.anneeUniversitaire]);
  }

  deleteRervation(id: number) {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn=data;
    })
    this.reservationService.removeReservation(id,this.tokenn).subscribe({
      next: () => (this.listeReservation = this.listeReservation.filter((reservation: any) => reservation.idReservation !== id))
    });
  }

  onSubmit() {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn=data;
    })
    this.recaptchaResponse = grecaptcha.getResponse();
    this.reservationService.verifyCaptcha(this.recaptchaResponse,this.tokenn).subscribe((response: any) => {
      if (response=="reCAPTCHA verified successfully") { // Assuming 'success' is the field indicating verification
        this.captchaVerified = true; // Set captchaVerified to true upon successful verification
        this.recuperReservation(); // Load reservation data if needed
      } else {
        // Handle error if captcha verification fails
        console.log('Captcha verification failed');
      }
    });
  }
  // generatePdf(id:number) {
  //   this.reservationService.generatePdf(id).subscribe(
  //     (response) => {
  //       console.log('PDF generated:', response);
  //       if (response && response.url) {
  //         // Open the URL in a new tab/window
  //         window.open(response.url, '_blank');
  //       } else {
  //         console.error('Invalid response:', response);
  //         // Handle invalid or missing URL in the response
  //       }
  //       // Handle the response here
  //     },
  //     (error) => {
  //       console.error('Error generating PDF:', error);
  //       // Handle error response
  //     }
  //   );
  // }
  generatePdf(id: number) {
    this.auth.userToken$.subscribe((data:any)=>{
      this.tokenn=data;
    })
    this.reservationService.generatePdf(id,this.tokenn).subscribe(
      (response) => {
        console.log('PDF generated:', response);
        if (response && response.url) {
          // Convert the URL to blob data
          this.downloadPDF(response.url);
        } else {
          console.error('Invalid response:', response);
          // Handle invalid or missing URL in the response
        }
        // Handle the response here
      },
      (error) => {
        console.error('Error generating PDF:', error);
        // Handle error response
      }
    );
  }
  
  downloadPDF(pdfUrl: string) {
    fetch(pdfUrl)
      .then((res) => res.blob())
      .then((blob) => {
        // Create a new blob URL
        const blobUrl = window.URL.createObjectURL(blob);
  
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'generated_pdf.pdf';
  
        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();
  
        // Clean up - remove the temporary link
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
        // Handle download error
      });
  }
  
}
