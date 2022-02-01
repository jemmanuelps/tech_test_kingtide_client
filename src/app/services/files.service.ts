import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Saves file
   */
  public saveFile(file: any): Observable<void> {
    const getPath = environment.API_URL + '/files';

    return this.http.post<void>(getPath, file);
  }

  /**
   * @description Saves photo
   */
  public savePhoto(file: any): Observable<void> {
    const getPath = environment.API_URL + '/photo';

    return this.http.post<void>(getPath, file);
  }
}
