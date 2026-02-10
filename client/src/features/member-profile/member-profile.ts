import { Component, inject, OnDestroy, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editablemember, Member } from '../../types/member';
import { DatePipe } from '@angular/common';
import { MembersService } from '../../core/services/members-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe, FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css'
})
export class MemberProfile implements OnInit, OnDestroy{
  
  @ViewChild('MemberProfileEditForm') memberProfileEditForm?: NgForm;
  private route = inject(ActivatedRoute);
  private toast= inject(ToastService);
  protected member = signal<Member | undefined>(undefined);
  protected membersService = inject(MembersService);
  protected editablemember: Editablemember = {
    displayName:  '',
      description:  '',
      city: '',
      country:  ''
  }

  ngOnInit() {
    this.route.parent?.data.subscribe(data => {
      this.member.set(data['member']);
    });

    this.editablemember = {
      displayName: this.member()?.displayName || '',
      description: this.member()?.description || '',
      city: this.member()?.city || '',
      country: this.member()?.country || ''
    };
    
  }

  ngOnDestroy(): void {
    if(this.membersService.editMode()) {
      this.membersService.editMode.set(false);
    }
  }

  updateProfile() {
    if (!this.member()) return;
    const updateMember = {...this.member(), ...this.editablemember};

    console.group('Update Profile');
    console.log(updateMember);
    console.groupEnd();
    this.toast.success('Profile updated successfully');
    this.membersService.editMode.set(false);

  }

  
}
