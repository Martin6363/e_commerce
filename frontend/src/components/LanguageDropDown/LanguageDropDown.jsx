import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import { LuChevronDown } from "react-icons/lu";
import armenianFlag from "../../assets/images/armenian_flag.svg" ;
import { useTheme } from '@emotion/react';

export default function LanguageDropDown() {
    const [t, i18n] = useTranslation("global");
    const theme = useTheme();
    const mode = theme.palette.mode;
    
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('lang', lang);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm  hover:bg-[rgba(255,255,255,.2)]">
                    {t("header.language")}
                    <LuChevronDown aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-50" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className={`absolute right-0 z-[1150] mt-2 w-20 origin-top-right divide-y rounded-md ${ mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100' } shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}
            >
                <div className="py-1">
                    <MenuItem>
                        <button onClick={() => handleChangeLanguage("en")} className={`block w-full px-4 py-2 text-sm text-start ${ mode === 'dark' ? 'text-gray-100' : 'text-gray-800' } data-[focus]:bg-gray-100 data-[focus]:text-gray-900`}>
                            Eng
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={() => handleChangeLanguage("hy")} className={`block w-full px-4 py-2 text-sm text-start ${ mode === 'dark' ? 'text-gray-100' : 'text-gray-800' } data-[focus]:bg-gray-100 data-[focus]:text-gray-900`}>
                            <span className="w-[20px] h-[20px]" style={{backgroundImage: armenianFlag  }}></span> Հայ
                        </button>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={() => handleChangeLanguage("ru")} className={`block w-full px-4 py-2 text-sm text-start ${ mode === 'dark' ? 'text-gray-100' : 'text-gray-800' } data-[focus]:bg-gray-100 data-[focus]:text-gray-900`}>
                            Рус
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
