const convertToVietnameseName = (str) => {
    // Thay thế gạch ngang thành dấu cách
    let result = str.replaceAll('-', ' ')

    // Thực hiện thay đổi các từ có thể có dấu
    result = result.replace(/\bAo\b/g, 'Áo')
                   .replace(/\bbong\b/g, 'bóng')
                   .replace(/\bda\b/g, 'đá')

    return result
}

export default convertToVietnameseName