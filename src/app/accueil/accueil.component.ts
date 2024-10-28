import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

declare type categorie = {
  nom: string;
  images: string[];
  editCategorie: boolean;
};

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule, DragDropModule], // Ajout de DragDropModule ici
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilComponent {
  saisieImage = '';
  saisiCategorie = '';

  categories: { nom: string; images: string[]; editCategorie: boolean }[] = [
    {
      nom: 'Super',
      images: [
        'https://media1.thrillophilia.com/filestore/8vh1qgvmud08c5vm2goj4aucretr_ew41nl9hgdajdas55cjfe02isgid_119.jpg',
      ],
      editCategorie: false,
    },
    {
      nom: 'Bien',
      images: [],
      editCategorie: false,
    },
    {
      nom: 'Moyen',
      images: [],
      editCategorie: false,
    },
    {
      nom: 'Pas top',
      images: [],
      editCategorie: false,
    },
    {
      nom: 'Nul',
      images: [],
      editCategorie: false,
    },
  ];

  //Fonction appelé d'office au démarrage de l'application
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

  ajouterCategorie() {
    if (!this.saisiCategorie) {
      alert('Veuillez saisir un nom de categorie');
      return;
    }
    this.categories.push({
      nom: this.saisiCategorie,
      images: [],
      editCategorie: false,
    });
    this.saisiCategorie = '';
    this.sauvegarde();
  }

  removeCategories(indexCategorie: number) {
    //On déplace toutes les images dans la categoire au dessus
    if (this.categories.length >= 1) {
      const indexCategorieCible = indexCategorie === 0 ? 1 : indexCategorie - 1;

      this.categories[indexCategorieCible].images = [
        ...this.categories[indexCategorieCible].images,
        ...this.categories[indexCategorie].images,
      ];
      this.categories.splice(indexCategorie, 1);
      this.sauvegarde();
    }
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

  doubleClickNomCategorie(categorie: categorie, evenement: any) {
    categorie.editCategorie = true;
    const elementClique = evenement.target;
    const enTeteClique = elementClique.closest('.header');
    const inputEnTete = enTeteClique.querySelector('input');
    setTimeout(() => {
      inputEnTete.focus();
    }, 1);
  }

  onKeyUpTitreCategorie(categorie: categorie, evenement: any) {
    if(evenement.key == "Escape" || evenement.key == "Enter") {
      categorie.editCategorie = false
    }
    this.sauvegarde();
  }

  reset() {
    this.categories = [
      {
        nom: 'Super',
        images: [
          'https://media1.thrillophilia.com/filestore/8vh1qgvmud08c5vm2goj4aucretr_ew41nl9hgdajdas55cjfe02isgid_119.jpg',
        ],
        editCategorie: false,
      },
      {
        nom: 'Bien',
        images: [],
        editCategorie: false,
      },
      {
        nom: 'Moyen',
        images: [],
        editCategorie: false,
      },
      {
        nom: 'Pas top',
        images: [],
        editCategorie: false,
      },
      {
        nom: 'Nul',
        images: [],
        editCategorie: false,
      },
    ];

    this.sauvegarde();
  }
}
