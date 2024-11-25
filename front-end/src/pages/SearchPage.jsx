import React from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const params = useParams()

    return (
        <div>
        Search ({ params.text })
        </div>
    )
}

export default SearchPage
