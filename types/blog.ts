export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  body: string;
  category: Category;
};

export type Category = {
  id: string;
  name: string;
} | undefined;

