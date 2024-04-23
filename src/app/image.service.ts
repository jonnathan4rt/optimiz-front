import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  getFileName(file: File) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  compressImage(file: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post('http://localhost:8080/compress', formData, {
      responseType: 'blob'
    });
  }
  
  }

