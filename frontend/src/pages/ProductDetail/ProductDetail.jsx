import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ImageMagnifier from "../../components/ImageMagnifier/ImageMagnifier";
import "../../assets/styles/ProductDetail.scss";
import { Rating, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart";
import SliderMobileSwiper from "../../components/HomeDetails/SliderSwiper/SliderMobileSwiper";
import CardDetail from "../../components/Card/CardDetail";
import { FaArrowRight } from "react-icons/fa";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import AlertSuccess from "../../components/AlertSuccess/AlertSuccess";
import "ldrs/ring";
import { useTheme } from "@emotion/react";
import myAxios from "../../api/axios";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useCurrency } from "../../context/CurrencyContext";
import { useAuth } from "../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { RiDiscountPercentFill } from "react-icons/ri";
import SizeCheckbox from "../../components/CheckboxeCollections/SizeCheckbox";
import ColorCheckbox from "../../components/CheckboxeCollections/ColorCheckbox";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail() {
  const { id } = useParams();
  const carts = useSelector((store) => store.cart.items);
  const matches = useMediaQuery("(max-width:1020px)");
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [addedFavorite, setAddedFavorite] = useState(false);
  const [addedFavoriteMessage, setAddedFavoriteMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { selectedCurrency } = useCurrency();
  const { user } = useAuth();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const cardSize = searchParams.get("cardsize") || "small";
  const cardSizeClass = cardSize === "big" ? "xl:grid-cols-4 sm:grid-cols-1" : "xl:grid-cols-6 sm:grid-cols-2";
  const [t] = useTranslation("global");
  const navigate = useNavigate();

  const { data: productData, isLoading } = useQuery({
    queryKey: ['productDetail', id, selectedCurrency],
    queryFn: async () => {
      const productResponse = await myAxios.get(`/products/${id}?currency=${selectedCurrency}`);
      const attributesResponse = await myAxios.get('/attributes');
      return {
        product: productResponse.data.data,
        recommended: productResponse.data.recommended,
        attributes: attributesResponse.data.data,
      };
    },
    cacheTime: 300000, // Cache data for 5 minutes
  });
  
  const product = productData?.product;
  useDocumentTitle(product?.name);
  const copyVendorCode = product?.vendor_code;
  const seeAlsoProducts = productData?.recommended;
  // const attributes = productData?.attributes;

  const productAlreadyExists = carts.some(
    (cart) => cart.productId === product?.id
  );

  function handleFavoriteActive() {
    if (user) {
      myAxios
        .post("/favorites/toggle", { product_id: product?.id })
        .then((res) => {
          setAddedFavoriteMessage(res.data.message);
          setAddedFavorite(true);
        });
      setIsFavorite(!isFavorite);
    } else {
      navigate('/login');
    }
  }

  if (isLoading) {
    return <SpinnerLoader/>;
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );
  }

  function handleCopyVendorCode() {
    navigator.clipboard.writeText(copyVendorCode);
    setShowAlert(true);
  }

  return (
    <>
      {!isLoading ? (
        <>
          <div className="max-w-screen-xl flex flex-row flex-wrap gap-2 mx-auto items-center">
            <Breadcrumbs category={product?.category} brand={product?.brand} />
            <div
              className={`w-full flex ${
                matches && "flex-col"
              }  gap-2 justify-between`}
            >
              <section className="product_magnifier_img_container">
                {!matches ? (
                  <ImageMagnifier
                    src={product?.images}
                    width={500}
                    height={550}
                    magnifierHeight={3000}
                    magnifieWidth={3000}
                    sliderMagnifier={true}
                  />
                ) : (
                  <SliderMobileSwiper imgUrl={product?.images} />
                )}
              </section>
              <section
                className="product_detail_container"
                style={{ minWidth: matches && "100%" }}
              >
                <article className="flex p-3 flex-col gap-2">
                  <div
                    className="flex flex-col pb-3"
                    style={{ borderBottom: "1px solid #9a9a9a" }}
                  >
                    <button
                      onClick={handleFavoriteActive}
                      className="text-[25px] mb-3 absolute right-[10%]"
                    >
                      {isFavorite ? (
                        <MdFavorite color="red" />
                      ) : (
                        <MdFavoriteBorder />
                      )}
                    </button>
                    <span className="flex items-end gap-2">
                      <Rating
                        name="read-only"
                        value={parseInt(product?.rating)}
                        readOnly
                      />{" "}
                      <small>({product?.rating})</small>
                    </span>
                    <h2>{product.name}</h2>
                  </div>
                  <label className="flex items-end gap-2 mt-3">
                    <strong
                      className={`flex items-center text-[30px] ${
                        product.discounted_price && "text-red-500"
                      }`}
                    >
                      {product.discounted_price ? (
                        <>
                          <span className="flex items-center gap-1">
                            <RiDiscountPercentFill size={30} />{" "}
                            {product.discounted_price}
                          </span>
                        </>
                      ) : (
                        Math.floor(product.price)
                      )}{" "}
                      {selectedCurrency === "AMD"
                        ? "դր․"
                        : selectedCurrency === "RUB"
                        ? "₽"
                        : selectedCurrency === "USD"
                        ? "$"
                        : ""}
                    </strong>
                    {product.discounted_price && (
                      <del
                        className="text-[16px]"
                        style={{ fontWeight: 500, color: "#868695" }}
                      >
                        {product.price}
                      </del>
                    )}
                  </label>
                  <ul className="flex flex-col gap-3 mt-3">
                    <li className="product_params">
                      <b>{t("product_show.vendor_code")}</b>{" "}
                      <span
                        className={`vendor_code_text p-1 ${
                          theme.palette.mode === "dark"
                            ? "bg-gray-900"
                            : "bg-gray-100"
                        } `}
                        onClick={handleCopyVendorCode}
                      >
                        {product?.vendor_code}
                      </span>{" "}
                    </li>
                    <li className="product_params">
                      <b>{t("product_show.brand")}</b>{" "}
                      <span>{product?.brand}</span>{" "}
                    </li>
                    {product.attributes && 
                      product.attributes.map((attribute, index) => (
                        <li className="product_params font-sans" key={index}>
                          <b>{attribute.name}</b>{" "}
                          <span className="flex items-center gap-1">
                            {attribute.values.map((attr) => (
                              <span className={`capitalize ${ attribute.name === "Color" ? 'text-white' : '' } py-[3px] px-3 text-sm rounded-xl`} key={attr.id} style={{ backgroundColor: attr.name ? attr.name : 'rgba(255,255,255,.8)' }}>
                                {attr.name}
                              </span>
                            ))}
                          </span>
                        </li>
                      ))
                    }
                    <li className="mt-8">
                      <h3 className="text-xl font-bold">
                        {t("product_show.sizes")}
                        {product.attr}
                      </h3>
                      <SizeCheckbox/>
                    </li>
                    <li className="mt-2">
                      <h3 className="text-xl font-bold">
                        {t("product_show.colors")}
                      </h3>
                      <ColorCheckbox/>
                    </li>
                    <div className="mt-10 flex flex-wrap gap-4 w-100">
                      {productAlreadyExists ? (
                        <Link
                          className={`${
                            carts.productId === product.id ? "opacity-5" : ""
                          } ${
                            matches && "w-full"
                          } flex items-center justify-between gap-5 px-8 py-4 bg-[#f4e7ff] hover:bg-[#b780e2] hover:text-white transition-all delay-100 ease-in-out text-[#772eb0] border border-gray-800 text-base rounded-lg`}
                          to={"/basket"}
                        >
                          {t("product_show.inTheBasket")}{" "}
                          <span>
                            <FaArrowRight />
                          </span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className={`${
                            carts.productId === product.id ? "opacity-5" : ""
                          } ${
                            matches && "w-full"
                          } flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white border border-gray-800 text-base rounded-lg`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 cursor-pointer fill-current inline mr-3"
                            viewBox="0 0 512 512"
                          >
                            <path
                              d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                              data-original="#000000"
                            ></path>
                          </svg>
                          {t("product_show.add_to_cart")}
                        </button>
                      )}
                    </div>
                  </ul>
                </article>
              </section>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="ml-2" style={{ width: "70%" }}>
                <span style={{ color: "#9a9a9a" }}>
                  {t("product_show.description")}
                </span>
                <article className="mt-3 text-[13px]">
                  {product?.description}
                </article>
              </div>
            </div>
            <section className="flex flex-col gap-5">
              <h2 className="text-[24px] font-[700] leading-[32px] ml-2">
                {t("product_show.see_also")}
              </h2>
              <div className={`grid grid-cols-2 gap-x-[20px] ${cardSizeClass} lg:grid-cols-4 md:grid-cols-3 gap-y-[32px]`}>
                {seeAlsoProducts?.map((product) => (
                  <CardDetail
                    key={product.id}
                    product={product}
                    loadingCard={false}
                  />
                ))}
              </div>
            </section>
            <AlertSuccess
              CartAdded={showAlert}
              textAlert="Vendor Code Copied"
              onAlertClose={() => setShowAlert(false)}
            />
          </div>
          <AlertSuccess
            CartAdded={addedFavorite}
            textAlert={addedFavoriteMessage}
            onAlertClose={() => setAddedFavorite(false)}
          />
        </>
      ) : (
        <div className="homeSpinner">
          <l-ring
            size="70"
            stroke="6"
            bg-opacity="0"
            speed="1.3"
            color="#581C87"
          ></l-ring>
        </div>
      )}
    </>
  );
}
