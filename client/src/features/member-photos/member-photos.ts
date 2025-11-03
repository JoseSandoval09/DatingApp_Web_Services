import { Component, inject } from '@angular/core';
import { MembersService } from '../../core/services/members-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { photo } from '../../types/member';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<photo[]>;

  constructor()  {
    const memberId = this.route.parent?.snapshot.paramMap.get('id') ;
    if(memberId)
      this.photos$ = this.memberService.getPhotos(memberId);
  }

  get photoMocks(){
    return Array.from({length : 20}, (_, i) =>
      ({ url: "./user.png" })
    );
  }
}
