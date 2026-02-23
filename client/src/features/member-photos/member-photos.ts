import { Component, inject, OnInit, signal } from '@angular/core';
import { MembersService } from '../../core/services/members-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { photo } from '../../types/member';
import { ImageUpload } from '../../shared/image-upload/image-upload';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css'
})
export class MemberPhotos implements OnInit {
  protected memberService = inject(MembersService);
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
}
