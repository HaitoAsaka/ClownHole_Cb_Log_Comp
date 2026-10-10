# Dame Estimate — tóm tắt phiên làm việc (10/2026)

Thêm tính năng **ước tính dame Tier 4 theo điều kiện từng acc** vào tab Boss Log của Clown Hole Tool.

## Mục tiêu

Từ dame thật mà thành viên đánh được với các comp tương ứng, cùng điều kiện acc (Ele, Page, MS, RM, TP), dựng một công thức chung. Mỗi acc nhập điều kiện của mình thì Tool trả về dame ước tính gần đúng nhất cho từng comp.

## Các quyết định đã chốt

| Vấn đề | Quyết định |
|---|---|
| Đơn vị số damage trong guide | 万 (×10.000), ví dụ 36460 = 364,6M |
| Guide ghi 2 số `A/B` | A = cấu hình thường, B = cấu hình tối đa. Nội suy A→B theo độ mạnh acc |
| Nguồn dữ liệu điều kiện | Tạm dùng file `dame_check.txt`, sau này thay bằng tab "Tier 4 Dame check" (cột G) trên Sheet |
| Vị trí hiển thị | Trong ô comp ở Boss Log, tính theo acc đang đăng nhập |
| Acc chưa log điều kiện | Hiện dame gốc của guide kèm thông báo nhỏ |
| Comp của Mjhieu | Đều là WorryChefs: D1X2, D3A12, D4H3 |
| D2B2 của LuxionVN (chỉ đạt ~67% guide) | Chưa rõ nguyên nhân, nên không dùng khi fit |
| Cảnh báo TP | Cảnh báo cả khi TP acc quá thấp lẫn khi quá cao so với mốc ghi trong guide |

## Giá trị max của các chỉ số

| Chỉ số | Max | Ghi chú |
|---|---|---|
| Ele | 1250 | |
| Page | 8 | "Page7S7" được hiểu là trang 7, ô 7, tức 7 + 7/8 |
| MS | (chưa rõ) | Càng cao càng tốt nhưng chênh lệch rất nhỏ. Công thức tạm lấy 128 (guide có ghi "MS128+") |
| RM | 12 | |
| TP | 12 | Ảnh hưởng lớn đến timing UB |

## Công thức

```
P    = 0.35·Ele/1250 + 0.15·Page/8 + 0.25·RM/12 + 0.20·TP/12 + 0.05·min(MS/128, 1)
Base = A                     (guide chỉ có 1 số)
     = A + (B − A)·t         (guide có A/B),  t = (P − 0.9) / 0.1, giới hạn trong 0..1
Dame ước tính = 1.124 × Base × (P / 0.9)^1.8
```

- `P` là độ mạnh của acc, từ 0 đến 1.
- Hệ số `K = 1.124`, `GAMMA = 1.8` và `P0 = 0.9` được fit từ dame thật. Sai số trung bình khoảng ±7%.
- Trọng số của từng chỉ số là giá trị tạm đặt. Dữ liệu hiện chỉ có 3 acc nên chưa tách được ảnh hưởng riêng của từng chỉ số.

## Kiểm chứng trên dữ liệu thật

| Acc | Comp | Thật | Ước tính | Lệch |
|---|---|---|---|---|
| Aether | D1AA1 | 343M | 345M | +1% |
| Aether | D2C5 | 500M | 515M | +3% |
| Aether | D4M3 | 394M | 427M | +8% |
| Aether | D5P1 | 333M | 368M | +10% |
| LuxionVN | D1J4 | 328M | 308M | −6% |
| LuxionVN | D5O1 | 330M | 315M | −4% |
| LuxionVN | D2B2 | 284M | 359M | +27% (có cảnh báo TP: acc TP9.2, guide ghi mốc cố định TP8.2) |
| Mjhieu | D1X2 | 382M | 397M | +4% |
| Mjhieu | D3A12 | 459M | 408M | −11% |
| Mjhieu | D4H3 | 418M | 407M | −3% |

## Cảnh báo TP

Mốc TP được đọc từ ghi chú của link trong guide. Nếu link không có ghi chú TP thì lấy từ `exRemarks` của comp.

| Dạng ghi chú | Khi nào cảnh báo |
|---|---|
| `TP8.2` (mốc cố định) | TP acc lệch quá ±0.3 |
| `TP8.2+` (mốc tối thiểu) | Đỏ nếu TP acc thấp hơn mốc. Vàng nếu cao hơn mốc quá 1.5 |
| `TP6.5-8.5` (khoảng) | TP acc nằm ngoài khoảng |
| `TP8.2+/10.0+` | Các mốc là phương án thay thế nhau, đạt một mốc là đủ |

## File thay đổi

- `Clown Hole Tool.html`
  - Thêm khối `// ── Dame estimate` chứa `DAME_MODEL`, các hàm đọc và parse file, công thức tính và cảnh báo TP.
  - Gọi `dameEstimateHTML()` trong `bossLogActionBoxHTML`.
  - Thêm CSS cho `.dame-est`.
- `dame_check.txt`: dữ liệu điều kiện và dame thật của thành viên, cùng định dạng với tab Sheet. Các cột cách nhau bằng TAB.

## Cách cập nhật

1. Sửa `dame_check.txt` (thêm acc, điều kiện, dame thật) rồi tải lại trang.
2. Khi có thêm dữ liệu dame thật, fit lại các hệ số trong `DAME_MODEL`.
3. Khi có backend Apps Script cho tab "Tier 4 Dame check", đổi `loadDameCheckFile()` sang fetch từ `AUTH_URL`.
