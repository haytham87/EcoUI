export interface RoleMenu {
    loggedInUserId: number
    id: number
    roleId: number
    menuId: number
    roleName: string
    menuName: string
    createdBy: number
    createdDate: string
    modifiedBy: number
    modifiedDate: string
    isDeleted: boolean
    inActive: boolean
    companyId: number
    roleMenus: number[]
  }
  