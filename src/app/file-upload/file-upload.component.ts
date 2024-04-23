import { Component } from '@angular/core';
import { ImageServiceService } from '../image.service';

interface UploadedFile {
  name: string;
  size: string;
  selected: boolean;
  file: File; // Agregamos el archivo al objeto UploadedFile
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  numOfFiles: string = 'Ninguna imagen seleccionada';
  fileList: UploadedFile[] = [];

  constructor(private imageService: ImageServiceService) {}

  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList && fileList.length > 0) {
      this.numOfFiles = fileList.length === 1 ? '1 Imagen Seleccionada' : `${fileList.length} Imágenes Seleccionadas`;
      this.fileList = Array.from(fileList).map((file: File) => ({
        name: file.name,
        size: this.getFileSize(file.size),
        selected: false,
        file: file // Guardamos el archivo en el objeto UploadedFile
      }));
    }
  }

  onUpload() {
    this.fileList.forEach((uploadedFile: UploadedFile) => {
      this.imageService.compressImage(uploadedFile.file).subscribe({
        next: (compressedImage: Blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(compressedImage);
          downloadLink.download = `compressed_${uploadedFile.name}`;
          downloadLink.click();
        },
        error: (error: any) => {
          console.error(`Error al comprimir la imagen ${uploadedFile.name}`, error);
        }
      });
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
