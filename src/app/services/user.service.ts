import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * @description Gets users list
   * @returns Users list observable
   */
  public getUsers(): Observable<User[]> {
    const getPath = environment.API_URL + '/user';

    return this.http.get<User[]>(getPath);
  }

  /**
   * @description Gets user
   * @returns User observable
   */
  public getUser(userId: string): Observable<User> {
    const getPath = environment.API_URL + '/user/' + userId;

    return this.http.get<User>(getPath);
  }

  /**
   * @description Creates new user
   */
  public saveUser(user: User): Observable<void> {
    const getPath = environment.API_URL + '/user';

    return this.http.post<void>(getPath, user);
  }

  /**
   * @description Updates user
   */
  public updateUser(user: User): Observable<void> {
    const getPath = environment.API_URL + '/user/' + user._id;

    return this.http.put<void>(getPath, user);
  }

  /**
   * @description Deletes user
   */
  public deleteUser(userId: string): Observable<void> {
    const getPath = environment.API_URL + '/user/' + userId;

    return this.http.delete<void>(getPath);
  }
}
