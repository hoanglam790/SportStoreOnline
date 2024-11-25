import Axios from './AxiosConfig'
import connectApi from '@/common/ApiBackend'

const fetchSubCategory = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getAllSubCate
        })
        return responseData.data

    } catch (error) {
        console.log(error)
    }
}
export default fetchSubCategory