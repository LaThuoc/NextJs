console.log("1. Component & Props (Truyền dữ liệu vào Component")


// 🟦 TypeScript: Định nghĩa cái "khuôn mẫu" (Blueprint) cho dữ liệu đầu vào.
// Khi nhìn vào đây, cả bạn và VS Code đều biết Component này cần những gì.
interface ButtonProps {
  label: string;             // 🟦 TS: Bắt buộc phải là chữ (string)
  onClick: () => void;       // 🟦 TS: Bắt buộc phải là một hàm không trả về giá trị
  disabled?: boolean;        // 🟦 TS: Dấu "?" nghĩa là optional (có cũng được, không có cũng không sao)
  children?: React.ReactNode;// 🟦 TS: Kiểu đặc biệt của React, đại diện cho bất cứ thứ gì nằm giữa thẻ đóng/mở <Button>...</Button>
}

// ⚛️ React: Đây là function component nhận vào các props.
// 🟦 TypeScript: Dấu ": ButtonProps" ép các tham số bóc tách (destructuring) bên dưới phải đúng chuẩn.
export const Button = ({ label, onClick, disabled = false, children }: ButtonProps) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
      {children}
    </button>
  );
};

// --- CÁCH SỬ DỤNG ---
const App = () => {
  return (
    // 🟦 TS sẽ báo lỗi ngay lập tức nếu bạn thiếu "label" hoặc điền "disabled='yes'" (phải là boolean)
    <Button label="Click Me" onClick={() => console.log('Clicked!')}>
       <span>Icon</span> {/* ⚛️ Đây chính là children prop */}
    </Button>
  );
};



console.log("2. Xử lý Sự kiện (Event Type)")

import React, { useState } from 'react';

export const FormInput = () => {
  // ⚛️ React: Khởi tạo state để lưu chữ
  const [value, setValue] = useState("");

  // 🟦 TypeScript: "React.ChangeEvent<HTMLInputElement>" 
  // Nó báo cho TS biết: "Đây là sự kiện thay đổi (Change) xảy ra trên một thẻ INPUT của HTML".
  // Nhờ dòng này, khi bạn gõ "e.target.", VS Code sẽ tự động gợi ý chữ "value".
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value); // ⚛️ React: Cập nhật state
  };

  // 🟦 TypeScript: "React.FormEvent<HTMLFormElement>"
  // Báo cho TS biết đây là sự kiện Submit xảy ra trên một thẻ FORM của HTML.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⚛️ React/JS: Chặn load lại trang
    console.log("Data:", value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Gửi</button>
    </form>
  );
};


console.log("3. Các React Hooks Cơ Bản (useState, useRef)")

// 🟦 TypeScript: Định nghĩa cấu trúc của Object User
interface User {
  id: number;
  name: string;
}

export const Profile = () => {
  // ⚛️ React: Khởi tạo state bằng hook useState.
  // 🟦 TypeScript: Dấu "<User | null>" bảo với TS rằng: 
  // "Cái state 'user' này hiện tại là null, nhưng sau này nó CHỈ ĐƯỢC PHÉP chứa Object đúng cấu trúc của User thôi nhé!"
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    // 🟦 TS chấp nhận vì truyền vào đúng cấu trúc id (number) và name (string)
    setUser({ id: 1, name: "Hoàng" }); 
  };

  return (
    <div>
      {/* 🟦 TS bắt bạn phải dùng dấu "?" (user?.name) vì nó biết ban đầu user có thể là null, tránh lỗi crash app */}
      <p>Xin chào: {user?.name}</p>
      <button onClick={login}>Login</button>
    </div>
  );
};



import { useRef, useEffect } from 'react';

export const AutoFocusInput = () => {
  // ⚛️ React: Tạo một cái ref để gắn vào thẻ HTML.
  // 🟦 TypeScript: "<HTMLInputElement>" báo cho TS biết cái ref này dùng để trỏ vào thẻ <input>. 
  // Duy trì giá trị khởi đầu là "null" để kích hoạt chế độ kiểm soát DOM nghiêm ngặt của TS.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // ⚛️ React: Thực hiện hành động sau khi component hiển thị.
    // 🟦 TypeScript: Dấu "?" sau inputRef.current cực kỳ quan trọng, TS ép bạn phải check xem ref có tồn tại không trước khi gọi hàm .focus()
    inputRef.current?.focus(); 
  }, []);

  // ⚛️ React: Gắn biến ref vào thuộc tính ref của thẻ input
  return <input ref={inputRef} type="text" placeholder="Gõ gì đó..." />;
};


console.log("4. useReducer & useContext (Quản lý State nâng cao)")

import { useReducer } from 'react';

// 🟦 TypeScript: Định nghĩa kiểu dữ liệu cho State toàn cục của component
interface CounterState { count: number; }

// 🟦 TypeScript: Dùng Union Type để giới hạn các hành động được phép.
// Người dùng CHỈ ĐƯỢC PHÉP gửi lên 3 loại hành động này, gõ sai chữ là TS báo đỏ ngay.
type CounterAction =
  | { type: 'INCREMENT'; payload: number } // 🟦 TS: đi kèm với số lượng cộng thêm
  | { type: 'DECREMENT' }
  | { type: 'RESET' };

const initialState: CounterState = { count: 0 };

// ⚛️ React: Hàm reducer tính toán state mới dựa trên action cũ.
// 🟦 TypeScript: Ép kiểu rõ ràng cho đầu vào và đầu ra đều phải tuân thủ khuôn mẫu.
function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.payload }; // 🟦 TS biết rõ action.payload là kiểu number
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}


import React, { createContext, useContext, useState } from 'react';

// 🟦 TypeScript: Định nghĩa các biến và hàm lưu trong Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// ⚛️ React: Tạo Context toàn cục.
// 🟦 TypeScript: Truyền kiểu dữ liệu vào Generic `<... | undefined>`.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 🟦 TypeScript + ⚛️ React: Tự viết một Custom Hook để xài context cho an toàn.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // 🟦 TS giúp bắt lỗi: Nếu lập trình viên quên bọc component trong <ThemeProvider> thì sẽ báo lỗi ngay lập tức, thay vì để chạy rồi mới crash ngầm.
  if (!context) throw new Error("useTheme phải được đặt bên trong ThemeProvider");
  return context;
};


console.log("5. Gọi API Thực Tế (Axios + React Query / TanStack Query)")

// Bước 1: Khai báo API bằng Axios
TypeScript
import axios from 'axios';

// 🟦 TypeScript: Định nghĩa dữ liệu trả về từ phía Backend
export interface Product {
  id: number;
  title: string;
  price: number;
}

// 🟦 TypeScript: Định nghĩa dữ liệu cần thiết để tạo mới một sản phẩm
export interface CreateProductInput {
  title: string;
  price: number;
}

// ⚛️ React/JS: Hàm gọi API gửi request lên server
// 🟦 TypeScript: Dấu `<Product>` ở hàm axios.post nói với hệ thống rằng: "Data trả về từ API này sẽ có hình thù chuẩn chỉnh của interface Product".
export const createProduct = async (data: CreateProductInput): Promise<Product> => {
  const response = await axios.post<Product>('https://api.example.com/products', data);
  return response.data; // 🟦 TS tự hiểu response.data chính là kiểu Product
};

// Bước 2: Đưa vào Component bằng React Query và Form dữ liệu
TypeScript
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createProduct, CreateProductInput, Product } from './api';

export const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  // ⚛️ React Query: Dùng hook useMutation để quản lý trạng thái kích hoạt API (Loading, Success, Error)
  // 🟦 TypeScript: Truyền 3 tham số Generic theo thứ tự: <Kiểu_Trả_Về_Khi_Thành_Công, Kiểu_Lỗi, Kiểu_Dữ_Liệu_Đầu_Vào>
  const mutation = useMutation<Product, Error, CreateProductInput>({
    mutationFn: createProduct,
    onSuccess: (data) => {
      // 🟦 Nhờ TS, khi bạn gõ "data.", nó sẽ tự gợi ý "data.id", "data.title", "data.price" cực chuẩn!
      console.log("Tạo thành công sản phẩm có ID:", data.id);
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // ⚛️ React Query kích hoạt chạy API gửi data lên
    // 🟦 TS kiểm tra: Object truyền vào bắt buộc phải khớp với cấu trúc CreateProductInput
    mutation.mutate({ title, price });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      
      {/* ⚛️ React: Đổi nút bấm dựa vào trạng thái API đang chạy */}
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Đang lưu...' : 'Lưu sản phẩm'}
      </button>
    </form>
  );
};

Tóm lại tư duy khi viết:

React lo việc giao diện chạy như thế nào, quản lý luồng dữ liệu (useState, useEffect, onSubmit).

TypeScript hoạt động như một lớp bảo vệ bọc bên ngoài,
nó không làm thay đổi cách chạy của React mà chỉ đứng kiểm tra xem biến đó có đúng kiểu không, 
hàm đó truyền vào có đúng tham số không để cảnh báo bạn từ trước khi chạy ứng dụng.