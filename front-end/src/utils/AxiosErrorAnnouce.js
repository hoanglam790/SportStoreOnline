import toast from 'react-hot-toast'

const axiosErrorAnnounce = (error) => {
    toast.error(
        error?.response?.data?.message
    )
}

export default axiosErrorAnnounce