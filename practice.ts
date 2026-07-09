// interface BaseEntity{
//     id: number
// }

// interface Product extends BaseEntity{  name: string; price: number; }
// interface User extends BaseEntity {  email: string; role: string; }
// interface Order extends BaseEntity { totalAmount: number; }
// interface Voucher extends BaseEntity {  code: string; discount: number; }

// function logHeThong(data: BaseEntity): BaseEntity{
//     return data;
// }
// const aoSomi: Product = { id: 101, name: "Áo Sơ Mi", price: 250 };
// const admin: User = { id: 999, email: "admin@web.com", role: "ADMIN" };
// const donHangMoi: Order = { id: 555, totalAmount: 1200 };
// const maGiamGia: Voucher = { id: 777, code: "GIAM20", discount: 20 };

// const p = logHeThong(admin); 
// console.log(p.id) 
// console.log(p.email)  


// --- 1. RÚT TRÍCH ĐIỂM CHUNG VÀO INTERFACE CHA ---
interface BaseEntity {
    id: number; 
}

// --- 2. CÁC INTERFACE CON KẾ THỪA LẠI ---
interface Product extends BaseEntity { name: string; price: number; }
interface User extends BaseEntity { email: string; role: string; }
interface Order extends BaseEntity { totalAmount: number; }
interface Voucher extends BaseEntity { code: string; discount: number; }


function logHeThong<T extends BaseEntity>(data: T): T {
    return data
}

const aoSomi: Product = { id: 101, name: "Áo Sơ Mi", price: 250 };
const admin: User = { id: 999, email: "admin@web.com", role: "ADMIN" };
const donHangMoi: Order = { id: 555, totalAmount: 1200 };
const maGiamGia: Voucher = { id: 777, code: "GIAM20", discount: 20 };

const p = logHeThong(admin)
console.log(p.email)


