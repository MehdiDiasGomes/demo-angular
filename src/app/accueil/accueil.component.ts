import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, DragDropModule], // Ajout de DragDropModule ici
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  saisieImage = '';

  categories: { nom: string; images: string[] }[] = [
    {
      nom: 'Super',
      images: [
        'https://media1.thrillophilia.com/filestore/8vh1qgvmud08c5vm2goj4aucretr_ew41nl9hgdajdas55cjfe02isgid_119.jpg',
      ],
    },
    {
      nom: 'Bien',
      images: [],
    },
    {
      nom: 'Moyen',
      images: [],
    },
    {
      nom: 'Pas top',
      images: [],
    },
    {
      nom: 'Nul',
      images: [],
    },
  ];

  ngOnInit() {
    const sauvegarde = localStorage.getItem('sauvegarde');
    if (sauvegarde) {
      this.categories = JSON.parse(sauvegarde);
    }
  }

  sauvegarde() {
    const jsonCategories = JSON.stringify(this.categories);
    localStorage.setItem('sauvegarde', jsonCategories);
  }

  ajouterImage() {
    if (!this.saisieImage) {
      alert("Veuillez saisir une URL d'image");
      return;
    }
    this.categories[0].images.push(this.saisieImage);
    this.saisieImage = '';
    this.sauvegarde();
  }

  mooveImage(indexCategorie: number, indexImage: number, bottom = true) {
    const imageClique = this.categories[indexCategorie].images[indexImage];

    if (imageClique) {
      this.categories[indexCategorie + (bottom ? 1 : -1)].images.push(
        imageClique
      );
      this.categories[indexCategorie].images.splice(indexImage, 1);
    }

    this.sauvegarde();
  }

  supprimerImage(indexCategorie: number, indexImage: number) {
    this.categories[indexCategorie].images.splice(indexImage, 1);
    this.sauvegarde();
  }
}
