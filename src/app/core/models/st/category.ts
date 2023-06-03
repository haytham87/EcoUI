import { ItemPhoto } from "./itemPhoto"

export interface Category{
    id: number
    parentId: number
    code: string
    nameAr: string
    nameEn: string
    description: string
    hasChild: boolean;
    itemPhotos:ItemPhoto[]
}