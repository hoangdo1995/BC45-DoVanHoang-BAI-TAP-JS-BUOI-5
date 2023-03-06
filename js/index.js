// GLOBAL FUNCTION
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

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
function diemMon(mon){
    var diem = +document.getElementById('diem-'+mon).value;
    return diem;
}

/**
 * Trả về giá trị của input có name là 'name'
 * @param {*} name name của input cần lấy giá trị
 * @returns  giá trị của input có name = name
 */
function getValueByName(name){
    var listTags = document.getElementsByName(name);
    console.log(listTags);
    for(var i = 0; i < listTags.length; i++){
        if(listTags[i].checked === true){
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
function mappingValue(value,data1,data2){
    for(let i = 0; i < data1.length; i++){
        if(value===data1[i]){
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
function addListenerRadioByName(targetName, listener,behavior){
    var listRadio = document.getElementsByName(targetName);
    listRadio.forEach(item =>{
        item.addEventListener(listener,behavior);
    });
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
function xetTuyen(diem1,diem2,diem3,diemKV,diemDT,diemChuan){
    var result = false;
    if(diem1<=0||diem2<=0||diem3<=0){
        result = false;
        return result;
    }
    else if(tong = diem1+diem2+diem3+diemDT+diemKV >= diemChuan){
        result = true;
        return result;
    }
    else{
        result = false;
        return result;
    }
}


/**
 * In tổng điểm ra màn hình
 */
function inDiemTong(){
    laytongDiem();
    document.getElementById('tong-diem').innerHTML =  tongDiem;
}

/**
 * tính tổng điểm ba môn cộng với diemKV và diemDT
 * @returns tongDiem
 */
function laytongDiem(){
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
addListenerRadioByName('khu-vuc','change',function(){
    diemKhuVuc = mappingValue(getValueByName('khu-vuc'),['khu-vuc-1','khu-vuc-2','khu-vuc-3'],[2,1,0.5]);
    console.log('Điểm khu vực: '+ diemKhuVuc);
})

/**
 * add xự kiện cho các radio button doi-tuong
 */
addListenerRadioByName('doi-tuong','change',function(){
    diemDoiTuong = mappingValue(getValueByName('doi-tuong'),['doi-tuong-1','doi-tuong-2','doi-tuong-3'],[2.5,1.5,1]);
    console.log('Điểm dối tương: ' +diemDoiTuong);


})

/**
 * add listener cho các input diem
 */
listNhapDuLieu.forEach((item) => {
    item.addEventListener('change',inDiemTong);
});
/**
 * add xự kiện nhập điểm chuẩn
 */
document.getElementById('diem-chuan').addEventListener('change',function(){
    diemChuan = +this.value;
})

/**
 * hàm xử lí in kết quả ra màn hình
 */
function xemKetQua(){
    var inKetQua = document.getElementById('ket-qua');
    var ketQua = xetTuyen(diemToan,diemVan,diemHoa,diemKhuVuc,diemDoiTuong,diemChuan);
    if(ketQua){
        inKetQua.classList.add('alert-success');
        inKetQua.classList.remove('alert-danger');

        inKetQua.innerHTML = 'Bạn đã đậu';
        
    }
    else{
        inKetQua.classList.add('alert-danger');
        inKetQua.classList.remove('alert-success');
        inKetQua.innerHTML = 'Bạn đã rớt';
    }
}
/**
 * add xự kiên cho nút xem kết quả
 */
document.getElementById('xem-ket-qua').addEventListener('click',xemKetQua);

//TÍNH TIỀN ĐIỆN

//input 
var hoTen1 = '';
var soDienTieuThu = 0;
//output
var tienDien = 0;

/**
 * add xự kiện nhập tên khách hàng
 */
document.getElementById('ho-ten').addEventListener('change',function(){
    hoTen1 = this.value;
    document.getElementById('ho-ten-output').innerHTML = hoTen1;
})

/**
 * add xự kiện nhập vào số điện tiêu thụ
 */
document.getElementById('so-dien').addEventListener('change',function(){
    soDienTieuThu = +this.value;
    document.getElementById('so-dien-output').innerHTML = soDienTieuThu;
})

/**
 * Hàm tính số tiền điện phải trả dựa trên số điện tiêu thụ nhập vào {soDien}
 * @param {*} soDien số điện tiêu thụ
 * @returns tra về số tiền điện phải tra theo công thức tính bậc giá điện 
 */
function tinhTienDien(soDien){
    // processing
    var soTien = 0;
    if(soDien >= 0 && soDien <= 50){
        soTien = soDien*500;
    }
    else if(soDien > 50 && soDien <= 100){
        soTien = 500*50 + (soDien-50)*650;
    }
    else if(soDien > 100 && soDien <= 200){
        soTien = 500*50 + 50*650 +  (soDien-100)*850;
    }
    else if(soDien > 200 && soDien < 350){
        soTien = 500*50 + 50*650 + 100*850 + (soDien-200)*1100;
    }
    else if(soDien >= 350){
        soTien = 500*50 + 50*650 + 100*850 + + 150*1100 + (soDien-350)*1300;
    }
    return soTien;
    
}

/**
 * add xự kiện tính và in kết quả tiền điện ra màn hình
 */
document.getElementById('tinh-tien-dien').onclick = function(){
    tienDien = tinhTienDien(soDienTieuThu);
    document.getElementById('ket-qua-tien-dien').innerHTML = `Số tiền điện bạn phải trả là `+VND.format(tienDien);
}


//TÍNH THUẾ THU NHẬP CÁ NHÂN
// input
var thuNhap = 0;
var hoTen2 = '';
var phuThuoc = 0;
// output
var tienThue = 0;


// nhập vào các giá trị dựa trên id và in ra output
document.getElementById('ho-ten-nop-thue').addEventListener('change',function(){
    hoTen2 = this.value;
    document.getElementById('ho-ten-nop-the-output').innerHTML = hoTen2;
});

document.getElementById('tong-thu-nhap').addEventListener('change',function(){
    thuNhap = this.value;
    document.getElementById('thu-nhap-output').innerHTML = VND.format(thuNhap);
});

document.getElementById('nguoi-phu-thuoc').addEventListener('change',function(){
    phuThuoc = this.value;
    document.getElementById('phu-thuoc-output').innerHTML = phuThuoc;
});


var mucThue = [0.05,0.1,0.15,0.2,0.25,0.3,0.35];
var buocThue = [60000000,120000000,210000000,384000000,624000000,960000000];

/**
 * lấy giá khoảng thu nhập chịu thuế
 * @param {*} thunhap 
 * @param {*} soNguoiPhuThuoc 
 * @returns 
 */
function layThuNhapChiuThue(thunhap,soNguoiPhuThuoc){
    return thunhap - 4000000 - soNguoiPhuThuoc*1600000;
}


/**
 * Tính tiền thuế dựa trên công thức
 * @param {*} thuNhapThue 
 * @param {*} mucThue là mảng các mức thuế
 * @param {*} buocThue là mảng các bước tiền thuế
 * @returns 
 */
function tinhTienThue(thuNhapThue, mucThue, buocThue ){
    
    if(thuNhapThue <= 0){
        return 0;
    }
    else if(thuNhapThue <= buocThue[0]){
        return thuNhapThue*mucThue[0];
    }
    else if(thuNhapThue > buocThue[0] && thuNhapThue <= buocThue[1]){
        return buocThue[0]*mucThue[0] + (thuNhapThue - buocThue[0])*mucThue[1];
    }
    else if(thuNhapThue > buocThue[1] && thuNhapThue <= buocThue[2]){
        return buocThue[0]*mucThue[0] + (buocThue[1]-buocThue[0])*mucThue[1] + (thuNhapThue - buocThue[1])*mucThue[2];
    }
    else if(thuNhapThue > buocThue[2] && thuNhapThue <= buocThue[3]){
        return buocThue[0]*mucThue[0] + (buocThue[1]-buocThue[0])*mucThue[1] + (buocThue[2]-buocThue[1])*mucThue[2] + (thuNhapThue - buocThue[2])*mucThue[3];
    }
    else if(thuNhapThue > buocThue[3] && thuNhapThue <= buocThue[4]){
        return buocThue[0]*mucThue[0] + (buocThue[1]-buocThue[0])*mucThue[1] + (buocThue[2]-buocThue[1])*mucThue[2] + (buocThue[3]-buocThue[2])*mucThue[3] + (thuNhapThue - buocThue[3])*mucThue[4];
    }
    else if(thuNhapThue > buocThue[4] && thuNhapThue <= buocThue[5]){
        return buocThue[0]*mucThue[0] + (buocThue[1]-buocThue[0])*mucThue[1] + (buocThue[2]-buocThue[1])*mucThue[2] + (buocThue[3]-buocThue[2])*mucThue[3] + (buocThue[4]-buocThue[3])*mucThue[4] + (thuNhapThue - buocThue[4])*mucThue[5];
    }
    else if(thuNhapThue >= buocThue[5]){
        return buocThue[0]*mucThue[0] + (buocThue[1]-buocThue[0])*mucThue[1] + (buocThue[2]-buocThue[1])*mucThue[2] + (buocThue[3]-buocThue[2])*mucThue[3] + (buocThue[4]-buocThue[3])*mucThue[4] + (buocThue[5]-buocThue[4])*mucThue[5] + (thuNhapThue - buocThue[5])*mucThue[6];
    }
}

/**
 * Tính và hiển thị kết qua ra màn hình qu xự kiện click của button id ='tinh-thue'
 */
document.getElementById('tinh-thue').onclick = function(){
    tienThue = tinhTienThue(layThuNhapChiuThue(thuNhap,phuThuoc),mucThue,buocThue);
    document.getElementById('thue-output').innerHTML = VND.format(tienThue);
}

//TÍNH TIỀN CÁP

// input
var maKH = '';
var loaiKH = '';
var soKenhCC = 0;
var soKN = 0;
// output
var tienCuoc = 0;

document.getElementById('ma-khach-hang').addEventListener('change',function(){
    hoTen2 = this.value;
    document.getElementById('ma-khach-hang-output').innerHTML = hoTen2;
});
document.getElementById('so-ket-noi').addEventListener('change',function(){
    hoTen2 = this.value;
    document.getElementById('so-ket-noi-output').innerHTML = hoTen2;
});
document.getElementById('so-kenh-cao-cap').addEventListener('change',function(){
    hoTen2 = this.value;
    document.getElementById('so-kenh-cao-cap-output').innerHTML = hoTen2;
});


addListenerRadioByName('loai-khach-hang','change',function(){
    loaiKH = getValueByName('loai-khach-hang');
    if(loaiKH === 'doanh-nghiep'){
        document.getElementById('ket-noi-content').style.display = 'block';
        document.getElementById('so-ket-noi').disabled = false;
    }
    else{
        document.getElementById('so-ket-noi').disabled = true;
        document.getElementById('ket-noi-content').style.display = 'none';
    }
    document.getElementById('so-ket-noi-output').innerHTML = soKN;
})







    

