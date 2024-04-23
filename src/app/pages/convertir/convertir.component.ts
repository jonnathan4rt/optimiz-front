import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convertir',
  templateUrl: './convertir.component.html',
  styleUrls: ['./convertir.component.css']
})
export class ConvertirComponent {

  constructor(private router: Router) {}

  redirigirAInicio() {
    this.router.navigate(['/inicio']); // Redirige al componente de Inicio al hacer clic en el botón
  }

}
