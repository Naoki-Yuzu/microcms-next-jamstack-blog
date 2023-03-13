import Link from 'next/link';
import React from 'react'

const Pagination = ({ totalCount } : {totalCount: number}) => {
  const PER_RANGE = 5;
  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

  return (
    <ul className="flex justify-center gap-2">
      {range(1, Math.ceil(totalCount / PER_RANGE)).map((number, index) => (
        <li className="border" key={index}>
          <Link href={`/blog/page/${number}`}>{number}</Link>
        </li>
      ))}
    </ul>
  )
}

export default Pagination