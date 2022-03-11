import { Link } from 'remix';

interface CategoryProps {
  name: string;
  slug: string;
}
export const Category: React.FC<CategoryProps> = ({ name, slug }) => {
  return (
    <Link
      to={`/categories/${slug}`}
      className='inline-block px-2 py-2 rounded-sm bg-blue-800 uppercase'
    >
      {name}
    </Link>
  );
};

export default Category;
