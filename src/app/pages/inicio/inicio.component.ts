import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  constructor(private router: Router) {}

  redirigirAComprimir() {
    this.router.navigate(['/comprimir']); // Redirige al componente de Comprimir al hacer clic
  }

  redirigirAConvertir() {
    this.router.navigate(['/convertir']); // Redirige al componente de Convertir al hacer clic
  }
}
