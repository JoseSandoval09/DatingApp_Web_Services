import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Editablemember, Member, MemberParams  } from '../../types/member';
import { Observable, tap } from 'rxjs';
import { AccountService } from './account-service';
import { photo } from '../../types/member';
import {PaginationResult} from '../../types/paginationMetadata';


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

  getMembers(memberParams: MemberParams): Observable<PaginationResult<Member>> {
    let params = new HttpParams();
    params = params.append('pageNumber', memberParams.pageNumber);
    params = params.append('pageSize', memberParams.pageSize);
    params = params.append('minAge', memberParams.minAge);
    params = params.append('maxAge', memberParams.maxAge);
    params = params.append('orderBy', memberParams.orderBy);
    if (memberParams.gender) params = params.append('gender', memberParams.gender);

    return this.http.get<PaginationResult<Member>>(this.baseUrl + "members", { params }).pipe(
      tap(() => {
        localStorage.setItem('filters', JSON.stringify(memberParams));
      })
    );
  }

  getPhotos(id:string){
    return this.http.get<photo[]>(`${this.baseUrl}members/${id}/photos`);
  }

  updateMember(member: Editablemember){
    return this.http.put(this.baseUrl + "members", member);
  }

  uploadPhoto(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<photo>(this.baseUrl + "members/photo", formData);
  }

  setMainPhoto(photo: photo){
    return this.http.put(this.baseUrl + "members/photo/" + photo.id,{});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'members/photo/' + photoId);
  }

}