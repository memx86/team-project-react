import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react'
import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import closeBtnIcon from '../../images/close.svg';
import modalActions from '../../redux/global/global-action';
import PropTypes from 'prop-types';
import s from './ModalAddTransaction.module.scss';
import TransactionsCategoriesSelect from './TransactionCategorySelect/TransactionCategorySelect';
import { closeModalAddTransaction, openModalAddTransaction } from 'redux/session/session-slice';
import { useGetTransactionSummaryQuery } from 'redux/wallet/wallet-api';

let schema = yup.object().shape({
  type: yup
    .string()
    .default('-')
    .required(
      "Выберите тип транзакции 'Доход' или  'Расходы'. Это обязательное поле ",
    ),
  amount: yup
    .string()
    .max(10)
    .default('0.00')
    .required('Введите сумму. Это обязательное поле'),

  date: yup
    .string()
    .default(function () {
      const today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      let currentDate = dd + '.' + mm + '.' + yyyy;
      return currentDate;
    })
    .required(),
  comment: yup
    .string()
    .max(15, 'Максимально допустимая длинна комментария 15 символов'),
  category: yup
    .string()
    .max(15, 'Максимально допустимая длинна комментария 15 символов'),
});

const today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
let currentDate = dd + '.' + mm + '.' + yyyy;

const initialValues = {
  type: '',
  amount: '',
  date: '',
  comment: '',
  category: '',
};

export default function ModalAddTransaction() {
  
  const [date, setDate] = useState(currentDate);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [transactionType, setTransactionType] = useState('-');
  const [newCategory, setNewCategory] = useState('');
  const dispatch = useDispatch();

  const handleCheckbox = e => {
    e.target.checked === true
      ? setTransactionType('+')
      : setTransactionType('-');
  };

  const onChangeCategory = e => {
    return e === null ? setCategory('') : setCategory(e.value);
  };

  const addCategory = e => {
    setNewCategory(e.target.value);
  };
  const amountChange = e => {
    return setAmount(e.target.value);
  };
  const amountForSending = amount => {
    if (Number.isInteger(Number(amount)) === true) {
      return amount + '.00';
    } else return amount;
  };

  const isModalOpen = () => {
    dispatch(openModalAddTransaction)
  }

  const onClose = () => {
    dispatch(closeModalAddTransaction());
  };

  const [value, onChange] = useState(new Date());

  return (
    <Modal
    open={isModalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflowY: 'scroll', zIndex: 200 }}
      
    >
<>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => {
          const reset = {
            type: transactionType,
            amount: amountForSending(amount),
            date: date ? date : currentDate,
            comment: values.comment || 'Нет комментария',
            category,
            newCategory,
          };
          const reset2 = {
            type: transactionType,
            amount: amountForSending(amount),
            date: date ? date : currentDate,
            comment: values.comment || 'Нет комментария',
            category,
          };
          const result = newCategory ? reset : reset2;
          
          dispatch(useGetTransactionSummaryQuery.addTransaction(result));
          setAmount('');
          setCategory('');
          setDate('');
          setTransactionType('-');
          resetForm();
          // handleClose();
          // closeModalWindow();
          onClose();
        }}
      >
        <Form autoComplete="off">
          <button
            type="button"
            onClick={() => {
              // handleClose();
              onClose();
              // closeModalWindow();
              dispatch(modalActions.modalAddTransactionClose());
            }}
            className={s.closeBtn}
          >
            <img src={closeBtnIcon} alt="Close" />

          </button>
          <p className={s.title}>Добавить транзакцию</p>
          <div className={s.checkboxWrap}>
            <span
              className={
                transactionType === '+'
                  ? classNames(s.incomes, s.incomesActive)
                  : s.incomes
              }
            >
              Доход
            </span>
            <label htmlFor="transactionType">
              <div className={classNames(s.button, s.r)} >
                <Field
                  type="checkbox"
                  className={s.checkbox}
                  name="type"
                  onClick={handleCheckbox}
                />

                <ErrorMessage
                  name="type"
                  render={msg => {
                    return toast(msg, { toastId: '' });
                  }}
                />
                <div className={classNames(s.knobs, s.knobsTransactions)}></div>
                <div className={s.layer}></div>
              </div>
            </label>
            <span
              className={
                transactionType === '-'
                  ? classNames(s.outcomes, s.outcomesActive)
                  : s.outcomes
              }
            >
              Расход
            </span>
          </div>
          <Field
            type="text"
            name="newCategory"
            placeholder={
              'Выберите категорию'
            }
            disabled={category}
            className={s.newCategory}
            onChange={addCategory}
          />
          <ErrorMessage
            name="newCategory"
            render={msg => {
              return toast(msg, { toastId: '' });
            }}
          />
          <TransactionsCategoriesSelect
            onChange={onChangeCategory}
            newCategory={newCategory}
          />
          <div className={s.sumAndDateWrap}>
            <Field
              type="number"
              name="amount"
              className={s.sumInput}
              placeholder="0.00"
              value={amount}
              min="0"
              required
              onChange={amountChange}
            />
            <ErrorMessage
              name="amount"
              render={msg => {
                return toast(msg, { toastId: '' });
              }}
            />
            <DateTimePicker
              dateFormat="DD.MM.YYYY"
              timeFormat={false}
              className={s.datetime}
              initialValue={currentDate}
              closeOnSelect={true}
              onChange={onChange} 
              value={value}
              name="date"
              // onChange={onChangeCategory}
            />
            <ErrorMessage
              name="date"
              render={msg => {
                return toast(msg, { toastId: '' });
              }}
            />
          </div>
          <Field
            type="text"
            name="comment"
            placeholder={'Комментарий'}
            className={s.commentInput}
          />

          <ErrorMessage
            name="comment"
            render={msg => {
              return toast(msg, { toastId: '' });
            }}
          />
          <div className={s.btnWrap}>
            <button
              type="submit"
              className={s.acceptBtn}
              onSubmit={() => {
                // handleClose();
                onClose();
                // dispatch(closeModalWindow());
                // closeModalWindow();
                // dispatch(modalActions.modalAddTransactionClose());
              }}
            >
              ДОБАВИТЬ
            </button>
            <button
              type="button"
              className={s.cancelBtn}
              onClick={() => {
                // handleClose();
                // closeModalWindow();
                // dispatch(closeModalWindow());
                onClose();

                // dispatch(modalActions.modalAddTransactionClose());
              }}
            >
              OТМЕНА
            </button>
          </div>
        </Form>
      </Formik>
      </>

    </Modal>
  );
}
ModalAddTransaction.propTypes = {
  closeModalWindow: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};