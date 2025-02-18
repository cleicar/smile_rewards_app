import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

export const Header = () => {
  return (
    <nav className="flex items-center justify-between bg-white p-4 rounded-lg border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">✦</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <MagnifyingGlassIcon className="w-6 h-6" />
        </button>

        <button className="relative text-gray-500 hover:text-gray-700">
          <BellIcon className="w-6 h-6" />
        </button>

        <button className="text-gray-500 hover:text-gray-700">
          <Cog6ToothIcon className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-gray-700 font-medium">Cleiviane</span>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-bold">CC</span>
          </div>
        </div>
      </div>
  </nav>
  );
}

export default Header;