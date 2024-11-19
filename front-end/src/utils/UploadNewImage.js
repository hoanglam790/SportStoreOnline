import Axios from './AxiosConfig'
import connectApi from '@/common/ApiBackend'

const uploadNewImage = async(image) => {
    try {
        const formData = new FormData()
        formData.append('image', image)

        const responseData = await Axios({
            ...connectApi.uploadImage,
            data: formData
        })
        return responseData
    } catch (error) {
        return error
    }
}

export default uploadNewImage