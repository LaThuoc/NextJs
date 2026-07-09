// generic cơ bản
function inGiaTri<T>(thamSo: T): T {
    console.log("Gia tri la:", thamSo)
    return thamSo
}
let ketQua1 = inGiaTri<string>("Hello Vincent")
let ketQua2 = inGiaTri<number>(10000)
console.log("================================")
// generic interface
interface ApiResponse<T>{
    status: "string",
    code: number;
    data: T;
}
interface User{
    id: number;
    name: string;
}
interface Product {
    id: number;
    price: number;
}
function responseProduct(doiTuong: Product): void{
    console.log("Ma ID la", doiTuong.id  )
}
responseProduct({id: 1, price: 20})
let responseUser: ApiResponse<User> = {
    status: "success",
    code: 200,
    data: {
        id: 101,
        name: 'Vincent'
    }
}
console.log(responseUser)


console.log("================================")

class UserInfo<T> {
    public tenChuThe: T;
    private soDu: T;
    constructor(ten: T, soDuBanDau: T){
        this.tenChuThe = ten;
        this.soDu = soDuBanDau;
    }

    public xemDoDu(): T {
        return this.soDu
    }
}
let tk = new UserInfo<string | number>("thuoc", 5000000)
console.log(tk)

class HopChua<T> {
    private noiDung: T;
    constructor(giaTriBanDau: T){
       
        this.noiDung = giaTriBanDau;
    }
    public layNoiDung(): T {
        return this.noiDung
    }
}

let hopChuaChuoi = new HopChua<string>("Mat khau bao bat")
let hopChuaSo = new HopChua<number>(200000)
console.log(hopChuaSo)

console.log("=================================")
// ràng buộc và phối hợp: ta dùng từ khóa extends để ra điều kiện "Tôi cho bạn linh hoạt kiểu dữ liệu nhưng kiểu đó bắt buộc phải có các thuốc tính tối thiểu mà tôi yêu cầu"
interface CoId{
    id: number
}
function logThongTin<T extends CoId>(doiTuong: T): void {
    console.log("Handling object has ID:", doiTuong.id)
}
logThongTin({id: 101, name:'Thuoc'})