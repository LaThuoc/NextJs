class Sach {
    readonly id : string;
    public ten: string;
    public daMuon: boolean;

    constructor(id: string, ten: string){
        this.id = id
        this.ten = ten
        this.daMuon = false
    }
}

class NguoiDung {
    readonly id: string;
    public ten: string;
    private _sachDangMuon: Sach[] = []

    constructor(id: string, ten: string){
        this.id = id
        this.ten = ten
    }
    get sachDangMuon(): Sach[]{
        return this._sachDangMuon
    }
    themSach(sach: Sach): void{
        this._sachDangMuon.push(sach)
    }
    boSach(sachId: string): void{
        this._sachDangMuon = this._sachDangMuon.filter(s => s.id !== sachId)
    }
}

class NhanVien {
    readonly id: string;
    public ten: string;
    private _viTri: string;

    constructor(id: string, ten: string, viTri: string){
        this.id = id
        this.ten = ten
        this._viTri = viTri
    }

    choMuonSach(nguoiDung: NguoiDung, sach: Sach): void {
        console.log(`\n[Thủ thư ${this.ten}] Đang xử lý yêu cầu mượn sách: "${sach.ten}" cho bạn ${nguoiDung.ten}...`)

        if(sach.daMuon){
            console.log(` Thất bại: Sách "${sach.ten}" hiện đã có người mượn`)
            return;
        }
    
        if(nguoiDung.sachDangMuon.length >= 3){
            console.log(`Thất bại Bạn ${nguoiDung.ten} đã mượn tối đa 3 cuốn sách`)
            return;
        }
        sach.daMuon = true;
        nguoiDung.themSach(sach)

    }
    
    nhanTraSach(nguoiDung: NguoiDung, sach: Sach): void{
        console.log(`\n[Thủ thư ${this.ten}] Đang xử lý yêu cầu trả sách: "${sach.ten}" từ bạn ${nguoiDung.ten}...`)

        const coGiuSach = nguoiDung.sachDangMuon.some(s => s.id === sach.id)

        if(!coGiuSach){
            console.log(`Thất bại: Bạn ${nguoiDung.ten} không mượn cuốn sách "${sach.ten}" này từ trước.`);
            return; 
        }
        sach.daMuon = false;
        nguoiDung.boSach(sach.id)
        console.log(`✅ Thành công: Đã nhận lại cuốn sách "${sach.ten}". Cảm ơn bạn ${nguoiDung.ten}!`);
    }
    
}

const thuThu = new NhanVien("NV_01", "Chị Hoa", "Quầy kiểm soát")
const hocSinh = new NguoiDung("HS_99", "Minh Triết")
const hocSinh2 = new NguoiDung("HS_02", "Hoàng Nam")

const sach1 = new Sach("S_01", "Đất Rừng Phương Nam");
const sach2 = new Sach("S_02", "Dế Mèn Phiêu Lưu Ký");
const sach3 = new Sach("S_03", "Kính Vạn Hoa");
const sach4 = new Sach("S_04", "Đắc Nhân Tâm");

thuThu.choMuonSach(hocSinh, sach1)
thuThu.choMuonSach(hocSinh, sach2)
thuThu.choMuonSach(hocSinh, sach3)

thuThu.choMuonSach(hocSinh2, sach1)


console.log(`\nSố sách hiện tại Minh Triết đang giữ: ${hocSinh.sachDangMuon.length} cuốn`)


console.log("=== Hệ thống bán vé ===")

class Ghe {
    readonly soGhe: string;
    public giaVe: number;
    public daBan: boolean;

    constructor(soGhe: string, giaVe: number){
        this.soGhe = soGhe
        this.giaVe = giaVe
        this.daBan = false
    }
}
class User {
    public ten: string;
    public viTien: number;
    private _veDaMua: Ghe[] = []

    constructor(ten: string,viTien: number){
        this.ten = ten
        this.viTien = viTien
    }

    get veDaMua(): Ghe[]{
        return this._veDaMua
    }

    nhanVe(ghe: Ghe): void{
        this._veDaMua.push(ghe)
    }
    truTien(soTien: number): void{
        this.viTien -= soTien
    }
}

class HeThongBanVe {
    public tenRap: string;
    
    constructor(tenRap: string){
        this.tenRap = tenRap
    }

    banVe(khachHang: User, ghe: Ghe): void{
        console.log(`n\[${this.tenRap}] Đang xử lý bán ghê ${ghe.soGhe} cho khách ${khachHang.ten}...`)

        if(ghe.daBan){
            console.log(`Thất bại: Ghe ${ghe.soGhe} đã có người mua trước đó`)
            return;
        }
        if(khachHang.viTien < ghe.giaVe){
            console.log(`Thất bại: Bạn ${khachHang.ten} không đủ tiền mua vé (Còn thiếu ${ghe.giaVe - khachHang.viTien}đ)`)
            return;
        }
        ghe.daBan = true
        khachHang.nhanVe(ghe)
        console.log(`✅ Thành công: Khách ${khachHang.ten} đã mua vé ghế ${ghe.soGhe}!`);
    }
}


const boxOffice = new HeThongBanVe("CGV Nguyễn Du")

const khach1 = new User("Job", 200000)
const khach2 = new User("Bob",  30000)

const gheThuong = new Ghe("A1", 20000)
const gheVip = new Ghe("VIP_H1", 50000)

boxOffice.banVe(khach1, gheThuong)
boxOffice.banVe(khach2, gheVip)

