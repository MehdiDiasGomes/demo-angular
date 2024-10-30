import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionService } from './services/connexion.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  router = inject(Router)


  ConnexionService = inject(ConnexionService);

  deconnexion() {
    localStorage.removeItem('jwt');
    this.ConnexionService.connecte = false;
    this.router.navigateByUrl('/connexion');
  }
}
