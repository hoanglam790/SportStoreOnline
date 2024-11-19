import Swal from 'sweetalert2'

const axiosErrorAnnounce = (error) => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 3000,
        customClass: {
            title: 'text-xl font-semibold'
        }
    })
}

export default axiosErrorAnnounce