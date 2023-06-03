export interface Role {
  loggedInUserId: number
  id: number
  organizationId: number
  nameEn: string
  nameAr: string
  unitIds: string
  unitIdList: number[]
  rankIds: string
  rankIdList: number[]
  personTypeIds: string
  personTypeIdList: number[]
  requestTypeIds: string
  requestTypeIdList: number[]
  requestStatusIds: string
  requestStatusIdList: number[]
  description: string
  inActive: boolean
  requestStatusNameAr:string;
  isCreatedAutomatic: boolean
  roleMenus: any[];
  roleForms: any;
  parentId: number
  requestStatusPermisson:boolean;
  parentRoles: any[]
  }
  