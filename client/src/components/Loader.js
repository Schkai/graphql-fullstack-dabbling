import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

//what a beautiful loader
const Loader = () => (
    <div className="full-page-loader">
        <ClipLoader
            sizeUnit={'px'}
            size={150}
            color={'#3423D1'}
            loading={true}
        />
    </div>
)

export default Loader
