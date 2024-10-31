import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-back-office',
  standalone: true,
  imports: [],
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.scss',
})
export class BackOfficeComponent {
  http = inject(HttpClient);

  utilisateurs: any = [];

  bloque = false;

  ngOnInit() {
    this.http
      .get('http://localhost:3000/utilisateurs')
      .subscribe((data: any) => {
        this.utilisateurs = data;
      });
  }

  toggleBloque(utilisateur: any, index: number) {
    this.http
      .put('http://localhost:3000/utilisateurs', { id: utilisateur.id })
      .subscribe((response: any) => {
        this.utilisateurs[index].bloque = !this.utilisateurs[index].bloque;
      });
  }
}
