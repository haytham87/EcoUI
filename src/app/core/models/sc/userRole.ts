export interface UserRole {
    loggedInUserId: number
    id: number
    roleId: number
    userId:number;
    userIds:string[];
    userName: string
    roleName: string
    nameAr:string;
    identityNo:string;
    personMopile: string;
    createdBy: number
    createdDate: string
    modifiedBy: number
    modifiedDate: string
    isDeleted: boolean
    inActive: boolean
    companyId: number
    userRoles: number[]
  }
  