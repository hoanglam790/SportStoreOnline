
const displayCurrencyToVND = (number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0    
    })
    return formatter.format(number)
}

export default displayCurrencyToVND