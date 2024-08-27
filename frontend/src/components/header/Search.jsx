import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/SearchInput.scss";
import { useTheme } from "@emotion/react";
import { useState, useCallback, useEffect, useRef, useTransition } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Search = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [openAutoComp, setOpenAutoComp] = useState(false);
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [showCloseInputBtn, setsHowCloseInputBtn] = useState(false);
  const { register, handleSubmit, setValue } = useForm();
  const ref = useRef();
  const navigate = useNavigate();
  const [t] = useTranslation("global");

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      axios.get(`/products?autocomplete=${searchValue}`).then((res) => {
        setAutoCompleteData(res.data.data);
      });
    }, 200),
    []
  );

  useEffect(() => {
    if (search === "") {
      setsHowCloseInputBtn(false);
    } else {
      setsHowCloseInputBtn(true);
    }
  }, [search])

  function handleSearchValue(e) {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  }

  function handleOpenAutoComplete() {
    setOpenAutoComp(true);
  }

  function handleHideAutoComplete() {
    setTimeout(() => {
      setOpenAutoComp(false);
    }, 300);
  }

  function handleClickAutocompleteValue(value) {
    setValue("search", value); 
    setOpenAutoComp(false);
  }

  function handleEmptyValue () {
    setValue("search", ''); 
  }

  function getHighlightedText(text, highlight) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark 
              className="highlight" 
              style={{ color: theme.palette.mode === 'dark' ? '#fff' : '#000' }} 
              key={index}
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  }

  async function handleSearch(data) {
    const inputValue = data.search.trim();
    const isVendorCode = /^\d+$/.test(inputValue);
    if (isVendorCode) {
      try {
        const response = await axios.get(`/product/${inputValue}`);
        const product = response.data;
        if (product) {
          navigate(`/product/${product.slug}/${product.id}`);
        } else {
          console.error(`Product with vendor code ${inputValue} not found.`);
        }
      } catch (error) {
        console.error(`Error fetching product with vendor code ${inputValue}: `, error);
      }
    } else {
      navigate(`/search?search_query=${inputValue}`);
    }
    handleHideAutoComplete();
  }

  return (
    <>
      <div className="search_Container">
        <form onSubmit={handleSubmit(handleSearch)} ref={ref} className="search_input">
          <input
            type="text"
            onFocus={handleOpenAutoComplete}
            {...register("search", {required: true,
              onChange: (e) => {handleSearchValue(e)},
              onBlur: () => {handleHideAutoComplete()}
            })}
            autoComplete="off"
            placeholder={t('search.placeholder')}
          />
          <div className="icon flex items-center">
            <span onClick={handleEmptyValue} className={`${showCloseInputBtn ? 'visible' : 'invisible'} `}><IoClose/></span>
            <button type="submit"><SearchIcon /></button>
          </div>
        </form>
        {openAutoComp && (
          <>
            <div
              className={`autocom_box ${
                theme.palette.mode === "dark" ? "bg-gray-800" : "bg-slate-100"
              }`}
            >
              {autoCompleteData?.map((product) => (
               <li key={product.id} className="hover:bg-gray-400">
                <span className="text-gray-500"><SearchIcon /></span>
                <Link
                  style={linkStyle}
                  to={`/product/${product.slug}/${product.id}`}
                  onClick={() => handleClickAutocompleteValue(product.name)}
                >
                  {getHighlightedText(product.name, search)}
                </Link>
              </li>
              ))}
            </div>
            <div className="autocom_cont"></div>
          </>
        )}
      </div>
    </>
  );
};

const linkStyle = {
  textDecoration: "none",
  fontWeight: 'bold',
  width: '100%',
  lineHeight: '40px',
  color: "inherit", 
};

export default Search;
