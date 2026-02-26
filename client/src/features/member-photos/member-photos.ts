import { Component, inject, OnInit, signal } from '@angular/core';
import { MembersService } from '../../core/services/members-service';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Member, photo } from '../../types/member';
import { ImageUpload } from '../../shared/image-upload/image-upload';
import { User } from '../../types/user';
import { AccountService } from '../../core/services/account-service';
import { IconButton } from "../../shared/icon-button/icon-button";
import { DeleteButton } from '../../shared/delete-button/delete-button';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUpload, IconButton, DeleteButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos implements OnInit {
  protected memberService = inject(MembersService);
  protected accountService = inject(AccountService);
  private readonly route = inject(ActivatedRoute);
  protected photos = signal<photo[]>([]);
  protected loading = signal(false);

  
  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id') ;
    if(memberId)
      this.memberService.getPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos)
    });
  }

  get photoMocks(){
    return Array.from({length : 10}, (_, i) =>
      ({ url: "./user.png" })
    );
  }

  onUploadImage(file: File){
    this.loading.set(true);
    this.memberService.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberService.editMode.set(false);
        this.loading.set(false);
        this.photos.update(photos => [...photos, photo]);
      },
      error: err => {
        console.log("Error uploading photo", err);
        this.loading.set(false);
      }
    });

  }

  setMainPhoto(photo: photo){
    this.memberService.setMainPhoto(photo).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if(currentUser){
          currentUser.imageUrl = photo.url;
        }
        this.accountService.setCurrentUser(currentUser as User);
        this.memberService.member.update(member => ({
          ...member,
          imageUrl: photo.url,
        }) as Member);
      }
    });
  }

  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update(photos => photos.filter(p => p.id !== photoId))
      }
    });
  }
}
