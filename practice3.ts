// định nghĩa các kiểu dữ liệu
type TrangThaiBan = "TRONG" | "CO_KHACH"

interface MonAn {
    ten: string;
    gia: number;
}

interface GiamGia {
    phanTramGiam: number;
}

type MonAnThanhToan = MonAn & Partial<GiamGia>;
interface KhachHang {
    ten: string;
    ghiChuDacBiet?: string | null;
}

type CardPayment = {kieu: "CARD"; soThe: string}
type WalletPayment = {kieu: "WALLET"; sdtVi: string}

type PhuongThucThanhToan = CardPayment | WalletPayment

interface HoaDon {
    maHoaDon: string;
    danhSachMon: MonAnThanhToan[];
    phiDichVu?: number | null;
    khachHang?: KhachHang | null;
}

interface BanAn {
    soBan: number;
    trangThai: TrangThaiBan;
    hoaDon?: HoaDon | null
}

function checkPayment(phuongThuc: PhuongThucThanhToan): string {
    if(phuongThuc.kieu === "CARD"){
        const soTheAnToan = `****-****-****-${phuongThuc.soThe.slice(-4)}`
        return  `Đã quẹt thẻ: ${soTheAnToan}`
    }else{
        return `Đã quét QR ví điện tử qua SĐT: ${phuongThuc.sdtVi}`
    }
}

function inPhieuTamTinh(ban: BanAn): void{
    console.log(`PHIẾU TẠM TÍNH - BÀN SỐ ${ban.soBan}`);
    if(ban.trangThai === "TRONG" || !ban.hoaDon){
        console.log("Bàn này hiện đang trống")
        return
    }

    const hoaDon = ban.hoaDon;
    const tenKhach = hoaDon.khachHang?.ten ?? "Khách vãng lai"
    const ghiChu = hoaDon.khachHang?.ghiChuDacBiet ?? "Không có ghi chú"
    
    console.log(`KhachHang: ${tenKhach}`)
    console.log(`Ghi chú: ${ghiChu}`)

    let totalPrice = 0
    console.log("Chi tiết món ăn:")

    hoaDon.danhSachMon.forEach((mon) => {
        const giam = mon.phanTramGiam ?? 0;
        const giaThucTe = mon.gia * (1- giam/100);
        totalPrice += giaThucTe
        console.log(`- ${mon.ten}: ${mon.gia.toLocaleString()}đ ${giam > 0 ? `Giảm ${giam}%` : ""}`)
    })

    const phiDichVuThucTe = hoaDon.phiDichVu ?? 0
    const totalPayment = totalPrice + phiDichVuThucTe;


    console.log(`Tổng tiền món: ${totalPrice.toLocaleString()}đ`)
    console.log(`Phí dịch vụ: ${phiDichVuThucTe.toLocaleString()}đ`)
    console.log(`Tổng cộng: ${totalPayment.toLocaleString()}đ`)

}

const apiRawData: any = {
    maHoaDon: "HD-999",
    danhSachMon: [
        { ten: "Lẩu Thái", gia: 250000, phanTramGiam: 10 }, 
        { ten: "Coca Cola", gia: 15000 }
    ],
    phiDichVu : null
}

const hoaDonTuApi = apiRawData as HoaDon

const banSo8: BanAn ={
    soBan: 8,
    trangThai: "CO_KHACH",
    hoaDon: hoaDonTuApi
}
inPhieuTamTinh(banSo8)
const hinhThucThanhToan: PhuongThucThanhToan = {kieu: "CARD", soThe: "12233423543454"}
const thongBao = checkPayment(hinhThucThanhToan)
console.log(`\n[Thanh toan] ${thongBao}`)



console.log("================Thẻ thành viên tích điểm=================")

interface MonAn1 {
    ten: string;
    gia: number;
}
interface KhachHang1 {
    ten: string;
    sdt?: string;
}
interface TheThanhVien {
    hangThe: "BAC" | "VANG" | "KIM_CUONG"
    diemTichLuy: number;
}
type KhachHangVip = KhachHang1 & TheThanhVien

interface HoaDon1 {
    maHoaDon: string;
    danhSachMon: MonAn1[];
    khachHang?: KhachHang1 | KhachHangVip | null;
}

function laThanhVienVip(khach: KhachHang1 | KhachHangVip): khach is KhachHangVip {
    return "hangThe" in khach
}
function tinhGiamGiaVip(khach: KhachHang1 | KhachHangVip | null | undefined): number{
    if(!khach) return 0
    if(laThanhVienVip(khach)){
        console.log(`Phát hiện là khách VIP! Hạng thẻ: ${khach.hangThe}`)

        if(khach.hangThe === "KIM_CUONG") return 15;
        if(khach.hangThe === "VANG") return 10;
        if(khach.hangThe === "BAC") return 5;
    }
    return 0
}

function inHoaDon(hoaDon: HoaDon1): void{
    console.log(`Hóa Đơn Thanh Toán: ${hoaDon.maHoaDon}`)

    const tenKhachHang = hoaDon.khachHang?.ten ?? "Khách vãng lai"
    console.log(`Khách hàng: ${tenKhachHang}`)

    let totalFood = 0 
    hoaDon.danhSachMon.forEach((mon) =>{
        totalFood += mon.gia
        console.log(`-${mon.ten}: ${mon.gia.toLocaleString()}đ`)

        const phanTramGiam = tinhGiamGiaVip(hoaDon.khachHang)
        const tienGiamVip = totalFood * (phanTramGiam/100)
        const tongThanhToan = totalFood - tienGiamVip

        console.log(`Tổng tiền gốc: ${totalFood.toLocaleString()}đ`)
        if(phanTramGiam > 0){
            console.log(`Ưu đãi hạng thẻ: ${tienGiamVip.toLocaleString()}đ (${phanTramGiam}%)`)
        }

        console.log(`Tổng cộng: ${tongThanhToan.toLocaleString()}đ`)
    })
}

const danhSachMonAn: MonAn1[] = [
    { ten: "Lẩu Thái Hải Sản", gia: 350000 },
    { ten: "Bò Lúc Lắc", gia: 150000 },
    { ten: "Coca Cola", gia: 15000 }
]

const hoaDonKhachThuong: HoaDon1 = {
    maHoaDon: "HD-1111",
    danhSachMon: danhSachMonAn,
    khachHang: {ten: "Jobe"},
}
inHoaDon(hoaDonKhachThuong)

const khachVIP: KhachHangVip = {
  ten: "Chị Linh",
  sdt: "0909123456",
  hangThe: "KIM_CUONG", // Thuộc tính bắt buộc của KhachHangVIP
  diemTichLuy: 1250
};

const hoaDonKhachVIP: HoaDon = {
  maHoaDon: "HD-002",
  danhSachMon: danhSachMonAn,
  khachHang: khachVIP // Gán khách VIP vào hóa đơn
};
inHoaDon(hoaDonKhachVIP);