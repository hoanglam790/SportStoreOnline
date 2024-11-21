
const displayCurrency = (number) => {
    const formatter = new Intl.NumberFormat('en-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 2
    })
    return formatter.format(number)
}

export default displayCurrency