import Pagination from '@/components/pagination';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import { client } from "../../libs/client";
import { Blog } from "../../types/blog";

type Props = {
  blog: Blog;
};

// 静的生成のためのパスを指定します
export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: "blog", queries: {limit: 1000} });
  const blog: Blog[] = data.contents

  const paths = blog.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps  = async (context) => {
  const id = context.params?.id;
  const idExceptArray = id instanceof Array ? id[0] : id;

  const data = await client.get({ endpoint: "blog", contentId: idExceptArray });

  return {
    props: {
      blog: data,
    },
  };
};

const BlogId = ({blog}: Props) => {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-3 flex flex-col justify-center items-center">
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <p>カテゴリー : {blog.category ? blog.category.name : "なし"}</p>
        <div className="prose"
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
        />
    </main>
    </>
  )
}

export default BlogId;