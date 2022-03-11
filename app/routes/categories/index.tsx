import { LoaderFunction, useLoaderData, json } from 'remix';
import { getPostsByCategory } from '~/services/post';
import { PostPreviewSmall } from '~/components';
import type { Category } from '~/services/post';
import { Link } from 'react-router-dom';

export const loader: LoaderFunction = async (): Promise<Category[]> => {
  try {
    const data = await getPostsByCategory();
    return json(data);
  } catch (error) {
    throw new Error(error);
  }
};

const Categories = () => {
  const data = useLoaderData<Category[]>();
  console.log(data);
  return (
    <div>
      {data.map(({ slug, name, posts }) => (
        <>
          <Link to={`/categories/${slug}`}>{name}</Link>
          <div className='horizontal-scroll-container' key={name}>
            {posts?.map((post) => (
              <PostPreviewSmall
                key={post.title}
                {...post}
                imageUrl={post?.featuredImage?.url}
              />
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Categories;
