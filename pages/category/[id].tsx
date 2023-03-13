import { client } from '../../libs/client';
import { Blog } from '../../types/blog';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react'
import Link from 'next/link';

type Props = {
  blog: Array<Blog>;
};

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });
  const blog: Blog[] = data.contents

  const paths = blog.map((content) => `/category/${content.id}`);

  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps  = async (context) => {
  const id = context.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;
  const data = await client.get({ endpoint: "blog", queries: {filters: `category[equals]${idExceptArray}`}});

  return {
    props: {
      blog: data.contents,
    },
  };
};

const CategoryId = ({blog}: Props) => {
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryId;