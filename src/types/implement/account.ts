import { BaseEntity } from "../base-entity";

export interface Account extends BaseEntity {
   email: string;
   phone: string;
   detailInformation?: DetailInformation;
   
}

export interface DetailInformation extends BaseEntity {
   fullName?: string;
   address?: string;
   bio?: string;
   dateOfBirth?: Date;
   avatarUrl?: string;
}