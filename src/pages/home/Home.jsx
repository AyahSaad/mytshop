import ProductGrid from "../../components/products/ProductGrid";
import Products from "../../components/products/Products";
import Category from "./../../components/category/Category";

function Home() {
  return (
    <>
      <Category />
      {/* <Products /> */}
      <ProductGrid />
    </>
  );
}

export default Home;
