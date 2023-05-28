export interface RoleForm {
    loggedInUserId: number
    id: number
    roleId: number
    formId: number
    createdBy: number
    createdDate: string
    modifiedBy: number
    modifiedDate: string
    isDeleted: boolean
    inActive: boolean
    formNameEn: string
    roleForms: number[]
}