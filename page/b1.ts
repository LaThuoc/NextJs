//  type guard

console.log("Cách 1 - Dành cho các kiểu dữ liệu nguyên thủy")

function check(input: string | number){
    if(typeof input === "number"){
        console.log("input là number")
    }else {
        console.log("input là string")
    }
}

console.log("Cách 2 - Dành cho các Class / Đối tượng khởi tạo")

class Waiter {
    phucVu(){
        console.log("Đang bưng bê món")
    }
}
class Chef{
    nauAn(){
        console.log("Đang nấu lẩu.....")
    }
}
function phanCongCongViec(nhanVien: Waiter | Chef){
    if(nhanVien instanceof Waiter){
        nhanVien.phucVu()
    } else {
        nhanVien.nauAn()
    }
}
console.log("Cách 3 - prop in object (Dành cho Interface / Type Alias")

interface KhachHang {
    ten: string;
}
interface KhachVip {
    ten: string;
    hangThe: string
}

function chaoKhach(khach: KhachHang | KhachHangVip){
    if("hangThe" in khach){
        console.log("Xin chào khách Vip")
    } else{
        console.log("Xin chào khách vãng lai")
    }
}

console.log("Cách 4 - Custom Type Guard (Hàm kiểm tra tự định nghĩa")
interface CaFe {
    ten: string;
    coGiaTangXay: boolean;
}
interface NuocNgot {
    ten: string;
    coGas: boolean;
}

function laCaFe(doUong: CaFe | NuocNgot): doUong is CaFe {
    return (doUong as CaFe).coGiaTangXay !== undefined
}

function phuVuDoUong(mon: CaFe | NuocNgot){
    if(laCaFe(mon)){
        console.log("Đang xay hạt CaFe")
    } else{
        console.log("Mở nắp non Nước Ngọt")
    }
}