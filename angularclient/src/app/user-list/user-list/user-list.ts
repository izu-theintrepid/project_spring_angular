// In src/app/user-list/user-list/user-list.ts

import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
// 1. FIX: The file is named 'user-service', not 'user.service'
import { UserService } from '../../service/user-service';
import { CommonModule } from '@angular/common'; // 2. FIX: Import CommonModule

@Component({
  selector: 'app-user-list',
  standalone: true, // 3. FIX: Make the component standalone
  imports: [CommonModule], // 4. FIX: Import modules needed by the template (like *ngFor)
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss' // 5. FIX: Changed to styleUrl (singular)
})
export class UserListComponent implements OnInit {

  // 6. FIX: Initialize the property to avoid the TS2564 error
  users: User[] = [];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // 7. FIX: Add type 'User[]' to data to avoid the 'any' error
    this.userService.findAll().subscribe((data: User[]) => {
      this.users = data;
    });
  }
}
