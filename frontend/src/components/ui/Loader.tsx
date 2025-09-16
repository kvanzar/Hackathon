export function Loader() {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-600"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-600 [animation-delay:0.2s]"></div>
        <div className="w-2 h-2 rounded-full animate-pulse bg-indigo-600 [animation-delay:0.4s]"></div>
        <span className="text-sm font-medium text-gray-700">Planning your adventure...</span>
      </div>
    );
  }