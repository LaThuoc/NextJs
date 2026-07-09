
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

class TaiKhoanNganHang {
    public tenChuThe: string;
    private soDu: number;

    constructor(ten: string, soDuBanDau: number){
        this.tenChuThe = ten;
        this.soDu = soDuBanDau;
    }

    public xemDoDu(){
        return this.soDu
    }
}
let tk = new TaiKhoanNganHang("Thuoc", 1000000)
console.log(tk.tenChuThe)


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