import {Component, OnInit} from '@angular/core'
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms'
import {UsersService} from '../../services/users.service'
import {Observable, of} from 'rxjs'
import {UserI} from '../../models/user'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  nameCN = 'username'
  emailCN = 'email'

  users: UserI[] = []

  userForm = new FormGroup({
    [this.nameCN]: new FormControl('', [Validators.required]),
    [this.emailCN]: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(
    private readonly usersService: UsersService
  ) {
  }

  /**
   * Util method to get a Control from the form
   * @param controlName
   */
  formControl(controlName: string): AbstractControl {
    return this.userForm.get(controlName)!
  }

  async ngOnInit(): Promise<void> {
    await this.getUsers()
  }

  /**
   * Get all users from api
   */
  async getUsers(): Promise<void> {
    this.users = await this.usersService.getAll()
  }

  /**
   * Create an user and clear form
   */
  async createUser(): Promise<void> {
    await this.usersService.create({
      idUser: 0,
      name: this.formControl(this.nameCN)?.value,
      email: this.formControl(this.emailCN)?.value,
      status: true
    })
    this.getUsers()
    this.userForm.reset()
  }

}
