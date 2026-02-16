import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Editablemember, Member } from '../../types/member';
import { Observable, tap } from 'rxjs';
import { AccountService } from './account-service';
import { photo } from '../../types/member';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode = signal(false);
  member = signal<Member | null>(null);
  
  private accountService = inject(AccountService);
  

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseUrl + "members/" + id).pipe(
      tap(member => this.member.set(member))
    )
  }

  getMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseUrl + "members");
  }

  getPhotos(id:string){
    return this.http.get<photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  updateMember(member: Editablemember){
    return this.http.put(this.baseUrl + "members", member);
  }
}