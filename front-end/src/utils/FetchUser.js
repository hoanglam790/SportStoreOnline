import Axios from './AxiosConfig'
import connectApi from '@/common/ApiBackend'

const fetchUser = async() => {
    try {
        const responseData = await Axios({
            ...connectApi.getUser
        })
        return responseData.data

    } catch (error) {
        console.log(error)
    }
}
export default fetchUser