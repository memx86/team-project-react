import { useDispatch } from 'react-redux';
import { openModalAddTransaction } from 'redux/session/session-slice';
import addIcon from './../../images/+.svg';
import s from './ButtonAddTransactions.module.scss'


function ButtonAddTransaction() {

  const dispatch = useDispatch();

  return (
    <button
      className={s.btn}
      
      onClick={() => dispatch(openModalAddTransaction())}

      
    >
      <img
        src={addIcon}
        alt="Click here to add a transaction"
        className={s.btnIcon}
      />
    </button>
  );
}


export default ButtonAddTransaction;
