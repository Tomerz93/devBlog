import { useParams } from 'remix';

export default function Categories() {
  const { slug } = useParams();
  return <div>{slug}</div>;
}
