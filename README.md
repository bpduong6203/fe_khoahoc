cài thư viện
npm install

chạy project
npm run dev
# or
yarn dev


my-nextjs-app/
├── public/                    # Chứa các tệp tĩnh như hình ảnh, favicon
├── src/
│   ├── components/            # Chứa các thành phần tái sử dụng
│   │   ├── ui/                # Các thành phần giao diện người dùng (Button, Input, ...)
│   │   ├── layout/            # Các bố cục (Header, Footer, Sidebar, ...)
│   │   └── common/            # Các thành phần chung (Modal, Alert, ...)
│   ├── pages/                 # Chứa các trang
│   │   ├── api/               # Các API route
│   │   ├── auth/              # Các trang xác thực (Login, Register, Forgot Password, ...)
│   │   ├── dashboard/         # Các trang dashboard
│   │   │   ├── index.js       # Trang dashboard chính
│   │   │   ├── reports.js     # Trang báo cáo
│   │   │   └── settings.js    # Trang cài đặt
│   │   ├── index.js           # Trang chủ
│   │   ├── about.js           # Trang giới thiệu
│   │   └── contact.js         # Trang liên hệ
│   ├── styles/                # Chứa các tệp CSS/Tailwind
│   │   ├── globals.css        # CSS toàn cục
│   │   └── tailwind.css       # Cấu hình TailwindCSS
│   ├── utils/                 # Chứa các tiện ích và hàm hỗ trợ
│   │   └── helpers.js         # Các hàm hỗ trợ chung
│   ├── layouts/               # Chứa các bố cục trang
│   │   └── AuthLayout.js      # Bố cục cho các trang xác thực
│   └── hooks/                 # Chứa các hook tùy chỉnh
│       └── useAuth.js         # Hook xác thực tùy chỉnh
├── .gitignore

