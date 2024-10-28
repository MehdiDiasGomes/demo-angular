import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { Page404Component } from './page404/page404.component';

export const routes: Routes = [
    // !! Chemin évalué de haut en bas !!
    { path: 'accueil', component: AccueilComponent },
    { path: 'connexion', component: ConnexionComponent },
    { path: '', redirectTo: 'accueil', pathMatch: 'full' },
    // Chemin non trouvé  (404) : ici nous placons une page de 404
    // !! Toujours le dernier objet route !!
    { path: '**', component: Page404Component },
];
