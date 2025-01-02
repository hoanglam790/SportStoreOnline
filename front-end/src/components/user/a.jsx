<div className='flex flex-col px-5 py-4 border rounded cursor-pointer transition-all'>
                                    <div className='w-full h-full relative'>
                                        <img
                                            src={p?.image[0]}
                                            className='w-full h-[250px] object-cover'
                                        />                      
                                    </div>
                                    <div className='p-2 flex-1 flex flex-col'>
                                        <div className='flex-1 mt-3'> {/** truncate: hiển thị ngắn gọn văn bản*/}
                                            <h5 className='text-sm sm:text-base text-center font-bold text-gray-800'>{p?.name}</h5>
                                            <div className='flex flex-wrap gap-2 mt-2'>
                                                <div className='flex gap-2'>
                                                {Boolean(p?.discount) && (
                                                    <>
                                                        <p className='text-green-600 bg-green-100 px-2 w-fit text-sm rounded-full'>
                                                            -{p?.discount}%
                                                        </p>
                                                        <strike className='text-gray-500 font-normal text-sm'>{displayCurrencyToVND(p?.price)}</strike>
                                                    </>                  
                                                )}
                                                </div>
                                            </div>
                                            <div className='flex flex-wrap justify-between gap-2 mt-2'>
                                                <div className='flex items-center gap-1'>
                                                    <div className='font-semibold text-xl'>
                                                        {displayCurrencyToVND(displayDiscountPrice(p?.price, p?.discount))}
                                                    </div>
                                                </div>
                                                <div className=''>
                                                    {p?.quantity_in_stock == 0 ? (
                                                    <p className='text-red-500 text-sm text-center'>Hết hàng</p>
                                                    ) : (
                                                        <AddToCartButton data={p} />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>