import { LoaderFunction, useLoaderData, json } from 'remix';
import { getPost } from '~/services/post';
import ReactMarkdown from 'react-markdown';
import { PostPreviewSmall } from '~/components';
import { formatDateShort } from '~/utils/date';
import type { Post } from '~/services/post';

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const data = await getPost(params.slug);
    return json<Post>(data);
  } catch (error) {
    throw new Error(error);
  }
};

export default function Post() {
  const {
    title,
    createdAt,
    featuredImage: { url },
    categories,
    content: { markdown },
  } = useLoaderData<Post>();
  return (
    <div>
      <img src={url} />
      <h1>{title}</h1>
      <span>{formatDateShort(createdAt)}</span>
      <ReactMarkdown
        components={{
          p: (props) => <p className='mt-4'>{props.children}</p>,
        }}
        children={markdown}
      />
      <div></div>
      {categories?.[0]?.posts.map((p) => (
        <PostPreviewSmall key={p.title} {...p} imageUrl={p.featuredImage.url} />
      ))}
    </div>
  );
}
