import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../../core/services/members-service';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';

@Component({
  selector: 'app-member-detail',
  imports: [AsyncPipe, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './member-detail.html',
  styleUrl: './member-detail.css'
})
export class MemberDetail implements OnInit {
  private memberService = inject(MembersService);
  private route = inject(ActivatedRoute);
  protected member$?: Observable<Member>;

  ngOnInit(): void {
    this.member$ = this.loadMember();
  }

  loadMember(): Observable<Member> | undefined {
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      return this.memberService.getMember(id);

    }

    return;
  }
}
