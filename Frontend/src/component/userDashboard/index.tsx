import React, { ReactNode, useState } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaTruck,
} from "react-icons/fa";

// ---- Define types ----
type Order = {
  id: string;
  image?: string;
  items: string;
  status: "Delivered" | "Shipped" | "Processing";
  date: string;
  amount: string;
};

type WishlistItem = {
  id: string;
  name: string;
  image?: string;
  price: string;
  originalPrice: string;
  inStock: boolean;
};

type Review = {
  id: string;
  product: string;
  rating: number;
  date: string;
  review: string;
  helpful: number;
};

// ---- Props interface ----
interface DashboardProps {
  recentOrders: Order[];
  wishlistItems: WishlistItem[];
  recentReviews: Review[];
}

// ---- Main Component ----
const UserDashboard: React.FC<DashboardProps> = ({
  recentOrders,
  wishlistItems,
  recentReviews,
}) => {
  const [activeTab, setActiveTab] = useState<
    "orders" | "wishlist" | "reviews" | "activity"
  >("orders");

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="grid grid-cols-4 gap-2 bg-[#216869] text-white font-bold p-1 rounded-lg">
        {["orders", "wishlist", "reviews", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`text-sm font-medium p-2 rounded-lg hover:underline ${
              activeTab === tab ? "bg-white text-gray-700 font-bold" : ""
            }`}
          >
            {tab === "orders"
              ? "Recent Orders"
              : tab === "wishlist"
              ? "Wishlist"
              : tab === "reviews"
              ? "My Reviews"
              : "Activity"}
          </button>
        ))}
      </div>

      {/* Orders */}
      {activeTab === "orders" && (
        <section className="border border-gray-400 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <p className="text-base">
            Your latest purchases and their current status
          </p>
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center space-x-4 p-4 border border-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <img
                src={order.image || "/placeholder.svg"}
                alt={order.items}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {order.id}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {order.items}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{order.date}</p>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {order.amount}
                  </p>
                </div>
              </div>
              <button className="border px-3 py-1 text-sm rounded flex items-center">
                <FaTruck className="w-4 h-4 mr-2" />
                Track
              </button>
            </div>
          ))}
        </section>
      )}

      {/* Wishlist */}
      {activeTab === "wishlist" && (
        <section className="border border-gray-400 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">My Wishlist</h2>
          <p className="text-base">Items you've saved for later</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-400 rounded-lg p-4 space-y-4"
              >
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {item.price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {item.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        item.inStock
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <button className="px-3 py-1 text-sm rounded bg-black text-white flex items-center">
                      <FaShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <section className="border border-gray-400 rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-semibold">My Reviews</h2>
          <p className="text-base">
            Reviews you've written for purchased items
          </p>
          {recentReviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-400 rounded-lg p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {review.product}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
                <span className="text-xs border px-2 py-1 rounded flex items-center">
                  <FaCheckCircle className="w-3 h-3 mr-1" />
                  Verified Purchase
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {review.review}
              </p>
              <div className="text-sm text-gray-500">
                {review.helpful} people found this helpful
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Activity */}
      {activeTab === "activity" && (
        <section className="border border-gray-400 rounded-lg p-6 space-y-4">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <p className="text-base">
            Your shopping activity and account updates
          </p>

          <div className="space-y-4">
            <ActivityItem
              icon={<FaCheckCircle />}
              color="green"
              title="Order #ORD-2024-001 delivered"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<FaHeart />}
              color="blue"
              title="Added MacBook Pro to wishlist"
              time="1 day ago"
            />
            <ActivityItem
              icon={<FaStar />}
              color="purple"
              title="Left a 5-star review for Wireless Headphones"
              time="2 days ago"
            />
            <ActivityItem
              icon={<FaClock />}
              color="orange"
              title="Profile updated"
              time="1 week ago"
            />
          </div>
        </section>
      )}
    </div>
  );
};

// ---- Activity item component ----
interface ActivityItemProps {
  icon: ReactNode;
  color: string;
  title: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon,
  color,
  title,
  time,
}) => (
  <div className="flex items-center space-x-4 p-4 border rounded-lg">
    <div className={`p-2 rounded-full bg-${color}-100 dark:bg-${color}-900`}>
      <div className={`text-${color}-600 dark:text-${color}-400`}>{icon}</div>
    </div>
    <div className="flex-1">
      <p className="font-medium text-gray-900 dark:text-white">{title}</p>
      <p className="text-sm text-gray-500">{time}</p>
    </div>
  </div>
);

export default UserDashboard;
