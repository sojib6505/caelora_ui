import Banner from "../../components/banner/Banner";
import DiscountBanner from "../../components/discountBanner/DiscountBanner";
import NewArrivals from "../../components/newArrivals/NewArrivals";
export default function Home() {
  return (
    <div>
        <Banner/>
        <NewArrivals/>
        <DiscountBanner/>
    </div>
  )
}
