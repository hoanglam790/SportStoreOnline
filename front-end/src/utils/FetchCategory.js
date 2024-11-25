import Axios from './AxiosConfig'
import connectApi from '@/common/ApiBackend'

const fetchCategory = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getCategory
        })
        return responseData.data

    } catch (error) {
        console.log(error)
    }
}
export default fetchCategory