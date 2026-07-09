
class NhanVien {
    ten: string;
    luongCoBan: number;
    soNgayCong: number;

    constructor(ten: string, luong: number, ngayCong:number){
        this.ten = ten;
        this.luongCoBan = luong;
        this.soNgayCong = ngayCong;
    }
    tinhLuongThucNhan(): number {
        return (this.luongCoBan / 26) * this.soNgayCong
    }
}
let nv1 = new NhanVien('Hoang', 26000000, 24)
console.log(nv1.tinhLuongThucNhan())
console.log("=====================================")
class TaiKhoanNganHang {
    public tenChuThe: string;
    public soDu: number;

    constructor(ten: string, soDuBanDau: number){
        this.tenChuThe = ten;
        this.soDu = soDuBanDau;
    }

    // public xemSoDu(){
    //     return this.soDu
    // }
}
let tk = new TaiKhoanNganHang("Thuoc", 1000000)
console.log(tk.tenChuThe)
tk.soDu = 50000000
console.log(tk.soDu)

console.log
class NguoiDung {
    private  _tuoi: number = 0

    get tuoi(): number {
        return this._tuoi;
    }
    set tuoi(tuoiMoi: number){
        if(tuoiMoi < 0){
            console.log("Tuoi khong the am!")
            return;
        }
        this._tuoi = tuoiMoi
    }
}
let user = new NguoiDung()
user.tuoi = -5

console.log("============================================")

abstract class NhanVienAbstract {
    ten: string;
    constructor(ten: string){
        this.ten = ten;
    }
    abstract tinhLuong(): number
}

class NhanVienVanPhongMoi extends NhanVienAbstract {
    luongCoBan: number = 15000000;
    tinhLuong(): number {
        return this.luongCoBan;
    }
}

class NhanVienPartTimeMoi extends NhanVienAbstract {
    luongTheoGio: number = 50000;
    soGioLam: number = 80
    tinhLuong(): number {
        return this.luongTheoGio
    }
}

function inPhieuLuong(nv: NhanVienAbstract){
    let luongThucNhan = nv.tinhLuong()
    console.log(`Nhân Viên: ${nv.ten} - Lương: ${luongThucNhan}`)
}

let nvMoi1 = new NhanVienVanPhongMoi("Thuoc")
inPhieuLuong(nvMoi1)

console.log("============================")
// Interface vs Class

interface ChayDuoc {
    tocDoToiDa: number;
    chay(): void;
}
class XeMay implements ChayDuoc {
    tocDoToiDa: number = 150;
    chay(){
        console.log('Xe dang chay')
    }
}
let chiecXeCuaToi = new XeMay();
chiecXeCuaToi.chay()
console.log(`Tốc độ tối đa là: ${chiecXeCuaToi.tocDoToiDa}`)

