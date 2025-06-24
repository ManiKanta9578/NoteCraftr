import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center min-h-screen space-x-2 bg-opacity-100">
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.5s]"></div>
    </div>
  );
};

export default LoadingSpinner;