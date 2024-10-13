import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { GoPersonFill } from "react-icons/go";
import { useTheme } from "@emotion/react";
import { Button, useMediaQuery } from "@mui/material";
import myAxios from "../../api/axios";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { FaAngleDown } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(TextPlugin);


const productCache = {};


export default function Basket() {
    const carts = useSelector(store => store.cart.items); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);
    const theme = useTheme();
    const matches = useMediaQuery('(max-width:1020px)');
    const [showMoreCard, setShowMoreCard] = useState(5);
    const [productDetails, setProductDetails] = useState({});
    const [displayedTotal, setDisplayedTotal] = useState("$0.00");
    const priceRef = useRef(null);
    const [t] = useTranslation("global");

    useEffect(() => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");
      if (token) {
        setIsLoggedIn(true);
      }
      if (user) {
        setAuthUser(JSON.parse(user));
      }
    }, []);
  
    useEffect(() => {  
      fetchProductDetails();
    }, [carts]);

    useEffect(() => {
      if (priceRef.current) {
          gsap.to(priceRef.current, {
            textContent: displayedTotal, 
              duration: 0.3,
              snap: { textContent: 1 },
              ease: "power1.inOut",
          });
      }
  }, [displayedTotal]);

    async function fetchProductDetails() {
      let total = 0;

      const CardPromises = carts.map(async (item) => {
        if (productCache[item.productId]) {
          return productCache[item.productId];
        } else {
          const res = await myAxios.get(`/products/${item.productId}`);
          const productData = res.data.data;
          productCache[item.productId] = productData;
          return productData;
        }
      });

      const details = await Promise.all(CardPromises);
      const productDetailsMap = {};

      details.forEach((detail, index) => {
        productDetailsMap[carts[index].productId] = detail;
        total += detail.price * carts[index].quantity;
      });

      setProductDetails(productDetailsMap);
      setDisplayedTotal(total);
    }

    function handleCheckout() {
      if (!isLoggedIn) {
        navigate('/login');
      } else {
        console.log("Checkout");
      }
    }

    function handleShowMoreCard () {
        setShowMoreCard((prevValue) => prevValue + 5);
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>    
            {carts.length < 1 ? (
                <div className="w-full  flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 142px)' }}>
                    <div className="flex flex-col justify-center items-center w-[55%]">
                        <h2>{t("basket.empty_cart")}</h2>
                        <p className="text-gray-500">{t("basket.empty_cart_message")}</p>
                        <Link to={'/'} className="bg-purple-500 hover:bg-purple-700 mt-5 text-white font-bold py-2 px-4 rounded-full">{t("basket.go_to_main_page")}</Link>
                    </div>
                </div>
            ) : (
                <section className="relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0">
                    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8  w-full max-xl:max-w-3xl max-xl:mx-auto">
                                <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                    <h2 className="font-manrope font-bold text-3xl leading-10">
                                        {t("basket.title")}
                                    </h2>
                                    <h2 className="font-manrope font-bold text-xl leading-8 text-gray-500">
                                        {carts.length} {t("basket.items")}
                                    </h2>
                                </div>
                                <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                    <div className="col-span-12 md:col-span-7">
                                        <p className="font-normal text-lg leading-8 text-gray-400">
                                            {t("basket.product_details")}
                                        </p>
                                    </div>
                                    <div className="col-span-12 md:col-span-5">
                                        <div className="grid grid-cols-5">
                                            <div className="col-span-3">
                                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    {t("basket.quantity")}
                                                </p>
                                            </div>
                                            <div className="col-span-2">
                                                <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                                                    {t("basket.total")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {carts.slice(0, showMoreCard).reverse().map((item, index) => (
                                    <CartItem
                                        key={index}
                                        productId={item.productId}
                                        quantity={item.quantity}
                                        detail={productDetails[item.productId]}
                                    />
                                ))}
                                {carts.length > 5 && (
                                    <Button onClick={handleShowMoreCard} sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px' }}>Show More <FaAngleDown/></Button>
                                )}
                                <div className="flex items-center justify-center mt-8">
                                    <div className="basket_pay_details_box w-full">
                                        <div className={`basket_section grow ${ theme.palette.mode === "dark" ? 'bg-gray-600' : 'bg-gray-50' }`}>
                                            <h2 className="title_btn">{t("basket.payment_method")}</h2>
                                            <span className="flex gap-2 items-center">{t("basket.select_payment_method")}</span>
                                        </div>
                                        <div className={`basket_section ${ theme.palette.mode === "dark" ? 'bg-gray-600' : 'bg-gray-50' }`}>
                                            <div>
                                                <Link className="title_btn" to={`${ authUser !== null ? '/profile' : '/login' }`}>{t("basket.my_details")} <FaPen /></Link>
                                                {authUser !== null? (
                                                    <span className="flex gap-2 items-center"><GoPersonFill /> {authUser?.email}</span>
                                                ) : (
                                                    <span className="flex gap-2 items-center"><GoPersonFill /> {t("basket.login_or_create_account")}</span>
                                                )}
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 xl:col-span-4 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                                <h2 className="font-manrope font-bold text-[25px] leading-10 pb-8 border-b">
                                    {t("basket.order_summary")}
                                </h2>
                                <div className="mt-8">
                                    <div className="flex items-center justify-between pb-6">
                                        <p className="font-normal text-lg leading-8">
                                            {carts.length}  {t("basket.items")}
                                        </p>
                                        <h6 ref={priceRef} className="font-medium text-lg leading-8">
                                          {displayedTotal}
                                        </h6>
                                    </div>
                                    <button onClick={handleCheckout} className="w-full text-center bg-purple-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-purple-700">
                                        {t("basket.checkout")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
