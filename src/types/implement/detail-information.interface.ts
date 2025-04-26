import { avatar } from '@/assets/images';
import { BaseEntity } from "../base-entity";


export interface IDetailInformation extends BaseEntity {
   fullName?: string;
   // address?: string;
   // bio?: string;
   dateOfBirth?: Date;
   avatar?: string;
   avatarUrl?: string;
   gender?: boolean;
   thumbnailUrl?: string;
}