import PropTypes from "prop-types";

import useTranslation from "assets/hooks/useTranslation";

import Modal from "components/Modal/Modal";
import Button, { STYLE_TYPE } from "components/Button";

import s from "./ModalConfrim.module.scss";

const ModalConfrim = ({ text, confirm, cancel }) => {
  const { t } = useTranslation("modalConfirm");

  return (
    <Modal modalClassName={s.modal} closeModal={cancel}>
      <span className={s.text}>{text}</span>
      <div className={s.btnWrapper}>
        <Button
          className={s.button}
          styleType={STYLE_TYPE.SECONDARY}
          onClick={cancel}
          text={t.cancel}
        />
        <Button className={s.button} onClick={confirm} text={t.confirm} />
      </div>
    </Modal>
  );
};
ModalConfrim.propTypes = {
  text: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default ModalConfrim;
