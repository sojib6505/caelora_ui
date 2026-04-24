import Banner from "../../components/banner/Banner";
import DiscountBanner from "../../components/discountBanner/DiscountBanner";
import Features from "../../components/features/Features";
import NewArrivals from "../../components/newArrivals/NewArrivals";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
export default function Home() {
  return (
    <div>
        <ScrollToTop/>
        <Banner/>
        <NewArrivals/>
        <DiscountBanner/>
        <Features/>
    </div>
  )
}
