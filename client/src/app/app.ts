import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { User } from '../types/user';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [Nav, RouterOutlet,NgClass],
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  protected router= inject(Router)
  private http: HttpClient = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<User[]>([]);


  async ngOnInit(): Promise<void> { 
    this.setCurrentUser();
    this.members.set(await this.getMembers());
  }

  setCurrentUser(){
    const userString = localStorage.getItem("user");
    if(!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

   async getMembers(): Promise<User[]> {
    try {
     return lastValueFrom (this.http.get<User[]>("https://localhost:7131/api/members"))
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}
