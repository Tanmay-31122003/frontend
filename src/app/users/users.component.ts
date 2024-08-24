import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../service/user.service';
import User from '../types/user';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] // corrected property name
})
export class UsersComponent implements OnInit { // implements OnInit added
  users: User[] = [];
  userService = inject(UserService);

  ngOnInit() {
    this.userService.getUsers().subscribe((result) => {
      this.users = result;
      console.log(this.users);
    });
  }

  delete(id:string){
    const ok = confirm("Are you sure want to delete user ?");
    if(ok){
      this.userService.deleteUser(id).subscribe((result)=>{
        alert("User deleted Succesfuly.");
        this.users=this.users.filter(u=>u._id != id)
      })
    }
  }
}