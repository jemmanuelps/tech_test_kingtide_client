import { FilesService } from './../../services/files.service';
import { formatDate } from '@angular/common';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {
  @Input() userId: string;
  public userForm: FormGroup;
  public fileForm: FormGroup;
  public photoForm: FormGroup;
  public user: User;

  constructor(
    private userService: UserService,
    private fileService: FilesService
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      this.getUser();
    }
    this.initializeFormBuilder();
    this.initializeFormBuilderFiles();
    this.initializeFormBuilderPhoto();
    this.userForm.disable();
  }

  ngOnChanges(): void {
    if (this.userId) {
      this.getUser();
    }
  }

  public saveFiles(): void {
    const file = {
      id: this.fileForm.value._id,
      data: this.fileForm.value.file
    }

    this.fileService.saveFile(file).subscribe({
      next: () => this.getUser(),
      error: (error) => console.error(error.message)
    })
  }

  public savePhoto(): void {
    const file = {
      id: this.photoForm.value._id,
      data: this.photoForm.value.photo
    }
    this.fileService.savePhoto(file).subscribe({
      next: () => this.getUser(),
      error: (error) => console.error(error.message)
    })
  }

  /**
   * @description Gets users list
   */
  private getUser(): void {
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe({
        next: (user: User) => {
          this.user = user;
          this.initializeFormBuilder();
          this.initializeFormBuilderFiles();
          this.initializeFormBuilderPhoto();
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

  /**
   * @description This method initilizes the form with its properties
   */
  private initializeFormBuilderFiles(): void {
    this.fileForm = new FormGroup({
      _id: new FormControl(this.user ? this.user._id : null, [Validators.required]),
      file: new FormControl(null, [Validators.required]),
    });
  }

  /**
   * @description This method initilizes the form with its properties
   */
  private initializeFormBuilderPhoto(): void {
    this.photoForm = new FormGroup({
      _id: new FormControl(this.user ? this.user._id : null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });
  }
}
