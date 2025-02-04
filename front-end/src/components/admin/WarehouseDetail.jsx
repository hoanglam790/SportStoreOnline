import React, { useState } from 'react'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import moment from 'moment'
import NoData from '@/components/admin/NoDataSample'
import displayCurrencyToVND from '@/utils/FormatCurrency'

const WarehouseDetail = ({ back, data: productData }) => {
    const [productInWarehouse, setProductInWarehouse] = useState({
        _id: productData?._id,
        name: productData?.name,
        warehouse_history: productData?.warehouse_history
    })

    return (
        <section>
        {
            !productInWarehouse?.warehouse_history?.[0] ? (
                <>
                    <NoData />
                    <div className='flex items-center justify-center mb-5 pb-5'>
                        <button onClick={back} className='bg-transparent text-blue-800 border border-blue-600 hover:bg-blue-700 hover:text-white outline-none rounded-md w-[400px] text-xl font-semibold p-3'>Quay lại trang sản phẩm tồn kho</button>
                    </div>
                </>                   
            ) : (                   
                <>
                <div className='flex items-center justify-between w-full mt-2'>
                    <button onClick={back} className='text-left ml-2'>
                        <HiArrowNarrowLeft size={25} />
                    </button>
                    <h2 className='font-semibold text-center flex-1'>Lịch sử cập nhật sản phẩm tồn kho</h2>
                </div>
                <div className='flex items-center gap-2 mx-3 mt-5'>
                    <p className='font-semibold'>Tên sản phẩm:</p>
                    <span className='italic'>{productInWarehouse?.name}</span>
                </div>
                <div className='bg-white pb-4 mt-6 mx-3 flex flex-col h-full'>
                    <div className='min-h-[63vh]'>
                        <table className='userTable w-full'>
                            <thead>
                                <tr className='bg-black text-white'>
                                    <th className='w-20'>Lần</th>
                                    <th className='w-[170px]'>Số lượng nhập</th>
                                    <th className='w-[200px]'>Đơn giá nhập</th>
                                    <th className='w-[200px]'>Ngày nhập</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productInWarehouse?.warehouse_history?.map((p, index) => {
                                        return(
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{p?.quantity_added}</td>
                                                <td>{displayCurrencyToVND(p?.cost_price)}</td>
                                                <td>{moment(p?.date).format('DD/MM/YYYY - HH:mm:ss')}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
            )
        }            
        </section>
    )
}

export default WarehouseDetail
