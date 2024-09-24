/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useRef, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { changeQuantity, deleteCartItem } from "../../store/cart";
import { MdDelete } from "react-icons/md";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { Link } from 'react-router-dom';

gsap.registerPlugin(TextPlugin);

function CartItem({ productId, quantity, detail }) {
  const dispatch = useDispatch();
  const priceRef = useRef(null);

  useEffect(() => {
    if (detail) {
      gsap.to(priceRef.current, {
        textContent: `${parseInt(detail.price) * quantity}`,
        duration: 0.3,
        snap: { textContent: 1 },
        ease: "power1.inOut",
      });
    }
  }, [quantity, detail?.price]);

  function handleMinusQuantity() {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity - 1,
      })
    );
  }

  function handlePlusQuantity() {
    dispatch(
      changeQuantity({
        productId: productId,
        quantity: quantity + 1,
      })
    );
  }

  function handleDeleteCartItem() {
    dispatch(deleteCartItem(productId));
  }

  if (!detail) {
    return (
      <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
      <Box sx={{ width: 1000, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton
          sx={{ bgcolor: "grey.600" }}
          variant="rectangular"
          width={126}
          height={118}
        />
        <div className="w-full flex flex-col gap-2">
          <Skeleton sx={{ width: '55%' }} animation="wave" />
          <Skeleton sx={{ width: '55%' }} animation="wave" />
        </div>
      </Box>
    </div>
    );
  }

  return (
    <div className="relative flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
      <button
        className="absolute top-5 right-5 text-xl invisible group-hover:visible transition-all duration-300"
        onClick={handleDeleteCartItem}
      >
        <MdDelete />
      </button>
      <div className="w-full md:max-w-[126px]">
        <img
          src={detail?.images?.[0]?.url || "/src/assets/images/no-image.jpg"}
          alt="product image"
          className="mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
        <div className="md:col-span-2">
          <div className="flex flex-col max-[500px]:items-center gap-3">
            <h6 className="font-semibold text-base leading-7">
              <Link className='hover:text-blue-500 underline' to={`/product/${detail?.slug}/${detail?.id}`}>
                {detail.name}
              </Link>
            </h6>
            <h6 className="font-normal text-base leading-7 text-gray-500">
              {detail.category}
            </h6>
            <h6 ref={priceRef} className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
              ${parseInt(detail.price * quantity)}
            </h6>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
          <div className="flex items-center h-full">
            <button
              onClick={handleMinusQuantity}
              className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
            >
              <FaMinus fontSize={23} />
            </button>
            <input
              type="text"
              className="border-y border-gray-200 outline-none font-semibold text-lg w-full max-w-[73px] min-w-[60px] py-[15px] text-center bg-transparent"
              placeholder="1"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) =>
                dispatch(
                  changeQuantity({
                    productId: productId,
                    quantity: parseInt(e.target.value),
                  })
                )
              }
            />
            <button
              onClick={handlePlusQuantity}
              className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
            >
              <FaPlus fontSize={23} />
            </button>
          </div>
        </div>
        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
          <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
            ${detail.price}
          </p>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  detail: PropTypes.shape({
    price: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string
      })
    ),
  }),
}

export default CartItem;
