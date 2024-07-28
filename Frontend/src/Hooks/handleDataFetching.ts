import categoryServices from "@/Services/CategoryServices";
import productServices from "@/Services/ProductServices";
import WishListServices from "@/Services/WishlistServices";
import {
  authStore,
  categoryStore,
  filteredStore,
  productStore,
  wishlistProductStore,
} from "@/Stores";
import { useEffect } from "react";
import { toast } from "react-toastify";

const handleDataFetching = () => {
  const { filterParams } = filteredStore();

  const { loadingProducts, setProducts, setLoadingProducts, setTotalProducts } = productStore();

  const { setCategories, loadingCategories, setLoadingCategories } = categoryStore();

  const {
    setWishlistProducts,
    loadingWishlistProducts,
    setLoadingWishlistProducts,
    clearWishlist,
  } = wishlistProductStore();

  const { user } = authStore();

  useEffect(() => {
    if (!loadingProducts) {
      setLoadingProducts(true);
      productServices
        .allProducts(filterParams)
        .then(({ data }) => {
          setProducts(data.products);
          setTotalProducts(data.total);
        })
        .catch((error) => {
          console.error("❌ filterProducts ~ error:", error.message);
          toast.error("Error while getting products Data!");
        })
        .finally(() => setLoadingProducts(false));
    }
  }, [filterParams]);

  useEffect(() => {
    if (!loadingCategories) {
      setLoadingCategories(true);
      categoryServices
        .allCategories()
        .then(({ data }) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error("❌ fetchCategories ~ error:", error.message);
          toast.error("Error while getting categories Data!");
        })
        .finally(() => {
          setLoadingCategories(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!user) {
      clearWishlist();
      return;
    }

    if (!loadingWishlistProducts) {
      setLoadingWishlistProducts(true);
      WishListServices.allProducts()
        .then(({ data }) => {
          setWishlistProducts(data);
        })
        .catch((error) => {
          console.error("❌ fetchWishlist ~ error:", error.message);
          toast.error("Error while getting wishlist Data!");
        })
        .finally(() => {
          setLoadingWishlistProducts(false);
        });
    }
  }, [user]);
};

export default handleDataFetching;
