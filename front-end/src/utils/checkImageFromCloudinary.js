import Axios from '@/utils/AxiosConfig'
import connectApi from '@/common/ApiBackend';

const checkImageExistence = async (fileName) => {
    try {
        // Gửi yêu cầu tới server để kiểm tra ảnh tồn tại
        const response = await Axios({
            ...connectApi.checkImage,
            params: { public_id: fileName }
        });

        return response.data.exists
    } catch (error) {
        return error
    }
}
 export default checkImageExistence