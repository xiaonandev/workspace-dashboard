type Props = {
  title: string;
  description: string;
};
const PageHeader = ({ title, description }: Props) => {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default PageHeader;
