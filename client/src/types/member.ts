export interface Member {
    id: string;
    birthDate: string;
    imageUrl?: string;
    displayName: string;
    created: string;
    lastActive: string;
    gender: string;
    description?: string;
    city: string;
    country: string;
}

export interface photo {
    id: number;
    url: string;
    publicId?: string;
    memberId: string;
}

export type Editablemember = {
    displayName: string;
    description?: string;
    city: string;
    country: string;
}

export class MemberParams {
  gender?: string;
  minAge = 18;
  maxAge = 120;
  pageNumber = 1;
  pageSize = 10;
}
