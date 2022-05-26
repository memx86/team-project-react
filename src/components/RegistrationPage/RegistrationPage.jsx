import useTranslation from "assets/hooks/useTranslation";

import AuthForm, { authType } from "components/AuthForm/AuthForm";
import LanguageSwitcher from "components/LanguageSwitcher";

import s from "./RegistrationPage.module.scss";

const RegistrationPage = () => {
  const { t, language } = useTranslation("registrationPage");
  return (
    <section className={s.section}>
      <LanguageSwitcher />
      <div className={s.container}>
        <div className={s.wrapper}>
          <div className={s.hero}>
            <h1 className={language === "en" ? s.title : s.titleLocale}>
              {t.regPage}
            </h1>
          </div>
        </div>
        <div className={s.form}>
          <AuthForm type={authType.registration} />
        </div>
      </div>
    </section>
  );
};
export default RegistrationPage;
