export class User {
  id: number;
  userId: number;
  countryId: number;

  userTypeId: number;
  code: string;
  nameAr: string;
  nameEn:string;
  nickName:string;
  username: string;
  password: string;
  confirmPass:string;
  passwordHash: string;
  passwordSalt: string;
  photoBase64: string;
  mobile: string;
  email: string;
  city: string;
  signImage: string;
  activationKey: string;
  emailActivated: boolean;
  mobileActivated: boolean;
  createdDate: string;
  token: string;
  rank: string;
  isDisabled: boolean;
  unitName: string;
  unitIds: string;
  userRoles: any[];
  roleIds: any[];
  personId: string
  identityNo:any
  unitIdList: number[]
  roleId: number
  disabledInfoAr: string
  disabledInfoEn: string
  disabledString: string
  userTypeNameAr:string
  userTypeNameEn:string
  receveCode:number;
  confirmPassword: string;
}

export interface UserChangePassword {
  id:number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
