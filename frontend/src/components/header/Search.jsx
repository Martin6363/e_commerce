/* eslint-disable react-hooks/exhaustive-deps */
import SearchIcon from "@mui/icons-material/Search";
import "../../assets/styles/SearchInput.scss";
import { useTheme } from "@emotion/react";
import { useState, useCallback, useEffect, useRef } from "react";
import axios from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { PiClockCounterClockwiseFill } from "react-icons/pi";
import { IconButton, useMediaQuery } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

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
  const [selectedItem, setSelectedItem] = useState(-1);
  const [history, setHistory] = useState([]);
  const matches = useMediaQuery("(max-width:1020px)");

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("historySearch")) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    if (search === "") {
      setsHowCloseInputBtn(false);
    } else {
      setsHowCloseInputBtn(true);
    }
  }, [search])

  useEffect(() => {
    if (matches && openAutoComp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "initial";
    }
  }, [matches, openAutoComp])

  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      axios.get(`/products?autocomplete=${searchValue}`).then((res) => {
        setAutoCompleteData(res.data.data);
      });
    }, 200),
    []
  );

  function handleSearchValue(e) {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
    setSelectedItem(-1);
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
    handleSearch({ search: value });
  }

  function handleEmptyValue () {
    setValue("search", ''); 
    setSelectedItem(-1);
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
        const response = await axios.get(`/product?search=${inputValue}`);
        const product = response.data;
        if (product) {
          navigate(`/product/${product.vendor_code}`);
        }
      } catch (error) {
        console.error(`Error fetching product with vendor code ${inputValue}: `, error);
      }
    } else {
      navigate(`/search?search_query=${inputValue}`);
    }
    handleHideAutoComplete();
    document.activeElement.blur();
    handleSearchHistory(data.search);
  }

  function handleKeyDown (e) {
    if (e.key === "ArrowUp" && selectedItem > 0) {
      setSelectedItem(prev => prev - 1);
    } else if(e.key === "ArrowDown" && selectedItem < autoCompleteData.length - 1) {
      setSelectedItem(prev => prev + 1);
    } else if (e.key === "Enter" && selectedItem >= 0) {
      e.preventDefault();
      const selectedValue = autoCompleteData[selectedItem].name;
      setValue("search", selectedValue);
      handleClickAutocompleteValue(selectedValue);
    }

    if (selectedItem >= autoCompleteData.length - 1) {
      setSelectedItem(0);
    } 
  }

  function handleSearchHistory (searchValue) {
    let historySearch = JSON.parse(localStorage.getItem("historySearch")) || [];
    historySearch.unshift(searchValue);
    historySearch = [...new Set(historySearch)];

    if (historySearch.length > 5) {
      historySearch.pop();
    }
    setHistory(historySearch);
    localStorage.setItem("historySearch", JSON.stringify(historySearch));
  }

  function handleDeleteHistoryItem (item) {
    const updatedHistory = history.filter((historyItem) => historyItem !== item);
    setHistory(updatedHistory);
    localStorage.setItem("historySearch", JSON.stringify(updatedHistory));
  }

  function handleClearHistory () {
    localStorage.removeItem("historySearch")
    setHistory('')
  }
  return (
    <>
      <div className="search_Container">
        <form onSubmit={handleSubmit(handleSearch)} ref={ref} className={`${ matches && openAutoComp ? 'search_input_mobile' : 'search_input'}`}>
          {matches && openAutoComp && (
            <IconButton onClick={handleHideAutoComplete} title="to back">
              <FaArrowLeft />
            </IconButton>
          )
          }
          <input
            type="search"
            className={`appearance-none ${ matches && openAutoComp ? 'bg-gray-800' : '' }`}
            onFocus={handleOpenAutoComplete}
            {...register("search", {required: true,
              onChange: (e) => {handleSearchValue(e)},
              onBlur: () => {handleHideAutoComplete()}
            })}
            onKeyDown={handleKeyDown}
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
            <div className={`${ matches ? 'autocom_box_mobile' : 'autocom_box' } ${theme.palette.mode === "dark" ? "bg-gray-800" : "bg-slate-100"}`}>
              {search === "" && history.length > 0 ? (
                <>
                <h3 className={`mx-3 mt-4 mb-2 ${ theme.palette.mode === 'dark' ?  'text-gray-100' : 'text-gray-600'}`}>You Searched</h3>
                <button className={`text-sm my-1 ml-5 cursor-pointer ${ theme.palette.mode === 'dark' ?  'text-gray-200' : 'text-gray-600'} `} onClick={handleClearHistory}>Clear history</button>
                {history.map((historyItem, index) => (
                  <li key={index} className={`hover:bg-gray-400 hover:bg-opacity-15 ${selectedItem === index ? 'bg-gray-400 bg-opacity-15' : 'bg-transparent'}`}>
                    <span className="text-gray-500 mx-3 my-2"><PiClockCounterClockwiseFill /></span>
                    <button
                      style={linkStyle}
                      className="text-start"
                      onClick={() => handleClickAutocompleteValue(historyItem)}
                    >
                      {historyItem}
                    </button>
                    <button type="button" className="float-right" onClick={() => handleDeleteHistoryItem(historyItem)}>
                      <IoClose />
                    </button>
                  </li>
                ))}
                </>
              ) : (
                autoCompleteData.length > 0 &&
                autoCompleteData.map((product, index) => (
                  <li key={product.id} className={`hover:bg-gray-400 hover:bg-opacity-15 ${selectedItem === index ? 'bg-gray-400 bg-opacity-15' : 'bg-transparent'}`}>
                    <span className="text-gray-500"><SearchIcon /></span>
                    <Link
                      style={linkStyle}
                      to={`/product/${product.slug}/${product.id}`}
                      onClick={() => handleClickAutocompleteValue(product.name)}
                    >
                      {getHighlightedText(product.name, search)}
                    </Link>
                  </li>
                ))
              )}
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
