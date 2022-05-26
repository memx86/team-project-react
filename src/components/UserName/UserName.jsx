import { useDispatch, useSelector } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

import { isAuthSelector, setModal } from "redux/session";
import { useRefreshQuery } from "redux/wallet";

import useTranslation from "assets/hooks/useTranslation";

import { MOBILE_ONLY, TABLET } from "assets/constants/MEDIA";

import Loader from "components/Loader";

import s from "./UserName.module.scss";

const UserName = () => {
  const isAuth = useSelector(isAuthSelector);
  const { data, isFetching } = useRefreshQuery(null, { skip: !isAuth });

  const dispatch = useDispatch();
  const isTablet = useMediaQuery(TABLET);
  const isMobile = useMediaQuery(MOBILE_ONLY);
  const { t } = useTranslation("userName");
  const { username } = data;

  const onClick = () => {
    dispatch(setModal({ isOpen: true, type: "logout" }));
  };

  if (isFetching) return <Loader />;
  return (
    <div className={s.wrapper}>
      <span className={s.name}>{username}</span>
      <button
        type="button"
        className={s.button}
        onClick={onClick}
        aria-label={isMobile ? t.logout : null}
      >
        <IoLogOutOutline style={{ width: "18px", height: "18px" }} />
        {isTablet && <span>{t.logout}</span>}
      </button>
    </div>
  );
};
export default UserName;
