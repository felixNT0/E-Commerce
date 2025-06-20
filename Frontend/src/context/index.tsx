"use client";

import { ProductItem } from "@/types/product";
import {
  generateUniqueId,
  getStoredJSONValuesFromLocalStorage,
  setStoredJSONValuesToLocalStorage,
} from "@/util/helper";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Product extends ProductItem {
  id: string;
  [key: string]: any;
}

interface CartItem extends ProductItem {
  quantity: number;
}

interface OrderItem {
  productId: string;
  productName: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  orderDate: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  items: OrderItem[];
}

interface CategoryOption {
  value: string;
  label: string;
}

const initialUser: IUser = {
  isLoggedIn: false,
  first_name: "",
  last_name: "",
  display_name: "",
  date_of_birth: "",
  email: "",
  password: "",
  password_confirm: "",
};

interface AppContextType {
  products: Product[];
  cartData: CartItem[];
  categories: CategoryOption[];
  orders: Order[];
  addProduct: (value: Product) => void;
  removeProduct: (productId: string) => void;
  updateProducts: (value: Product[]) => void;
  addToCart: (product: ProductItem) => void;
  editProduct: (product: ProductItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  makeOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
  changeOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateOrderList: (orders: Order[]) => void;
  currentUser: IUser;
  isLoading: boolean;
  isLoadingProduct: boolean;
  updateCartData: (cartData: CartItem[]) => void;
  logout: () => void;
  addToCheckout: (item: CartItem[]) => void;
  checkoutItems: CartItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [cartData, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [currentUser, setCurrentUser] = useState<IUser>(initialUser);

  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await getStoredJSONValuesFromLocalStorage(
        "currentUser"
      );
      if (storedUser) {
        setCurrentUser(storedUser);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      const checkoutItems = await getStoredJSONValuesFromLocalStorage(
        "checkoutItems"
      );
      if (checkoutItems) {
        setCheckoutItems(checkoutItems);
      }
    };

    fetchCheckoutItems();
  }, []);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const orderItems = await getStoredJSONValuesFromLocalStorage("orders");
      if (orderItems) {
        setOrders(orderItems);
      }
    };

    fetchOrderItems();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoadingProduct(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      const mappedProducts: ProductItem[] = data.map((product: any) => ({
        id: generateUniqueId(),
        name: product.title,
        category: product.category,
        price: product.price,
        imageUrl: product.image,
      }));

      const storedProducts =
        (await getStoredJSONValuesFromLocalStorage("products")) || [];
      if (storedProducts.length === 0) {
        await setStoredJSONValuesToLocalStorage("products", [
          ...storedProducts,
          ...mappedProducts,
        ]);
      }
      setProducts(() => [...storedProducts]);

      setIsLoadingProduct(false);
    } catch (error) {
      setIsLoadingProduct(false);
    }
  };

  const fetchCategories = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const data = await response.json();

    const others: string[] = [
      "home appliances",
      "books",
      "toys",
      "sports equipment",
      "automotive",
      "health and beauty",
      "groceries",
      "furniture",
      "pet supplies",
    ];
    const category = [...data, ...others];
    const mappedCategories: CategoryOption[] = [
      { value: "", label: "Select Any category" },
      ...category.map((category: string) => ({
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
      })),
    ];

    setCategories(mappedCategories);
  };

  const updateProducts = async (value: Product[]) => {
    setProducts(value as Product[]);
    await setStoredJSONValuesToLocalStorage("products", value);
  };

  const addToCart = (product: ProductItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const updatedCart = existingItem
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      updateCartData(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) => {
          if (item.id === productId) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null;
          }
          return item;
        })
        .filter((item) => item !== null);
      updateCartData(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    updateCartData([]);
  };

  const addProduct = (product: Product) => {
    const updatedProducts = [product, ...products];
    updateProducts(updatedProducts);
  };

  const removeProduct = (productId: string) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    updateProducts(updatedProducts);
  };

  const editProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    updateProducts(updatedProducts);
  };

  const fetchCart = async () => {
    try {
      const storedCart = await getStoredJSONValuesFromLocalStorage("cart");
      if (storedCart) {
        setCart(storedCart);
      }
    } catch (error) {
      console.error(`Error fetching cart data: ${error}`);
    }
  };

  const logout = async () => {
    const currentUser = await getStoredJSONValuesFromLocalStorage(
      "currentUser"
    );

    if (currentUser) {
      const updatedUser = { ...currentUser, isLoggedIn: false };
      setCurrentUser(updatedUser);
      await setStoredJSONValuesToLocalStorage("currentUser", updatedUser);
    }
  };

  const updateCartData = async (updatedCartData: CartItem[]) => {
    try {
      setCart(updatedCartData);
      await setStoredJSONValuesToLocalStorage("cart", updatedCartData);
    } catch (error) {
      console.error("Failed to update cart data:", error);
    }
  };

  const makeOrder = async (order: Order) => {
    const updatedOrders = [...orders, order];
    setOrders(updatedOrders);
    await setStoredJSONValuesToLocalStorage("orders", updatedOrders);
  };

  const cancelOrder = async (orderId: string) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders as any);
    await setStoredJSONValuesToLocalStorage("orders", updatedOrders);
  };

  const changeOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    await setStoredJSONValuesToLocalStorage("orders", updatedOrders);
  };

  const updateOrderList = async (orders: Order[]) => {
    setOrders(orders);
    await setStoredJSONValuesToLocalStorage("orders", orders);
  };

  const addToCheckout = (product: CartItem[]) => {
    const products = Array.isArray(product) ? product : [];
    setCheckoutItems(() => {
      setStoredJSONValuesToLocalStorage("checkoutItems", products);
      return products;
    });
  };

  useEffect(() => {
    if (!products?.length) {
      fetchProducts();
    }
    fetchCart();
    fetchCategories();
  }, [products?.length]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        products,
        categories,
        cartData: Array.isArray(cartData) ? cartData : [],
        orders: Array.isArray(orders) ? orders : [],
        updateProducts,
        addToCart,
        removeFromCart,
        clearCart,
        addProduct,
        removeProduct,
        editProduct,
        updateCartData,
        makeOrder,
        cancelOrder,
        changeOrderStatus,
        updateOrderList,
        logout,
        currentUser,
        isLoadingProduct,
        addToCheckout,
        checkoutItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppData must be used within an AppContextProvider");
  }

  return context;
};

export default AppContextProvider;
