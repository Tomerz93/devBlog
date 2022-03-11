interface PageTitleProps {
  text: string;
}
const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return <h3 className='uppercase mb-5 text-3xl font-400'>{text}</h3>;
};

export default PageTitle;
