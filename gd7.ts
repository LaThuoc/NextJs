interface User {
    id: number;
    name: string;
    email?: string;
    phoneNumber?: string;
    avatar?: string;
    ngayTao: string;
}

type UserUpdate = Partial<User>

function updateProfile(userId: number, dataToUpdate: UserUpdate){
    console.log(`Đang cập nhật UserId ${userId} với dữ liệu`, dataToUpdate)
}
updateProfile(1, {name: "Jone Doe"})
updateProfile(1, {
    avatar: "http://avatar.com/john.png",
    phoneNumber: "0943345325"
})


type StrictUser = Required<User>

function registerUser(newData: StrictUser){
    console.log("Đăng ký thành công", newData)

}

const userChuan: StrictUser = {
    id: 1,
    name: "Alice",
    email: "alice@gmail.com",
    phoneNumber: "0728765823"
}
registerUser(userChuan)

interface SystemConfig {
    apiUrl: string;
    timeout: number;
    version: string;
}
type StrictConfig = Readonly<SystemConfig>

const configuration: StrictConfig = {
    apiUrl: "https://api.chuan-cua-du-an.com",
    timeout: 5000,
    version: "1.0.0",
}
function userConfiguration(data: StrictConfig){
    console.log(`apiUrl là: ${data.apiUrl}`)
}

userConfiguration(configuration)

console.log("===================")
type UserSummary = Pick<User, "id" | "name">

function renderUserSideBar(user: UserSummary){
    console.log(`[SideBar] ID: ${user.id}- Thành viên: ${user.name}`)
}

const userPrview: UserSummary = {
    id: 10,
    name: "Emma"
}
renderUserSideBar(userPrview)

console.log("===========================")

type UserRegister = Omit<User, "id" | "ngayTao">

function createUserOmit(formData: UserRegister){
    console.log("Du lieu form chuan chinh, tu dong cap nhat truong moi", formData)
}
const thongTinForm: UserRegister = {
    name: "Watsoon",
    email:"waston@gmail.com",
    phoneNumber: "09274592572"

}

createUserOmit(thongTinForm)


// Nhóm định hình bản đồ 
type Page = "home" | "about" | "contact"
interface PageInfo {
    title: string
}
// => tạo 1 object có key là Page và value là PageInfo
const navigation: Record<Page, PageInfo> = {
    home: {title: "Trang chủ"},
    about: { title: "Gioi thieu"},
    contact: {title: "Lien lac"}
}

// Nhóm lọc Union Type(excludem extract, NonNullable)
// 1. Exclude<T,U>
type Status = "success" | "error" | "pending" | "canceled"
type FinalStatus = Exclude<Status, "pending" | "canceled">
//  => kết quả chỉ còn success và error

// 2. Extract<T, U> lọc lấy những type chung giữa T và U
type Role = "admin" | "editor" | "guest";
type RequriedRole = "admin" | "super-admin"
type CommonType = Extract<Role, RequriedRole>
// Kết quả admin


//NonNullable<T>(xóa bỏ null and undefined)
type MaybeString = string | null | undefined;
type SureString = NonNullable<MaybeString>
//  loại bỏ sạch sẽ null and underfined
// kết quả string

console.log("================")

function fetchUser(id: number, token:string, appId: string){
    return Promise.resolve({id, name: "Admin", role: "superuser"})
}

type FetchUserParams = Parameters<typeof fetchUser>

function addRequestToQueue(params: FetchUserParams){
    console.log("Hàng đợi tự động nhận diện đầy đủ tham số", params)
}

const paramsUser: FetchUserParams = [101, "jwt-token-123", "app-id-xyz"];
addRequestToQueue(paramsUser)

console.log("============================")

async function fetchUserReturn(id: number, token: string){
    return {
        id,
        name: "Admin",
        role: "superer"
    }
}

type FetchUserResult = ReturnType<typeof fetchUserReturn>
type UserRealData = Awaited<FetchUserResult>

async function run(){
    const user: UserRealData = await fetchUserReturn(101, "jwt-token-123")
    console.log(`ID: ${user.id} - Tên: ${user.name} - Quyền: ${user.role} -Token ${user.token}`)

}
run()