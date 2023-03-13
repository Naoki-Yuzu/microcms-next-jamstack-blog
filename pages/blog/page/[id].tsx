import Pagination from '@/components/pagination';
import { client } from '../../../libs/client';
import React from 'react'
import { Blog } from '../../../types/blog';
import Link from 'next/link';
import { GetStaticProps } from 'next';

type Props = {
  blog: Array<Blog>;
  totalCount: number;
};

const PER_PAGE = 5;

export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: "blog" });

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params!.id!;
  const idExceptId = Number(id);
  const data = await client.get({ endpoint: "blog", queries: { offset: (idExceptId - 1) * 5, limit: 5 } });

  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
    },
  };
}

const BlogPageId = ({blog, totalCount}: Props) => {
  return (
    <div>
      <ul>
        {blog.map(blog => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount}/>
    </div>
  )
}

export default BlogPageId;