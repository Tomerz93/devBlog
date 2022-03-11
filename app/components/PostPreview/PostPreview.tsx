import { Link } from 'remix';
import { formatDateShort } from '~/utils/date';

interface Props {
  slug: string;
  date: string;
  title: string;
  image: string;
}
const PostPreview: React.FC<Props> = ({ slug, date, title, image }) => {
  return (
    <div className='container post-preview-container'>
      <div className='flex'>
        <div className='mr-4' style={{ maxWidth: 300 }}>
          <img src={image} />
        </div>
        <div>
          <h3 className='text-3xl'>{title}</h3>
          <span className='text-gray-300 block mb-5'>
            {formatDateShort(date)}
          </span>
          <Link className='cursor-pointer' to={`/posts/${slug}`}>
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PostPreview;
