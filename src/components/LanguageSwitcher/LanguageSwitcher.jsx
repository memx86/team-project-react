import { useEffect } from "react";
import getUserLocale from "get-user-locale";

import useTranslation from "assets/hooks/useTranslation";

import LANGUAGES from "assets/constants/LANGUAGES";
import english from "assets/images/english.png";
import ukraine from "assets/images/ukrainian.png";

import IconButton from "components/IconButton";
import { useDispatch } from "react-redux";
import { setLocale } from "redux/locale";

import s from "./LanguageSwitcher.module.scss";

export default function LanguageSwitchers() {
  const userLocale = getUserLocale();
  const { t, language } = useTranslation("switcher");
  const dispatch = useDispatch();

  const changeLanguage = (lang) => {
    dispatch(setLocale(lang));
  };

  useEffect(() => {
    if (language) return;
    changeLanguage(userLocale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.wrapBtn}>
      <IconButton
        onClick={() => changeLanguage(LANGUAGES.EN)}
        className={s.btn}
        label={t.en}
      >
        <img src={english} alt="English" />
      </IconButton>
      <IconButton
        onClick={() => changeLanguage(LANGUAGES.UA)}
        className={s.btn}
        label={t.ua}
      >
        <img src={ukraine} alt="Ukrainian" />
      </IconButton>
    </div>
  );
}
