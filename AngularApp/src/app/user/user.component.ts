import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  userId: number | null = null;
  isEditMode: boolean = false;
  user: User | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isActive: ['Active', Validators.required],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id; // Check if ID is provided

    if (this.isEditMode && id != '0') {
      this.userId = Number(id);
      this.userService.getUserById(this.userId).subscribe(
        (data: User) => {
          this.user = data;
          const obj = {
            ...this.user,
            isActive: this.user.isActive ? 'Active' : 'Inactive',
          };
          this.userForm.patchValue(obj);

          setTimeout(() => {
            Object.keys(this.userForm.controls).forEach((key) => {
              this.userForm.get(key)?.setErrors(null);
            });

            this.userForm.updateValueAndValidity();
          }, 20);
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.isEditMode = false;
      this.user = {
        id: 0,
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: '',
        email: '',
        isActive: true,
        todoCount: 0,
      };
    }
  }

  submitForm() {
    if (this.userForm.invalid) {
      return;
    }
    if (this.isEditMode) {
      // Edit mode: Update existing user
      const updatedUser: User = {
        id: this.userId!,
        ...this.userForm.value,
        isActive: this.userForm.value.isActive === 'Active',
      };

      this.userService.updateUser(updatedUser).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    } else {
      const newUser: User = {
        ...this.userForm.value,
        isActive: this.userForm.value.isActive === 'Active',
      };

      this.userService.addUser(newUser).subscribe(
        () => {
          this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    }
  }
}
