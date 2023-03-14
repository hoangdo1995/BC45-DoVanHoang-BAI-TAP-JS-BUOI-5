// GLOBAL FUNCTION

//các định dạng tiền tệ
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

/**
 * Trả về giá trị của input có name là 'name'
 * @param {*} name name của input cần lấy giá trị
 * @returns  giá trị của input có name = name
 */
function getValueByName(name) {
    var listTags = document.getElementsByName(name);
    console.log(listTags);
    for (var i = 0; i < listTags.length; i++) {
        if (listTags[i].checked === true) {
            return listTags[i].value;
        }
    }
}

/**
 * so sánh và lấy giá trị nhận về với value là con của mảng data1 để nhận lại giá trị có index tương tự của mảng data2
 * @param {*} value khóa cần tìm
 * @param {*} data1 mảng khóa
 * @param {*} data2 mảng giá trị tương ứng
 * @returns giá trị tương ứng với khóa value ở mảng data2
 */
function mappingValue(value, data1, data2) {
    for (let i = 0; i < data1.length; i++) {
        if (value === data1[i]) {
            return data2[i];
        }
    }
}

/**
 * add sự kiện listener cho thẻ các thẻ radios qua name của thẻ
 * @param {*} targetName name của thẻ radio muốn add xự kiện
 * @param {*} listener xự kiện listener
 * @param {*} behavior hàm xử lý xự kiện
 */
function addListenerRadioByName(targetName, listener, behavior) {
    var listRadio = document.getElementsByName(targetName);
    listRadio.forEach(item => {
        item.addEventListener(listener, behavior);
    });
}

/**
 * Hàm tính hóa đơn theo khung gia cho sẳn,
 * @param {*} value giá trị tiêu thụ cần tính
 * @param {*} mangTieuThu mảng các bậc tiêu thụ bắc đầu từ 0;
 * @param {*} MangDonGia mảng các bậc đơn giá
 * @returns tổng hóa đơn cần trả
 */
function tinhTienTheoKhungGia(value,mangTieuThu,MangDonGia){
    var tongHoaDon = 0;
    if(value === 0){
        return tongHoaDon;
    }
    for(let i= 0; i <mangTieuThu.length; i++){
        
        if(value === mangTieuThu[i+1]){
            tongHoaDon += (mangTieuThu[i+1]-mangTieuThu[i])*MangDonGia[i];
            return tongHoaDon;
        }
        else if(value > mangTieuThu[i] && value > mangTieuThu[i+1]){
            tongHoaDon += (mangTieuThu[i+1]-mangTieuThu[i])*MangDonGia[i];
        }
        else if(value > mangTieuThu[i] && value < mangTieuThu[i+1]){
            tongHoaDon += (value - mangTieuThu[i])*MangDonGia[i];
            return tongHoaDon;
        }
        else if(i===(mangTieuThu.length -1)){
            tongHoaDon += (value - mangTieuThu[mangTieuThu.length-1])*MangDonGia[MangDonGia.length-1];
            return tongHoaDon;
        }
    }
}

//BÀI TẬP QUẢN LÝ TUYỂN SINH

var diemToan = 0;
var diemVan = 0;
var diemHoa = 0;
var diemKhuVuc = 0;
var diemDoiTuong = 0;
var result = false;
var tongDiem = 0;
var listNhapDuLieu = document.querySelectorAll('.nhap');
var diemChuan = 0;

/**
 * Hàm lấy giá trị của môn học dựa trên id của môn theo cong thức id = 'diem-mon'
 * @param {*} mon id có cấu trúc 'diem-mon'
 * @returns giá trị của input có id = 'diem-mon'
 */
function diemMon(mon) {
    var diem = +document.getElementById('diem-' + mon).value;
    return diem;
}



/**
 * Xét tuyển dựa trên tổng 3 diêm số diem1, diem2,diem3 cộng với diemKV và diemDT với điều kiện tổng điểm lớn hơn diemChuan và không có điểm môn nào bằng 0 thì đậu ngược lại thì rớt
 * @param {*} diem1 
 * @param {*} diem2 
 * @param {*} diem3 
 * @param {*} diemKV 
 * @param {*} diemDT 
 * @param {*} diemChuan 
 * @returns  trả về true nếu đậu và false nếu rớt
 */
function xetTuyen(diem1, diem2, diem3, diemKV, diemDT, diemChuan) {
    var result = false;
    if (diem1 <= 0 || diem2 <= 0 || diem3 <= 0) {
        result = false;
        return result;
    } else if (tong = diem1 + diem2 + diem3 + diemDT + diemKV >= diemChuan) {
        result = true;
        return result;
    } else {
        result = false;
        return result;
    }
}


/**
 * In tổng điểm ra màn hình
 */
function inDiemTong() {
    laytongDiem();
    document.getElementById('tong-diem').innerHTML = tongDiem;
}

/**
 * tính tổng điểm ba môn cộng với diemKV và diemDT
 * @returns tongDiem
 */
function laytongDiem() {
    tongDiem = 0;
    diemToan = diemMon('toan');
    diemVan = diemMon('van');
    diemHoa = diemMon('hoa');
    tongDiem += diemHoa + diemToan + diemVan;
    tongDiem += (diemKhuVuc + diemDoiTuong);
    return tongDiem;
}

/**
 * add xự kiện cho các radio button khu-vuc
 */
addListenerRadioByName('khu-vuc', 'change', function () {
    diemKhuVuc = mappingValue(getValueByName('khu-vuc'), ['khu-vuc-1', 'khu-vuc-2', 'khu-vuc-3'], [2, 1, 0.5]);
    console.log('Điểm khu vực: ' + diemKhuVuc);
})

/**
 * add xự kiện cho các radio button doi-tuong
 */
addListenerRadioByName('doi-tuong', 'change', function () {
    diemDoiTuong = mappingValue(getValueByName('doi-tuong'), ['doi-tuong-1', 'doi-tuong-2', 'doi-tuong-3'], [2.5, 1.5, 1]);
    console.log('Điểm dối tương: ' + diemDoiTuong);


})

/**
 * add listener cho các input diem
 */
listNhapDuLieu.forEach((item) => {
    item.addEventListener('change', inDiemTong);
});
/**
 * add xự kiện nhập điểm chuẩn
 */
document.getElementById('diem-chuan').addEventListener('change', function () {
    diemChuan = +this.value;
})

/**
 * hàm xử lí in kết quả ra màn hình
 */
function xemKetQua() {
    var inKetQua = document.getElementById('ket-qua');
    var ketQua = xetTuyen(diemToan, diemVan, diemHoa, diemKhuVuc, diemDoiTuong, diemChuan);
    if (ketQua) {
        inKetQua.classList.add('alert-success');
        inKetQua.classList.remove('alert-danger');

        inKetQua.innerHTML = 'Bạn đã đậu';

    } else {
        inKetQua.classList.add('alert-danger');
        inKetQua.classList.remove('alert-success');
        inKetQua.innerHTML = 'Bạn đã rớt';
    }
}
/**
 * add xự kiên cho nút xem kết quả
 */
document.getElementById('xem-ket-qua').addEventListener('click', xemKetQua);

//TÍNH TIỀN ĐIỆN

//input 
var hoTen1 = '';
var soDienTieuThu = 0;
//output
var tienDien = 0;

/**
 * add xự kiện nhập tên khách hàng
 */
document.getElementById('ho-ten').addEventListener('change', function () {
    hoTen1 = this.value;
    document.getElementById('ho-ten-output').innerHTML = hoTen1;
})

/**
 * add xự kiện nhập vào số điện tiêu thụ
 */
document.getElementById('so-dien').addEventListener('change', function () {
    soDienTieuThu = +this.value;
    document.getElementById('so-dien-output').innerHTML = soDienTieuThu;
})

//mảng chứa các bậc tiêu thụ điện
const mangBacTieuThuDien = [0,50,100,200,350];
//mảng chưa các bậc giá điện
const mangBacGiaDien = [500,650,850,1100,1300];

/**
 * add xự kiện tính và in kết quả tiền điện ra màn hình
 */
document.getElementById('tinh-tien-dien').onclick = function () {
    tienDien = tinhTienTheoKhungGia(soDienTieuThu,mangBacTieuThuDien,mangBacGiaDien);
    document.getElementById('ket-qua-tien-dien').innerHTML = `Số tiền điện bạn phải trả là ` + VND.format(tienDien);
}


//TÍNH THUẾ THU NHẬP CÁ NHÂN
// input
var thuNhap = 0;
var hoTen2 = '';
var phuThuoc = 0;
// output
var tienThue = 0;


// nhập vào các giá trị dựa trên id và in ra output
document.getElementById('ho-ten-nop-thue').addEventListener('change', function () {
    hoTen2 = this.value;
    document.getElementById('ho-ten-nop-the-output').innerHTML = hoTen2;
});

document.getElementById('tong-thu-nhap').addEventListener('change', function () {
    thuNhap = this.value;
    document.getElementById('thu-nhap-output').innerHTML = VND.format(thuNhap);
});

document.getElementById('nguoi-phu-thuoc').addEventListener('change', function () {
    phuThuoc = this.value;
    document.getElementById('phu-thuoc-output').innerHTML = phuThuoc;
});

/**
 * lấy giá khoảng thu nhập chịu thuế
 * @param {*} thunhap 
 * @param {*} soNguoiPhuThuoc 
 * @returns 
 */
function layThuNhapChiuThue(thunhap, soNguoiPhuThuoc) {
    var result = thunhap - 4000000 - soNguoiPhuThuoc * 1600000
    return (result>0)?result:0;
}

//bước thu nhâp chịu thuế
const buocThuNhap = [0,60000000,120000000,210000000,384000000,624000000,960000000];
//bước mức thuế;
const buocThue = [0.05,0.1,0.15,0.2,0.25,0.3,0.35];

/**
 * Tính và hiển thị kết qua ra màn hình qu xự kiện click của button id ='tinh-thue'
 */
document.getElementById('tinh-thue').onclick = function () {
    // tienThue = tinhTienThue( mucThue, buocThue);
    tienThue = tinhTienTheoKhungGia(layThuNhapChiuThue(thuNhap, phuThuoc),buocThuNhap,buocThue);
    document.getElementById('thue-output').innerHTML = VND.format(tienThue);
}

//TÍNH TIỀN CÁP

// input
var maKH = '';
var loaiKH = 'ca-nhan';
var soKenhCC = 0;
var soKN = 0;
// output
var tienCuoc = 0;
var phiXuLy = 0;
var phiDichVu = 0;
var phiThueKenh = 0;

//lấy dử liệu người dùng nhập vào
document.getElementById('ma-khach-hang').addEventListener('change', function () {
    hoTen2 = this.value;
    document.getElementById('ma-khach-hang-output').innerHTML = hoTen2;
});
document.getElementById('so-ket-noi').addEventListener('change', function () {
    soKN = this.value;
    document.getElementById('so-ket-noi-output').innerHTML = soKN;
});
document.getElementById('so-kenh-cao-cap').addEventListener('change', function () {
    soKenhCC = this.value;
    document.getElementById('so-kenh-cao-cap-output').innerHTML = soKenhCC;
});

//thêm sự kiên cho các radio loại khách hàng để lấy về kết quả nhập vào cho loại khách hàng
addListenerRadioByName('loai-khach-hang', 'change', function () {
    loaiKH = getValueByName('loai-khach-hang');
    if (loaiKH === 'doanh-nghiep') {
        document.getElementById('ket-noi-content').style.display = 'block';
        document.getElementById('so-ket-noi').disabled = false;
        document.getElementById('loai-khach-hang-output').innerHTML = 'Doanh nghiệp';
    } else {
        document.getElementById('so-ket-noi').disabled = true;
        document.getElementById('ket-noi-content').style.display = 'none';
        document.getElementById('loai-khach-hang-output').innerHTML = 'Cá nhân';

    }
    document.getElementById('so-ket-noi-output').innerHTML = soKN;
})


/**
 * tính tổng các loại phí thảo công thức tongPhi = phiXuLy + phiDichVu + phiThueKenh
 * @returns trả về tongPhi
 */
function getTongPhi() {
    return phiXuLy + phiDichVu + phiThueKenh;
}

//Hiển thị các giá trị output ra màn hình
function displayTienCuoc() {
    document.getElementById('phi-xu-ly').innerHTML = phiXuLy;
    document.getElementById('phi-dich-vu').innerHTML = phiDichVu;
    document.getElementById('phi-kenh-cao-cap').innerHTML = phiThueKenh;
    document.getElementById('tong-phi').innerHTML = tienCuoc;

}
//thêm sự kiên sử lý và in các giá trị tiền cước ra màn hình
document.getElementById('xu-ly-hoa-don').onclick = function () {
    if (loaiKH == 'ca-nhan') {
        phiXuLy = 4.5;
        phiDichVu = 20.5;
        phiThueKenh = 7.5 * soKenhCC;
        tienCuoc = getTongPhi();
    } else if (loaiKH == 'doanh-nghiep') {
        phiXuLy = 15;
        phiDichVu = 75;
        phiThueKenh = 50 * soKenhCC;
        phiDichVu += (soKN>10)?(soKN-10)*5:0;
        tienCuoc = getTongPhi();
    }
    displayTienCuoc();
}