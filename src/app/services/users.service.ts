import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {UserI} from '../models/user'
import {environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) {
  }

  getAll(): Promise<UserI[]> {
    return this.http.get<UserI[]>(`${environment.apiUrl}/users`).toPromise()
  }

  create(user: UserI): Promise<object> {
    return this.http.post<object>(`${environment.apiUrl}/users`, user).toPromise()
  }
}
