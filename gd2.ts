// Giai đoạn 2: Hàm và Object
// Function
// Optional Parameter
// Default Parameter
// Rest Parameter
// Object Type
// Array
// Tuple
// Enum
// Literal Type


function chaoHoi(ten: string, loiChao?: string): string {
    if(loiChao){
        return `${loiChao}, ${ten}`
    }
    return `Xin chao, ${ten}`
}

console.log(chaoHoi("An", "Hello"))

function priceSale(giaGoc: number, phanGiam: number = 10): number{
    return giaGoc * (1- phanGiam/100);
}
console.log(priceSale(100))
console.log(priceSale(100, 20))

const arrayFirst: number[] = [1,2,3,4,5]
function total(cacSo: number[]): number{
    console.log(cacSo)
    return cacSo.reduce((tong, so) => tong + so, 0)
    
}
console.log(total(arrayFirst))

let danhSachGia: (number| string)[] = []
if (danhSachGia.length > 0){
    danhSachGia.push(400, 500)
    console.log(danhSachGia)
}else if(danhSachGia.length <= 0){
    danhSachGia.push("La Thuoc")
    console.log(danhSachGia)
}

enum QuyenTruyCap {
    ADMIN = "ADMIN",
    USER = "USER"
}

let quyen: QuyenTruyCap = QuyenTruyCap.ADMIN;
console.log(quyen)
