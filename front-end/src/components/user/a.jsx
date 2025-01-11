<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
    {
        productData.map((p,index) => {
            return(
                <div className='w-36 p-4 bg-white rounded'>
                    <div>
                        <img 
                            src={p?.image[0]} 
                            alt={p.name}
                            onClick={() => 
                            {
                                setOpenProductDetail(true)
                                setEditProduct(p)
                            }}
                            className='w-full h-36 mt-3 object-scale-down cursor-pointer'
                        />
                    </div>
                    <p className='font-normal mt-2 truncate' title={p?.name}>
                        {p?.name}
                    </p>
                    <div className='flex items-center h-10 mt-3 gap-3 text-sm'>
                        <button onClick={() => 
                            {   
                                setOpenEditProduct(true),
                                setEditProduct(p)
                            }} 
                            className='w-full h-8 bg-blue-600 hover:bg-blue-700 rounded focus:outline-none flex items-center justify-center'
                            title='Chỉnh sửa'>
                            <FaEdit size={20} className=''/>                   
                        </button>
                        <button onClick={() => {
                                handleDeleteProduct(),
                                setDeleteProduct(p)
                            }} 
                            className='w-full h-8 bg-red-500 hover:bg-red-700 rounded focus:outline-none flex items-center justify-center'
                            title='Xóa'>
                            <RiDeleteBin6Line size={20} />
                        </button>
                    </div>
                </div>
            )
        })
    }                                           
</div>