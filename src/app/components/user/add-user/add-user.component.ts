import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { formatDate } from '@angular/common';

interface DialogData {
  userId: string;
}


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public userForm: FormGroup;
  public user: User;
  public title: string;
  public isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.initView();
    this.initializeFormBuilder();
  }

  public saveUser(): void {
    this.userService.saveUser(this.userForm.value).subscribe({
      next: () => {
        this.dialogRef.close('Saved');
      },
      error: () => {
        this.dialogRef.close();
      }
    });
  }

  public updateUser(): void {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.dialogRef.close('Saved');
      },
      error: () => {
        this.dialogRef.close();
      }
    })
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * @description Initialize view data
   */
  private initView(): void {
    this.data.userId ? this.title = 'Edit user:' : this.title = 'New user:';
    this.data.userId ? this.isEdit = true : this.isEdit = false;
    this.getUser();
  }

  /**
   * @description Gets users list
   */
  private getUser(): void {
    if (this.data.userId) {
      this.userService.getUser(this.data.userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.initializeFormBuilder();
        },
        error: (error) => {
          console.error(error.message);
        }
      });
    }
  }

  /**
   * @description This method initilizes the form with its properties
   */
  private initializeFormBuilder(): void {
    this.userForm = new FormGroup({
      _id: new FormControl(this.user ? this.user._id : null, [Validators.required]),
      name: new FormControl(this.user ? this.user.name : null, [Validators.required]),
      lastName: new FormControl(this.user ? this.user.lastName : null, [Validators.required]),
      surName: new FormControl(this.user ? this.user.surName : null, [Validators.required]),
      birthday: new FormControl(this.user ? formatDate(this.user.birthday, 'yyyy-MM-dd', 'en-US') : null, [Validators.required]),
      rfc: new FormControl(this.user ? this.user.rfc : null, [Validators.required])
    });
  }

}
