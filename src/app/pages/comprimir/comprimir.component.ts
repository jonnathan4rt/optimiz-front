import { Component } from '@angular/core';
import { ImageServiceService } from '../../image.service';

interface UploadedFile {
  name: string;
  size: string;
  selected: boolean;
  file: File; 
}

@Component({
  selector: 'app-comprimir',
  templateUrl: './comprimir.component.html',
  styleUrls: ['./comprimir.component.css']
})
export class ComprimirComponent {
  numOfFiles: string = 'Ninguna imagen seleccionada';
  fileList: UploadedFile[] = [];
  errorMessage: string = '';

  constructor(private imageService: ImageServiceService) {}
  
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
  
    if (files && files.length > 0) {
      const MAX_BATCH_SIZE_MB = 100; // Tamaño máximo permitido por lote en MB
      const MAX_FILE_SIZE_MB = 100; // Tamaño máximo permitido para cada archivo en MB
  
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']; // Tipos de imagen permitidos
      let totalSize = this.calculateTotalSize(); // Obtenemos el tamaño actual de los archivos seleccionados
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileSize = file.size;
  
        if (
          validImageTypes.includes(file.type) &&
          fileSize <= MAX_FILE_SIZE_MB * 1024 * 1024 &&
          totalSize + fileSize <= MAX_BATCH_SIZE_MB * 1024 * 1024
        ) {
          const uploadedFile: UploadedFile = {
            name: file.name,
            size: this.getFileSize(fileSize),
            selected: false,
            file: file
          };
  
          this.fileList.push(uploadedFile);
          totalSize += fileSize; // Actualizamos el tamaño total con el tamaño del archivo recién agregado
        } else {
          alert('El tamaño máximo permitido por lote es de 100MB.');
          this.fileList = []; // Reiniciamos la lista de archivos seleccionados
          this.numOfFiles = 'Ninguna imagen seleccionada'; // Restauramos el mensaje de cantidad de archivos seleccionados
          this.errorMessage = 'Intenta con un número menor de imágenes.';
          return;
        }
      }
  
      this.errorMessage = '';
      this.updateNumOfFiles();
    }
  }
  
  calculateTotalSize(): number {
    return this.fileList.reduce((total, file) => total + file.file.size, 0);
  }
  
  
  updateNumOfFiles() {
    this.numOfFiles = this.fileList.length === 1 ? '1 Imagen Seleccionada' : `${this.fileList.length} Imágenes Seleccionadas`;
  }

  onUpload() {
    this.fileList.forEach((uploadedFile: UploadedFile) => {
      this.imageService.compressImage(uploadedFile.file).subscribe(
        (compressedImage: Blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(compressedImage);
          downloadLink.download = `comprimido_${uploadedFile.name}`;
          downloadLink.click();
        },
        error => {
          console.error(`Error al comprimir la imagen ${uploadedFile.name}`, error);
        }
      );
    });
  }

  getFileSize(size: number): string {
    const fileSizeKB = (size / 1024).toFixed(1);
    if (size >= 1024) {
      return (size / (1024 * 1024)).toFixed(1) + 'MB';
    }
    return fileSizeKB + 'KB';
  }

  toggleSelection(index: number) {
    this.fileList.forEach((file, i) => {
      file.selected = index === i ? !file.selected : false;
    });
  }
}
