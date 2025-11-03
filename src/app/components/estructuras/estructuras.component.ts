import { Component, OnInit } from '@angular/core';
import { Estructura } from '../../model/estructura.model';
import { EstructurasService } from '../../services/estructuras.service';

@Component({
  selector: 'app-estructuras',
  templateUrl: './estructuras.component.html',
  styleUrls: ['./estructuras.component.css']
})

export class EstructurasComponent implements OnInit {

  constructor(private estructurasService: EstructurasService) { }

  ngOnInit(): void {
    this.estructurasService.getEstructuras().subscribe(
      (data) => {
        this.estructuras = data;
      },
      (error) => {
        console.error('Error al obtener estructuras:', error);
      }
    );
  }
  isListView: boolean = true; // Control de vista lista o mosaico
  showModal: boolean = false; // Control de visibilidad del modal
  estructuras: Estructura[] = []; // Array de paneles
  newEstructura: Estructura = {
    id_estructura: 0,
    nombre: '',
    marca: '',
    precio: 0,
    garantia: '',
    origen: '',
    image: 'https://example.com/imagen.jpg',
    ficha_tecnica_pdf: 'https://example.com/fichas',
    activo: true
  };

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal() {
    this.estructurasService.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
      }
    );
    this.estructurasService.getOrigenes().subscribe(
      (data) => {
        this.origenes = data;
      },
      (error) => {
        console.error('Error al obtener origenes:', error);
      }
    );
    this.showModal = true;
  }

  reactivarEstructura(estructura: Estructura) {
    this.estructurasService.reactivarEstructura(estructura.id_estructura).subscribe(
      () => {
        estructura.activo = true;
        this.ordenarEstructuras();
      },
      (error) => {
        console.error('Error al reactivar estructura:', error);
      }
    )
  }

  closeModal() {
    this.showModal = false;
    // limpiar formulario y estado de edición
    this.editingEstructuraId = null;
    this.newEstructura = {
      id_estructura: 0,
      nombre: '',
      marca: '',
      precio: 0,
      garantia: '',
      origen: '',
      image: 'https://example.com/imagen.jpg',
      ficha_tecnica_pdf: 'https://example.com/fichas',
      activo: true
    };
  }

  marcas: any[] = [];
  origenes: any[] = [];

  addEstructura() {
    // Adaptar el objeto para que conincida con el backend
    const estructuraPayload = {
      nombre: this.newEstructura.nombre,
      id_marca_estructura: this.newEstructura.marca,
      precio: this.newEstructura.precio,
      garantia: this.newEstructura.garantia,
      id_origen_estructura: this.newEstructura.origen,
      imagen_url: this.newEstructura.image || 'https://example.com/imagen.jpg',
      ficha_tecnica_pdf: this.newEstructura.ficha_tecnica_pdf   || 'https://example.com/fichas',
      activo: true,
      nombre_marca: this.getMarcaNombre(Number(this.newEstructura.marca)),
      nombre_origen: this.getOrigenNombre(Number(this.newEstructura.origen))
    };
    if (this.editingEstructuraId) {
      // Edición PUT
      this.estructurasService.actualizarEstructura(this.editingEstructuraId, estructuraPayload).subscribe(
        (estructuraActualizada) => {
          //Actualizar la lista local
          this.estructuras = this.estructuras.map(e => e.id_estructura === this.editingEstructuraId ? estructuraActualizada : e);
          this.ordenarEstructuras();
          this.editingEstructuraId = null;
          this.newEstructura = {
            id_estructura: 0,
            nombre: '',
            marca: '',
            precio: 0,
            garantia: '',
            origen: '',
            image: 'https://example.com/imagen.jpg',
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar estructura:', error);
        }
      );
    } else {
      // Creación POST
      this.estructurasService.crearEstructura(estructuraPayload).subscribe(
        (estructuraCreada) => {
          this.estructuras.push(estructuraCreada);
          this.ordenarEstructuras();
          this.newEstructura = {
            id_estructura: 0,
            nombre: '',
            marca: '',
            precio: 0,
            garantia: '',
            origen: '',
            image: 'https://example.com/imagen.jpg',
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear estructura:', error);
        }
      );
    }
  }

  getMarcaNombre(id: number): string {
    const marca = this.marcas.find(m => m.id_marca_estructura === id);
    return marca ? marca.nombre : '';
  }

  getOrigenNombre(id: number): string {
    const origen = this.origenes.find(o => o.id_origen_estructura === id);
    return origen ? origen.nombre : '';
  }

  editEstructura(estructura: Estructura) {
    // Copiar los datos de la estructura seleccionada al formulario
    this.newEstructura = { ...estructura };
    this.openModal();
    this.editingEstructuraId = estructura.id_estructura;
  }

  editingEstructuraId: number | null = null;

  deleteEstructura(estructura: Estructura) {
    this.estructurasService.softDeleteEstructura(estructura.id_estructura).subscribe(
      () => {
        estructura.activo = false;
        this.ordenarEstructuras();
      },
      (error) => {
        console.error('Error al eliminar estructura:', error);
      }
    );
  }

  ordenarEstructuras() {
    const activas = this.estructuras.filter(e => e.activo).sort((a, b) => a.id_estructura - b.id_estructura);
    const inactivas = this.estructuras.filter(e => !e.activo).sort((a, b) => a.id_estructura - b.id_estructura);
    this.estructuras = [...activas, ...inactivas];
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newEstructura.image = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }
}
