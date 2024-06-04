import {Component, OnInit} from '@angular/core';
import { z } from "zod";


// With Zod
const userSchema = z.object({
  name: z.string(),
}).readonly();
const userListSchema = z.array(userSchema).readonly();
type UserList = z.infer<typeof userListSchema>;

// Without Zod
type UserListWithoutZod = readonly { readonly name: string }[];

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Here for the infer weird bug</h1>
    @for(user of userList; track user) {
      <p>{{ user.name }}</p>
    }
    @for(user of userListWithoutZod; track user) {
      <p>{{ user.name }}</p>
    }
  `,
})
export class AppComponent implements OnInit {
  public userList: UserList = [{ name: 'John' }, { name: 'Doe' }];
  public userListWithoutZod: UserListWithoutZod = [{ name: 'John' }, { name: 'Doe' }];

  public ngOnInit(): void {
    for (const user of this.userList) {
      // Well inferred here
      console.log(user.name);
    }
  }
}
