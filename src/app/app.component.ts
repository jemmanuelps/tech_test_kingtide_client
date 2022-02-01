import { AddUserComponent } from './components/user/add-user/add-user.component';
import { User } from './models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public users: User[] = [];
  public userId: string;

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.initView();
  }

  public onSelectUser(userId: string) {
    this.userId = userId;
  }

  public addEditUser(userData?: User): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {
        userId: userData?._id
      },
      width: '60vw',
      height: '60vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

/**
 * @description Deletes user
 * @param {User} userData data of the user to delete
 */
public deleteUser(userData: User): void {
    this.userService.deleteUser(userData._id).subscribe({
      next: () => this.getUsers(),
      error: (error) => console.error(error.message)
    });
  }

  /**
   * @description Initialize view data
   */
  private initView(): void {
    this.getUsers();
  }
  
  /**
   * @description Gets users list
   */
  private getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error(error.message);
      }
    });
  }
  
}
