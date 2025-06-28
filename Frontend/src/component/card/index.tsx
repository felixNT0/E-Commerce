import { FaRegHeart } from "react-icons/fa";
import { HiOutlineTrendingUp } from "react-icons/hi";
import { LuCreditCard } from "react-icons/lu";
import { TbCube } from "react-icons/tb";

export default function ProfileCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div>
        <section className="p-6 border border-gray-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TbCube className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                47
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Orders
              </p>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="p-6  border border-gray-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <LuCreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2,847
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Spent
              </p>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="p-6  border border-gray-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FaRegHeart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                12
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Wishlist Items
              </p>
            </div>
          </div>
        </section>
      </div>

      <div>
        <section className="p-6  border border-gray-400 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <HiOutlineTrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1,250
              </p>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Loyalty Points
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
