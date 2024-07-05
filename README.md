# E-commerce API

## Tính năng:

1. Quản lý Sản phẩm:
   - Tạo sản phẩm mới
   - Lấy danh sách tất cả sản phẩm
   - Lấy thông tin chi tiết sản phẩm theo ID
   - Cập nhật thông tin sản phẩm
   - Xóa sản phẩm
   - Tìm kiếm sản phẩm theo từ khóa
   - Lọc sản phẩm theo danh mục, giá và tình trạng tồn kho
   - Sắp xếp sản phẩm theo tên, theo giá, theo độ phổ biến

2. Quản lý Giỏ hàng:
   - Tạo giỏ hàng mới
   - Thêm sản phẩm vào giỏ hàng
   - Xóa sản phẩm khỏi giỏ hàng
   - Xóa toàn bộ giỏ hàng
   - Lấy danh sách tất cả giỏ hàng

3. Xử lý lỗi:
   - Middleware xử lý lỗi tập trung
   - Trả về thông báo lỗi phù hợp cho client

4. Validation:
   - Kiểm tra tính hợp lệ của dữ liệu sản phẩm trước khi tạo hoặc cập nhật

5. Cấu hình:
   - Sử dụng biến môi trường để cấu hình (dotenv)
   - Khởi tạo dữ liệu mẫu cho sản phẩm

6. RESTful API:
   - Tuân thủ các nguyên tắc RESTful trong thiết kế API
   - Sử dụng các phương thức HTTP phù hợp (GET, POST, PUT, DELETE)

7. Mô hình hóa dữ liệu:
   - Sử dụng mô hình để quản lý dữ liệu sản phẩm và giỏ hàng
   - Hỗ trợ các thao tác CRUD cơ bản

8. Xử lý bất đồng bộ:
   - Sử dụng Promises và async/await để xử lý các thao tác bất đồng bộ

Hướng dẫn sử dụng:
1. Cài đặt các dependencies: npm install
2. Cấu hình biến môi trường trong file .env
3. Khởi động server: npm start
4. Truy cập API tại http://localhost:<PORT>/api

## API Endpoints:

### Sản phẩm:
1. Lấy tất cả sản phẩm
   GET /api/products

2. Lấy sản phẩm theo ID
   GET /api/products/:id

3. Tạo sản phẩm mới
   POST /api/products
   Body: { name, description, price, category, inStock }

4. Cập nhật sản phẩm
   PUT /api/products/:id
   Body: { name, description, price, category, inStock }

5. Xóa sản phẩm
   DELETE /api/products/:id

6. Tìm kiếm sản phẩm
   GET /api/products?q=từ_khóa

7. Lọc sản phẩm
   GET /api/products?category=Electronics&minPrice=100&maxPrice=1000&inStock=true

8. Sắp xếp theo giá tăng dần:
   GET /api/products?sortBy=price&order=asc

9. Sắp xếp theo giá giảm dần:
   GET /api/products?sortBy=price&order=desc

10. Sắp xếp theo tên A-Z:
   GET /api/products?sortBy=name&order=asc

11. Sắp xếp theo tên Z-A:
   GET /api/products?sortBy=name&order=desc

12. Sắp xếp theo độ phổ biến tăng dần:
   GET /api/products?sortBy=popularity&order=asc

13. Sắp xếp theo độ phổ biến giảm dần:
   GET /api/products?sortBy=popularity&order=desc

14. Lấy trang đầu tiên với 10 sản phẩm mỗi trang:
   GET /api/products?page=1&limit=10 

15. Lấy trang thứ 2 với 5 sản phẩm mỗi trang, sắp xếp theo giá tăng dần:
   GET /api/products?page=2&limit=5&sortBy=price&order=asc

16. Tìm kiếm với phân trang
   GET /api/products?q=electronic&page=1&limit=5&sortBy=price&order=as

### Giỏ hàng:
1. Tạo giỏ hàng mới
   POST /api/carts

2. Lấy tất cả giỏ hàng
   GET /api/carts

3. Thêm sản phẩm vào giỏ hàng
   POST /api/carts/:cartId/items
   Body: { productId, quantity }

4. Xóa sản phẩm khỏi giỏ hàng
   DELETE /api/carts/:cartId/items/:productId

5. Xóa toàn bộ giỏ hàng
   DELETE /api/carts/:cartId

Lưu ý cho tester:
- Đảm bảo thay thế :id, :cartId, và :productId bằng ID thực tế khi test.
- Với các request POST và PUT, cung cấp dữ liệu hợp lệ trong phần body của request.
- Đối với các request GET có query params, có thể kết hợp nhiều params (ví dụ: ?category=Electronics&minPrice=100).
- Tất cả các response sẽ ở định dạng JSON.
- Kiểm tra các trường hợp lỗi, ví dụ như gửi dữ liệu không hợp lệ hoặc truy cập resource không tồn tại.