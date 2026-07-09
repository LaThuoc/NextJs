type nhanVien = {id: number; ten: string}
type baoMat = {quyenHan: string}

let adminAccount: nhanVien & baoMat = {
    id: 99,
    ten: "Nguyen Van A",
    quyenHan: "ADMIN"
}

console.log(adminAccount)

// 3. Type Alias (Đặt tên custom cho kiểu dữ liệu)
// Ý nghĩa: Dùng từ khóa type để gom một cấu trúc phức tạp lại thành một cái tên ngắn gọn, giúp tái sử dụng nhiều lần.

type toaDo = {x: number; y: number}
let diemA: toaDo = {x: 10, y: 20}
let diemB: toaDo = {x: 5, y: 20}
console.log(diemA)

interface hinhDang {
    banKinh: number;
}

interface hinhTron extends hinhDang {
    banKinh: number;
} 
let quaBong: hinhTron = {
    // mauSac: "red",
    banKinh: 15

}
console.log(quaBong)

// Ép kiểu dữ liệu
let duLieuAPI: any = "Đây chắc chắn là chuỗi chữ"
let doDai = (duLieuAPI as string).length
console.log(doDai)

function inKetQua(dauVao: string | number): void{
    if(typeof dauVao === "string"){
        console.log(dauVao.toUpperCase())
    } else{
        console.log(dauVao * 2)
    }
}
inKetQua(20)
console.log("========================================")
let khachHang: {name: string, thongTinShip?: {diaChi: string}} = {
    name: "Hung",
    thongTinShip: {
        diaChi: "123, Nguyen Trai, Thanh Xuan, Ha Noi"
    }

}
console.log(khachHang.thongTinShip?.diaChi)

console.log("================================")
type nguoiDung = {
    id: number;
    ten: string;
    email?:string;
}
function hienThiThongTin(user: nguoiDung){
    console.log("id:", user.id)
    console.log("Tên:", user.ten.toUpperCase());
    console.log("Email:", user.email ?? "Chưa cập nhật email");
}
const user1: nguoiDung = {
    id: 1,
    ten: "Hung"
}
hienThiThongTin(user1)

console.log("================================")
type staff = {
    id: number;
    name: string;
}
type salary = {
    luong: number,
}
type staffFullTime = staff & salary;
const nv1: staffFullTime = {
    id: 1,
    name: "Hung",
    luong: 10000000

}
console.log(nv1)
console.log("================================")

function dangNhap(account: string | number){
    if(typeof account === "string"){
        console.log("Đăng nhập bằng email", account)
    } else {
        console.log("Đăng nhập bằng ID", account)
    }
}
dangNhap(1234455)
dangNhap("admin@gmail.com");
console.log("================================")

interface diaChi {
    thanhPho: string;
    quan: string;
}
interface khachHang {
    ten: string;
    diaChi?: diaChi
}
function inDiaChi(guest: khachHang){
    console.log("Ten:", guest.ten)
    console.log("Dia chi:", 
        guest.diaChi 
            ? `${guest.diaChi.thanhPho}-${guest.diaChi.quan}`
            : 'Chưa cập nhật địa chỉ'
    )
}
const guest1: khachHang = {
    ten: 'Hung'
}
const guest2: khachHang = {
    ten: "Thuoc",
    diaChi: {
        thanhPho: "Ha Noi",
        quan: "Ha Dong"
    }
}
inDiaChi(guest1)
inDiaChi(guest2)

console.log("================================")
interface Product  {
    id: number;
    name: string;
    price: number;
    discount?: number;
}
function showInfo(product: Product){
    console.log("Tên:", product.name);
    console.log("Giá:", product.price);
    console.log("Giảm giá:", product.discount ?? 0, "%");
}

const product1: Product = {
    id: 1,
    name: "Laptop",
    price: 20000000
};
showInfo(product1)