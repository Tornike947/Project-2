import WishlistItem from "./WishlistItem";
import { Link } from "react-router-dom";
import { Button } from "@/Components/UI";
import { SectionWrapper } from "@/Components";
import { wishlistProductStore } from "@/Stores";
import { handleCartItems, handlerWishlist } from "@/Hooks";

const WishListPage = () => {
  const { wishlistProducts, loadingWishlistProducts } = wishlistProductStore();
  const { handleWishlistActions } = handlerWishlist();
  const { handleAddCartProduct } = handleCartItems();
  return (
    <SectionWrapper className="pb-10">
      <h2 className="text-center my-10 font-bold text-primary text-xl">
        Products You Would Like to Purchase
      </h2>
      {loadingWishlistProducts ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {wishlistProducts.length ? (
            wishlistProducts.map((product) => (
              <WishlistItem
                cartAction={() => handleAddCartProduct({ productId: product.product_id })}
                wishlistAction={() => handleWishlistActions(product.product_id)}
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <div className="flex w-full gap-5 flex-col justify-center items-center">
              <h3 className="text-center text-gray-400 text-lg">No products in your wishlist</h3>
              <Link to={"/courses"}>
                <Button btnType="secondary">Continue Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </SectionWrapper>
  );
};

export default WishListPage;
