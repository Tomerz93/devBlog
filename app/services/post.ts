import { request, gql } from 'graphql-request';

interface FeaturedImage {
  url: string
}
interface PostSmall {
  title: string;
  slug: string
  featuredImage: FeaturedImage;

}
export interface Category {
  name: string;
  slug: string;
  posts?: PostSmall[]
}
export interface Post {
  title: string;
  slug: string;
  createdAt: Date;
  categories: Category[];
  featuredImage: {
    url: string;
  };
  isFeatured: boolean;
  excerpt: string;
  content: {
    text: string;
  };
};



export const getPosts = async (): Promise<{ posts: Post[] }> => {
  const query = gql`
      query getPosts {
        posts {
          isFeatured
          createdAt
          categories {
            name
            slug
          }
          featuredImage {
            url(
              transformation: {
                image: { resize: { width: 800, height: 400, fit: clip } }
              }
            )
          }
          title
          slug
          excerpt
          content {
            text
          }
        }
      }
    `;
  return await request(
    process.env.GRAPH_CMS_API_KEY,
    query
  );
};

export const transformPost = (postsData: Post[]) => postsData.reduce<{ featuredPosts: Post[]; posts: Post[] }>(
  (acc, curr) =>
    curr.isFeatured
      ? {
        ...acc,
        featuredPosts: [...(acc.featuredPosts ?? []), curr],
      }
      : {
        ...acc,
        posts: [...(acc.posts ?? []), curr],
      },
  { featuredPosts: [], posts: [] }
);

export const getPost = async (slug: string): Promise<Post> => {
  const query = gql`
  query getPost($slug: String!) {
   post(where: {slug: $slug}) {
    categories {
      name
      slug
      posts(first: 1, orderBy: createdAt_ASC,where: {NOT: {slug: $slug}}) {
        title
        slug
        featuredImage {
          url(transformation: {image: {resize: {fit: clip, height: 150, width: 150}}})
        }
      }
    }
    content {
      markdown
    }
    title
    createdAt
    featuredImage {
      url
    }
  }
  }
  `
  const data: { post: Post } = await request(
    process.env.GRAPH_CMS_API_KEY,
    query, { slug }
  )
  return data.post
}

export const getPostsByCategory = async (): Promise<Category[]> => {
  const query = gql`
    query getCategoriesWithPosts{
      categories {
        name
        slug
        posts {
          title
          slug
          featuredImage {
            url(transformation: {image: {resize: {fit: clip, height: 600, width: 600}}})
          }
        }
    }
  }
  `
  const data: { categories: Category[] } = await request(
    process.env.GRAPH_CMS_API_KEY,
    query
  )
  return data.categories
}