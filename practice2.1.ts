import {createStore} from "zustand/vanilla"
type MonAn = {
    id: number;
    ten: string;
    gia: number;
    ghiChuDacBiet?: string
}

const danhSachMenu: MonAn[] = [
    {id: 1, ten: "Phở Bò", gia: 50000, ghiChuDacBiet: "Nhiều hành"},
    {id: 2, ten: "Bún Chả", gia: 45000},
]

interface MenuState {
    menu: MonAn[];
    themMonAn: (
        ten: string,
        gia: number,
        ghiChu?: string

    ) => void
}

const menuStore = createStore<MenuState>((set) => ({
    menu: danhSachMenu,
    
    themMonAn: (ten, gia, ghiChu) => set((state) => {
        const maxId = state.menu.length > 0 ? Math.max(...state.menu.map(m => m.id )) : 0
        const monAnMoi: MonAn = {
            id: maxId + 1,
            ten,
            gia,
            ghiChuDacBiet: ghiChu || "Khong co yeu cau"
        }
        return {
            menu: [...state.menu, monAnMoi]
        }
    })
}))

menuStore.getState().themMonAn("Cơm tấm", 40000)
console.log(menuStore.getState().menu)


console.log("===================================")

function themNhieuMon(
    menuHienTai: MonAn[], 
    danhSachMonMoi: Omit<MonAn,"id">[]
): MonAn[]{
    let maxId = menuHienTai.length > 0 ? Math.max(...menuHienTai.map(mon => mon.id)) : 0
    const cacMonChuanHoa = danhSachMonMoi.map(mon => {
        maxId++;
        return {
            id: maxId,
            ...mon
        }
    })
    return [...menuHienTai, ...cacMonChuanHoa]
}
const danhSachExcel: Omit<MonAn, "id">[] = [
  { ten: "Cơm Tấm", gia: 40000 },
  { ten: "Trà Đá", gia: 5000, ghiChuDacBiet: "Ít đá" },
  { ten: "Bánh Mì", gia: 20000, ghiChuDacBiet: "Nhiều bơ" }
];
const menuSauKhiImport = themNhieuMon(danhSachMenu, danhSachExcel)

console.log(menuSauKhiImport)
console.log("===================================")
console.log("Bài 2 bài toán đặt xe")
enum LoaiXe {
    BIKE = "Xe máy",
    CAR_4_SEATS = "Ô tô 4 chỗ",
    CAR_7_SEATS = "Ô tô 7 chỗ"
}

type TrangThaiDiChuyen = "Đang tìm" | "Đang đi" | "Hoàn thành"

type ToaDo = [kinhDo: number, viDo: number]

interface ChuyenDi {
    id: string;
    loai: LoaiXe;
    diemDon: ToaDo;
    diemDen: ToaDo;
    trangThai: TrangThaiDiChuyen;
}

function taoChuyenDi(loai: LoaiXe, diemDon: ToaDo, diemDen: ToaDo): ChuyenDi{
    const randomId = "TRIP_" + Math.random().toString(36).substring(2,9).toUpperCase();

    return {
        id: randomId,
        loai: loai,
        diemDon: diemDon,
        diemDen: diemDen,
        trangThai: "Đang tìm"
    }
}
const viTriDon: ToaDo = [105.8544, 21.0285]; 
const viTriDen: ToaDo = [106.6601, 10.7626];

const chuyenXeMoi = taoChuyenDi(LoaiXe.BIKE, viTriDon, viTriDen)
console.log(chuyenXeMoi)

console.log("===================================")
console.log("Bài 3 tính toán hóa đơn")

type SanPham = {
    ten: string;
    giaGoc: number;
    phanTramGiamGia: number;
}
function totalPrice(phiShipDongGia: number,...danhSachMua: SanPham[]): number{
    const totalShip = danhSachMua.reduce((total, item) => {
        const giaSauGiam = item.giaGoc * (1 - item.phanTramGiamGia)
        return total + giaSauGiam}, 0
    )

    return totalShip + phiShipDongGia
}
const miTom: SanPham = { ten: "Mì tôm", giaGoc: 5000, phanTramGiamGia: 0 }; // Không giảm giá
const aoThun: SanPham = { ten: "Áo thun", giaGoc: 200000, phanTramGiamGia: 0.1 }; // Giảm 10% (còn 180.000)
const taiNghe: SanPham = { ten: "Tai nghe", giaGoc: 500000, phanTramGiamGia: 0.2 }; // Giảm 20% (còn 400.000)
const hoaDon = totalPrice(20000, miTom, aoThun, taiNghe);
console.log("Tổng hóa đơn cần thanh toán (đã cộng ship 20k):", hoaDon);