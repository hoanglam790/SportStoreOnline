
const urlConvert = (name) => {
    if(!name){
        return ''
    }
    // Chuyển đổi tên thành dạng không dấu
    let normalizedName = name.toString().toLowerCase()
    
    normalizedName = normalizedName
        .normalize('NFD') // Phân tách các ký tự có dấu
        .replaceAll(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
        .replaceAll('đ','d') // Thay thế đ thành d
        .replaceAll('ă','a') // Thay thế ă thành a
        .replaceAll('â','a') // Thay thế â thành a

    // Thay thế các ký tự đặc biệt bằng dấu gạch ngang
    const url = normalizedName.replaceAll(' ','-').replaceAll(',','-').replaceAll('&','-')
    return url
}

export default urlConvert