import { Component, OnInit } from '@angular/core';
import { Panel } from '../../model/panel.model';
import { PanelesService } from '../../services/paneles.service';

@Component({
  selector: 'app-paneles',
  templateUrl: './paneles.component.html',
  styleUrls: ['./paneles.component.css']
})

export class PanelesComponent implements OnInit {
  constructor(private panelesService: PanelesService) { }

  ngOnInit(): void {
    this.panelesService.getPaneles().subscribe(
      (data) => {
        this.paneles = data;
      },
      (error) => {
        console.error('Error al obtener paneles:', error);
      }
    );
  }
  isListView: boolean = true; // Control de vista lista o mosaico
  showModal: boolean = false; // Control de visibilidad del modal
  paneles: Panel[] = []; // Array de paneles
  newPanel: Panel = {
    id_panel: 0,
    nombre: '',
    marca: '',
    potencia: 0,
    precio: 0,
    garantia: '',
    origen: '',
    isc: '',
    voc: '',
    vmp: '',
    image: "https://example.com/imagen.jpg",
    ficha_tecnica_pdf: 'https://example.com/fichas',
    activo: true
  };

  toggleView() {
    this.isListView = !this.isListView;
  }

  openModal() {
    // Cargar marcas y origenes al abrir el modal
    this.panelesService.getMarcas().subscribe(
      (data) => {
        this.marcas = data;
      },
      (error) => {
        console.error('Error al obtener marcas:', error);
      }
    );
    this.panelesService.getOrigenes().subscribe(
      (data) => {
        this.origenes = data;
      },
      (error) => {
        console.error('Error al obtener origenes:', error);
      }
    );
    this.showModal = true;
  }

  reactivarPanel(panel: Panel) {
    this.panelesService.reactivarPanel(panel.id_panel).subscribe(
      () => {
        panel.activo = true;
        this.ordenarPaneles();
      },
      (error) => {
        console.error('Error al reactivar panel:', error);
      }
    );
  }

  closeModal() {
    this.showModal = false;
    // Limpiar formulario y estado de edición
    this.editingPanelId = null;
    this.newPanel = {
      id_panel: 0,
      nombre: '',
      marca: '',
      potencia: 0,
      precio: 0,
      garantia: '',
      origen: '',
      isc: '',
      voc: '',
      vmp: '',
      image: "https://example.com/imagen.jpg",
      ficha_tecnica_pdf: 'https://example.com/fichas',
      activo: true
    };
  }

  marcas: any[] = []; 
  origenes: any[] = []; 

  addPanel() {
    // Adaptar el objeto para que coincida con el backend
    const panelPayload = {
      nombre: this.newPanel.nombre,
      id_marca_panel: this.newPanel.marca,
      potencia: this.newPanel.potencia,
      precio: this.newPanel.precio,
      garantia: this.newPanel.garantia,
      id_origen_panel: this.newPanel.origen,
      isc: this.newPanel.isc,
      voc: this.newPanel.voc,
      vmp: this.newPanel.vmp,
      imagen_url: this.newPanel.image || 'https://example.com/imagen.jpg',
      ficha_tecnica_pdf: this.newPanel.ficha_tecnica_pdf || 'https://example.com/fichas/lg.pdf',
      activo: true,
      nombre_marca: this.getMarcaNombre(Number(this.newPanel.marca)),
      nombre_origen: this.getOrigenNombre(Number(this.newPanel.origen))
    };
    if (this.editingPanelId) {
      // Edición: PUT
      this.panelesService.actualizarPanel(this.editingPanelId, panelPayload).subscribe(
        (panelActualizado) => {
          // Actualizar la lista local
          this.paneles = this.paneles.map(p => p.id_panel === this.editingPanelId ? panelActualizado : p);
          this.ordenarPaneles();
          this.editingPanelId = null;
          this.newPanel = {
            id_panel: 0,
            nombre: '',
            marca: '',
            potencia: 0,
            precio: 0,
            garantia: '',
            origen: '',
            isc: '',
            voc: '',
            vmp: '',
            image: "https://example.com/imagen.jpg",
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al actualizar panel:', error);
        }
      );
    } else {
      // Alta nueva: POST
      this.panelesService.crearPanel(panelPayload).subscribe(
        (panelCreado) => {
          this.paneles.push(panelCreado);
          this.newPanel = {
            id_panel: 0,
            nombre: '',
            marca: '',
            potencia: 0,
            precio: 0,
            garantia: '',
            origen: '',
            isc: '',
            voc: '',
            vmp: '',
            image: "https://example.com/imagen.jpg",
            ficha_tecnica_pdf: 'https://example.com/fichas',
            activo: true
          };
          this.closeModal();
        },
        (error) => {
          console.error('Error al crear panel:', error);
        }
      );
    }
  }

  getMarcaNombre(id: number) {
    const marca = this.marcas.find(m => m.id_marca_panel === id);
    return marca ? marca.nombre_marca : '';
  }

  getOrigenNombre(id: number) {
    const origen = this.origenes.find(o => o.id_origen_panel === id);
    return origen ? origen.nombre_origen : '';
  }

  editPanel(panel: Panel) {
    // Copiar los datos del panel seleccionado al formulario
    this.newPanel = { ...panel };
    this.openModal();
    this.editingPanelId = panel.id_panel;
  }
  editingPanelId: number | null = null;

  deletePanel(panel: Panel) {
    this.panelesService.softDeletePanel(panel.id_panel).subscribe(
      () => {
        panel.activo = false;
        this.ordenarPaneles();
      },
      (error) => {
        console.error('Error al eliminar panel:', error);
      }
    );
  }
  
  ordenarPaneles() {
    const activos = this.paneles.filter(p => p.activo).sort((a, b) => a.id_panel - b.id_panel);
    const inactivos = this.paneles.filter(p => !p.activo).sort((a, b) => a.id_panel - b.id_panel);
    this.paneles = [...activos, ...inactivos];
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newPanel.image = e.target?.result || null;
      };
      reader.readAsDataURL(file);
    }
  }
}
