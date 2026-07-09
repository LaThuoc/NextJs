// import * as readline from "readline";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// function total (a: number, b: number): number {
//     return a + b;
// }

// rl.question("Nhap a:" , (aInput) => {
//     rl.question("Nhap b:", (bInput) => {
//         const a = Number(aInput);
//         const b = Number(bInput)

//         console.log("Tong = ", total(a,b));
//         rl.close();
//     })
// })

let svName: string = 'Le Van C'
let svAge: number = 22
let svScore: number = 8.0
let svIsGraduated: boolean = true;

console.log(`Sinh vien: ${svName} Tuoi: ${svAge}`)

function printStudent(name: string, age: number): void{
    console.log("Name:" + name)
    console.log("Age:" + age)
}
printStudent("La Tien Thuoc", 22)