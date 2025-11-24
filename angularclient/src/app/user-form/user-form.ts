// src/app/user-form/user-form.ts

import { Component, ChangeDetectorRef } from '@angular/core'; // 1. Import ChangeDetectorRef
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user-service';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http'; // 2. Import HttpErrorResponse

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss'
})
export class UserFormComponent {

  user: User;
  errorMessage: string = ''; // 3. Variable to hold the error message

  constructor(
    private route: ActivatedRoute, // (Optional: You can remove this if not using Edit mode)
    private router: Router,
    private userService: UserService,
    private cdr: ChangeDetectorRef // 4. Inject ChangeDetectorRef
  ) {
    this.user = new User();
  }

  onSubmit() {
    // 5. Clear previous errors
    this.errorMessage = '';

    // 6. Use the observer object syntax ({ next, error })
    this.userService.save(this.user).subscribe({
      next: (result: User) => {
        this.gotoUserList();
      },
      error: (err: HttpErrorResponse) => {
        // 7. Handle the error
        if (err.status === 400) {
          // If backend returns "Email already in use" as a 400
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Failed to add user. Please try again.';
        }

        console.error(err);
        // 8. Force UI update
        this.cdr.detectChanges();
      }
    });
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
