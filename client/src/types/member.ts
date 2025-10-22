export interface Member {
    id: string;
    birthDay: string;
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
