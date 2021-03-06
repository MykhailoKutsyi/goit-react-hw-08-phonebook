import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="Loader">
      <TailSpin color="#00BFFF" height={30} width={30} className="Loader" />
    </div>
  );
};

export default Loader;
