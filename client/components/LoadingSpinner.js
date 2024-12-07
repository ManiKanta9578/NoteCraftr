import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      style={{ top: 0, left: 0 }}
    >
      <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;