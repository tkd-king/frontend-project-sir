import React from 'react'
import Link from 'next/link'
function RoutedPath({page}) {
  return (
    <div className='ml-[15%] flex items-center justify-center gap-2  text-center w-[200px] mt-[2%] font-bolder p-2 bg-white rounded-md'>
      <Link href={`/`} >Home </Link> \ <p>{page}</p>
    </div>
  )
}

export default RoutedPath
