import { Component, OnInit } from '@angular/core';
import { Inversor } from '../../model/inversor.model';
import { InversoresService } from '../../services/inversores.service';

@Component({
  selector: 'app-inversores',
  templateUrl: './inversores.component.html',
  styleUrls: ['./inversores.component.css']
})

export class InversoresComponent implements OnInit {
  constructor(private inversoresService: InversoresService) { }

  ngOnInit(): void {
    this.inversoresService.getInversores().subscribe(
      (data) => {
        this.inversores = data;
      },
      (error) => {
        console.error('Error al obtener inversores:', error);
      }
    );
  }
  isListView: boolean = true; // Control de vista lista o mosaico
  showModal: boolean = false; // Control de visibilidad del modal
  inversores: Inversor[] = []; // Array de paneles
  newInversor: Inversor = {
    id_inversor: 0,
    nombre: '',
    marca: '',
    potencia: 0,
    precio: 0,
    garantia: '',
    origen: '',
    pmin: '',
    pmax: '',
    vmin: '',
    vmax: '',
    isc: '',
    image: "https://example.com/imagen.jpg",
    ficha_tecnica_pdf: "https://example.com/fichas",
    activo: true
  };

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal() {
    this.inversoresService.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
      }
    );
    this.inversoresService.getOrigenes().subscribe(
      (data) => {
        this.origenes = data;
      },
      (error) => {
        console.error('Error al obtener origenes:', error);
      }
    );
    this.showModal = true;
  }

  reactivarInversor(inversor: Inversor) {
    this.inversoresService.reactivarInversor(inversor.id_inversor).subscribe(
      () => {
        inversor.activo = true;
        this.ordenarinversores();
      },
      (error) => {
        console.error('Error al reactivar inversor:', error);
      }
    )
  }

  closeModal() {
    this.showModal = false;
    //limpiar formulario y estado de edición
    this.editingInversorId = null;
    this.newInversor = {
      id_inversor: 0,
      nombre: '',
      marca: '',
      potencia: 0,
      precio: 0,
      garantia: '',
      origen: '',
      pmin: '',
      pmax: '',
      vmin: '',
      vmax: '',
      isc: '',
      image: "https://example.com/imagen.jpg",
      ficha_tecnica_pdf: "https://example.com/fichas",
      activo: true
    };
  }

  marcas: any[] = [];
  origenes: any[] = [];

  addInversor() {
    // Adaptar el objeto para que coincida con el backend
    const inversorPayload = {
      nombre: this.newInversor.nombre,
      id_marca_inversor: this.newInversor.marca, // Debe ser el id, ajustar si es necesario
      potencia: this.newInversor.potencia,
      precio: this.newInversor.precio,
      garantia: this.newInversor.garantia,
      id_origen_inversor: this.newInversor.origen, // Debe ser el id, ajustar si es necesario
      pmin: this.newInversor.pmin,
      pmax: this.newInversor.pmax,
      vmin: this.newInversor.vmin,
      vmax: this.newInversor.vmax,
      isc: this.newInversor.isc,
      imagen_url: this.newInversor.image || 'https://example.com/imagen.jpg',
      ficha_tecnica_pdf: this.newInversor.ficha_tecnica_pdf || 'https://example.com/fichas',
      activo: true,
      nombre_marca: this.getMarcaNombre(Number(this.newInversor.marca)),
      nombre_origen: this.getOrigenNombre(Number(this.newInversor.origen))
    };
    if (this.editingInversorId) {
      // Edición: PUT
      this.inversoresService.actualizarInversor(this.editingInversorId, inversorPayload).subscribe(
        (inversorActualizado) => {
          // Actualizar la lista local
          this.inversores = this.inversores.map(i => i.id_inversor === this.editingInversorId ? inversorActualizado : i);
          this.ordenarinversores();
          this.editingInversorId = null;
          this.newInversor = {
            id_inversor: 0,
            nombre: '',
            marca: '',
            potencia: 0,
            precio: 0,
            garantia: '',
            origen: '',
            pmin: '',
            pmax: '',
            vmin: '',
            vmax: '',
            isc: '',
            image: "https://example.com/imagen.jpg",
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear inversor:', error);
        }
      );
    } else {
      // Alta nueva: POST
      this.inversoresService.crearInversor(inversorPayload).subscribe(
        (inversorCreado) => {
          this.inversores.push(inversorCreado);
          this.ordenarinversores();
          this.newInversor = {
            id_inversor: 0,
            nombre: '',
            marca: '',
            potencia: 0,
            precio: 0,
            garantia: '',
            origen: '',
            pmin: '',
            pmax: '',
            vmin: '',
            vmax: '',
            isc: '',
            image: "https://example.com/imagen.jpg",
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear inversor:', error);
        }
      );
    }
  }

  getMarcaNombre(id: number) {
    const marca = this.marcas.find(m => m.id_marca_inversor === id);
    return marca ? marca.nombre_marca : '';
  }

  getOrigenNombre(id: number) {
    const origen = this.origenes.find(o => o.id_origen_inversor === id);
    return origen ? origen.nombre_origen : '';
  }

  editInversor(inversor: Inversor) {
    // Copiar los datos del inversor seleccionado al formulario
    this.newInversor = { ...inversor };
    this.openModal();
    this.editingInversorId = inversor.id_inversor;
  }

  editingInversorId: number | null = null;

  deleteInversor(inversor: Inversor) {
    this.inversoresService.softDeleteInversor(inversor.id_inversor).subscribe(
      () => {
        inversor.activo = false;
        this.ordenarinversores();
      },
      (error) => {
        console.error('Error al eliminar inversor:', error);
      }
    );
  }
  
  ordenarinversores() {
    const activos = this.inversores.filter(i => i.activo).sort((a, b) => a.id_inversor - b.id_inversor);
    const inactivos = this.inversores.filter(i => !i.activo).sort((a, b) => a.id_inversor - b.id_inversor);
    this.inversores = [...activos, ...inactivos];
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newInversor.image = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }
}
