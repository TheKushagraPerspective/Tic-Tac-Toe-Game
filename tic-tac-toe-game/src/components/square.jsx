import React from 'react'

const Square = ({value , clickBtn , index}) => {
  return (
    <>
        <button 
        className='w-20 h-20 flex items-center justify-center border-1 bg-gray-700 text-3xl font-bold rounded-md shadow-md hover:bg-blue-500 transition-all duration-300 cursor-pointer'
        onClick={() => {clickBtn(index)}}
        >
            {/* X or O will be placed here */}
            {value}
        </button>
    </>
  )
}

export default Square
