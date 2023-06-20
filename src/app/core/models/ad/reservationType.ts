export interface ReservationType{
    id:number;
    nameAr:string;
    nameEn:string;
    price:number;
    description: string;

    userIds:number[]
    reservUsers:any[]

}