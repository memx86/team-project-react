import useTranslation from "assets/hooks/useTranslation";

import AuthForm, { authType } from "components/AuthForm/AuthForm";
import LanguageSwitcher from "components/LanguageSwitcher";

import s from "./LoginPage.module.scss";

const LoginPage = () => {
  const { t, language } = useTranslation("loginPage");
  return (
    <>
      <section className={s.section}>
        <LanguageSwitcher />
        <div className={s.container}>
          <div className={s.wrapper}>
            <div className={s.hero}>
              <h1 className={language === "en" ? s.title : s.titleLocale}>
                {t.financeApp}
              </h1>
            </div>
          </div>
          <div className={s.form}>
            <AuthForm type={authType.login} />
          </div>
        </div>
      </section>
    </>
  );
};
export default LoginPage;
