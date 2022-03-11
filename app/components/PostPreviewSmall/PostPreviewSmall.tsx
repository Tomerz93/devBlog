import { Link } from 'remix';

interface PostPreviewSmallProps {
  slug: string;
  title: string;
  imageUrl: string;
}

const PostPreviewSmall: React.FC<PostPreviewSmallProps> = ({
  slug,
  title,
  imageUrl,
}) => (
  <Link to={`/posts/${slug}`}>
    <div>
      <img src={imageUrl} alt={`${title}-image`} />
    </div>
    <h4 className='text-lg'>{title}</h4>
  </Link>
);

export default PostPreviewSmall;
