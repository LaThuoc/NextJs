interface ColumnConfig<T> {
    header: string;
    key: keyof T
}

interface SanPham {
    id: number;
    tenSp: string;
    gia: number;
}

const danhSachSanPham: SanPham[] = [
    { id: 1, tenSp: "Điện thoại iPhone 17", gia: 25000000 },
    { id: 2, tenSp: "Tai nghe AirPods Pro", gia: 5000000 },
    { id: 3, tenSp: "Sạc dự phòng Anker", gia: 800000 }
]

const cauHinhCotSanPham: ColumnConfig<SanPham> = [
    { header: "Mã Sản Phẩm", key: "id" },     
    { header: "Tên Sản Phẩm", key: "tenSp" },  
    { header: "Giá Bán (VNĐ)", key: "gia" }    
]

function renderDynamicTable<T>(config: ColumnConfig<T>, data: T[]){
    console.log("==================================================");
    console.log("            GIAO DIỆN BẢNG DỮ LIỆU                ");
    console.log("==================================================");

    const headerLine = config.map(c => c.header).join("\t|")
    console.log(`|${headerLine} |`)
    console.log("===================================================")

    data.forEach((item, index) => {
        const rowCells = config.map(c => {
            const cotKey = c.key
            return item[cotKey]
        })
        console.log(`| [${index + 1}] ${rowCells.join("\t|")} |`)
    })
    console.log("=========================================")
    console.log("\n")
}

renderDynamicTable(cauHinhCotSanPham, danhSachSanPham)