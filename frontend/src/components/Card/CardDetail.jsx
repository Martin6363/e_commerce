/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";
import { FaCartShopping } from "react-icons/fa6";
import "../../assets/styles/Card.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart";
import AlertSuccess from "../AlertSuccess/AlertSuccess";
import myAxios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { useCurrency } from "../../context/CurrencyContext";
import { useTranslation } from "react-i18next";
import { RiDiscountPercentFill } from "react-icons/ri";

export function CardDetail({
  product,
  loadingCard,
  isFavorite: initialFavorite,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const imageUrl = product?.images?.[0]?.url ?? "/src/assets/images/no-image.jpg";
  const [addedFavorite, setAddedFavorite] = useState(false);
  const [addedFavoriteMessage, setAddedFavoriteMessage] = useState("");
  const carts = useSelector((store) => store.cart.items);
  const productAlreadyExists = carts.some(
    (cart) => cart.productId === product.id
  );
  const { selectedCurrency } = useCurrency();
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const [t] = useTranslation("global");

  function handleTitleLimit(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }

  function handleFavoriteActive() {
    if (!user) {
      navigate("/login");
      return;
    }

    myAxios
      .post("/favorites/toggle", { product_id: product?.id })
      .then((res) => {
        setAddedFavoriteMessage(res.data.message);
        setAddedFavorite(true);
      });
    setIsFavorite(!isFavorite);
  }

  function handleToTop() {
    window.scroll({
      top: 0,
    });
  }

  function handleAddToCart() {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
      })
    );
    setShowAlert(true);
  }
  return (
    <article className={`card_wrapper`}>
      {loadingCard ? (
        <SkeletonTheme baseColor="#bdbdbd" highlightColor="#999">
          <Skeleton count={1} style={{ height: "83%" }} />
          <p style={{ marginTop: "5px" }}>
            <Skeleton count={3} />
          </p>
        </SkeletonTheme>
      ) : (
        <>
          <button onClick={handleFavoriteActive} className="card_favorite_btn">
            {isFavorite ? <MdFavorite color="red" /> : <MdFavoriteBorder />}
          </button>
          <Link
            to={`/product/${product.slug}/${product.id}`}
            onClick={handleToTop}
            style={{ textDecoration: "none", color: "#333" }}
            className="card_link"
          >
            <div className="card_img_box">
              <div className="card_image relative md:shrink-0">
                <img src={imageUrl} alt={product.name} loading="eager|lazy"/>
                <span className="view-card-btn">View</span>
                {product.sale && (
                  <span className="absolute z-100 bottom-2 left-2 text-white font-semibold bg-[#f44] rounded-md px-[2px] text-[12px]">
                    -{product.sale}%
                  </span>
                )}
              </div>
            </div>
          </Link>
          <div className="card_data">
            <h5 className="name_product">
              {product ? handleTitleLimit(product.name, 45) : ""}
            </h5>
            <strong className={`flex items-center gap-[2px] ${product.discounted_price && "text-[#f44]"}`}>
              {product.discounted_price ? (
                <>
                  <span className="flex  items-center gap-1">
                    <RiDiscountPercentFill size={12} />{" "}
                    {product.discounted_price}
                  </span>
                </>
              ) : (
                Math.floor(product.price)
              )}

              <span>
                {selectedCurrency === "AMD"
                  ? "դր․"
                  : selectedCurrency === "RUB"
                  ? "₽"
                  : selectedCurrency === "USD"
                  ? "$"
                  : ""}
              </span>
              {product.discounted_price && (
                <del
                  className="text-[12px]"
                  style={{ fontWeight: 500, color: "#868695" }}
                >
                  {product.price}
                </del>
              )}
            </strong>
            <div className="card_star_rating">
              <span className="flex items-center gap-1 mb-2 text-gray-400">
                <TiStarFullOutline color="#FFD700" />
                <small>●</small>
                <small>({product.rating})</small>
              </span>
              {productAlreadyExists ? (
                <Link className="to_basket_link" to={"/basket"}>
                  {t("card.inTheBasket")}
                </Link>
              ) : (
                <Button
                  disabled={productAlreadyExists}
                  onClick={handleAddToCart}
                  sx={{
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center",
                    gap: "5px",
                    backgroundColor: "rgb(219, 2, 234)",
                    width: "100%",
                    color: "#fff",
                    padding: "5px 24px 7px",
                    fontWeight: 600,
                    borderRadius: "12px",
                    fontSize: { xs: "0.60rem", sm: "0.70rem", md: "0.80rem" }, 
                    whiteSpace: "nowrap",
                    overflow: "hidden", 
                    textOverflow: "ellipsis",
                  }}
                  className="card_buy_btn"
                >
                  <FaCartShopping />
                  <span>{t("card.basketButton")}</span>
                </Button>
              )}
            </div>
          </div>
          <AlertSuccess
            CartAdded={showAlert}
            textAlert="The product has been added to the cart"
            onAlertClose={() => setShowAlert(false)}
          />
          <AlertSuccess
            CartAdded={addedFavorite}
            textAlert={addedFavoriteMessage}
            onAlertClose={() => setAddedFavorite(false)}
          />
        </>
      )}
    </article>
  );
}

export default CardDetail;
