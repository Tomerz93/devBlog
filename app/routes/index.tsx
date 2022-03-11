import { useLoaderData } from 'remix';
import { PostPreview, PageTitle, Category } from '~/components';
import { getPosts, transformPost } from '~/services/post';
import { formatDateShort } from '~/utils/date';

export type Post = {
  title: string;
  slug: string;
  createdAt: string;
  categories: { name: string; slug: string }[];
  featuredImage: {
    url: string;
  };
  isFeatured: boolean;
  excerpt: string;
  content: {
    text: string;
  };
};

export const loader = async (): Promise<{
  featuredPosts: Post[];
  posts: Post[];
}> => {
  return transformPost((await getPosts()).posts);
};

export default function Index() {
  const { posts, featuredPosts } =
    useLoaderData<{ featuredPosts: Post[]; posts: Post[] }>();
  const featuredPost = featuredPosts[0];

  return (
    <div className='container'>
      <PageTitle text='featured' />
      <div>
        <img src={featuredPost.featuredImage.url} />
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 py-2'>
          {featuredPost.categories.map((c) => (
            <Category key={c.slug} {...c} />
          ))}
        </div>
        <span>{formatDateShort(featuredPost.createdAt)}</span>
      </div>
      <h4 className='text-xl mb-4'>{featuredPost.title}</h4>
      <p className='mb-8'>{featuredPost.excerpt}</p>
      <div>
        {posts.map((p) => (
          <PostPreview
            {...p}
            key={p.title}
            image={p.featuredImage.url}
            date={p.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
