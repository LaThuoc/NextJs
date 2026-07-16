interface User {
    id: number;
    name: string;
    email: string;
}

type UserKeys = keyof User;

function getProperty<T, K extends keyof T>(obj: T, key: K){
    return obj[key]
}

const Vincent: User = {id: 1, name: "Vincent", email:"v@gmail.com"}
getProperty(Vincent, "name")

console.log("================================")

// interface ShipInfo  {
//     tinhThanh: string;
//     quanHuyen: string;
//     soDienThoai: number;
// }

// function updateForm<T, K extends keyof T>(form: T , key: K, newValue: T[K]){
//     return form[key] = newValue;
// }

// let donHang: ShipInfo = {tinhThanh: "Ha Noi", quanHuyen: "Cau Giay", soDienThoai: 123456789}

// updateForm(donHang, {
//     tinhThanh: "Da Nang",
//     quanHuyen: "HaiChau",
//     soDienThoai: 123456780,
// })
// console.log(donHang)

interface ShipInfo2  {
    tinhThanh: string;
    quanHuyen: string;
    soDienThoai: number;
}

function updateForm2<T>(form: T , cacTruongThayDoi: Partial<T>){
    return Object.assign( form, cacTruongThayDoi);
}

let donHang2: ShipInfo2 = {tinhThanh: "Ha Noi", quanHuyen: "Cau Giay", soDienThoai: 123456789}

updateForm2(donHang2, {
    tinhThanh: "Da Nang",
    quanHuyen: "HaiChau",
    soDienThoai: 123456780,
})
console.log(donHang2)

// Index Access Type(truy cập kiểu bẳng chỉ mục)

interface SanPham {
    id: number;
    tenSp: string;
    gia: number;
    chiTiet: {
        mauSac: string;
        kichThuoc: number;
    }
}

type ChiTietType = SanPham["chiTiet"]
function renderSpecCachTe(product: ChiTietType){
    console.log('===LOG CỦA NGƯỜI CODE TỆ===')
    console.log(`Màu sắc: ${product.mauSac} | Kích thước: ${product.kichThuoc} inch`)
    console.log("=================================")
}

const sanPhamDayDu: SanPham = {
    id: 1,
    tenSp: "Iphone17",
    gia: 250000000,
    chiTiet: {mauSac: "Titan Bac", kichThuoc: 6.3}
}

const thongSoTho = {
    mauSac: "Vang Hong",
    kichThuoc: 6.1
}
console.log("Trang chi tiết sản phẩm")
renderSpecCachTe(sanPhamDayDu.chiTiet)
console.log("Trang so sánh cấu hình:")
renderSpecCachTe(thongSoTho)


// Duyệt và kiểm tra dữ liệu (in, extend)

type  TrangThai = "loading" | "success" | "error"


type ManHinhBaoCao = {
    [key in TrangThai]: boolean;
}
const cauHinhManHinh: ManHinhBaoCao = {
    loading: false,
    success: false,
    error: true,
}

console.log("Cau hinh chuan te:", cauHinhManHinh)



