import AdCards from "../../components/Ads/AdCards";
import Products from "../../components/products/Products";
import Category from "./../../components/category/Category";

function Home() {
  return (
    <>
      <Category />
      <Products />
      <AdCards />
    </>
  );
}

export default Home;
