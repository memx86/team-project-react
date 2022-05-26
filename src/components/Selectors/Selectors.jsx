import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import useTranslation from "assets/hooks/useTranslation";
import useClickOutside from "assets/hooks/useClickOutside";
import useMonthsLocale from "assets/hooks/useMonthsLocale";

import { years } from "assets/constants/MONTHS-YEARS";
import spriteSvg from "assets/images/sprite.svg";

import Button, { STYLE_TYPE } from "components/Button";

import s from "./Selectors.module.scss";

function filter(param) {
  const filterParam = param?.filter(
    (item, index, items) => items.indexOf(item) === index
  );

  return filterParam;
}

const Selectors = ({ transactions, selectDate }) => {
  const { t } = useTranslation("selectors");
  const month = t.month;
  const year = t.year;
  const [selectMonth, setSelectMonth] = useState(month);
  const [selectYear, setSelectYear] = useState(year);
  const [activeMonth, setIsActiveMonth] = useState(false);
  const [activeYear, setIsActiveYear] = useState(false);
  const months = useMonthsLocale();
  const transactionYears = transactions?.map(
    (el) => +el.transactionDate.slice(0, 4)
  );
  const transactionMonths = transactions?.map(
    (el) => +el.transactionDate.slice(5, 7)
  );

  let domNode = useClickOutside(() => {
    setIsActiveMonth(false);
    setIsActiveYear(false);
  });

  useEffect(() => {
    if (selectDate) {
      selectDate(months.indexOf(selectMonth) + 1, selectYear);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectYear, selectMonth]);

  useEffect(() => {
    setSelectMonth(month);
    setSelectYear(year);
  }, [month, year]);

  const checkYear = filter(transactionYears);
  const checkMonth = filter(transactionMonths);

  const resetClick = () => {
    selectDate(0, 0);
    setSelectMonth(month);
    setSelectYear(year);
  };
  return (
    <>
      <div className={s.selectors}>
        <div className={s.select_box}>
          {activeMonth && (
            <div ref={domNode} className={s.active}>
              {months.map((el) => {
                return (
                  <option
                    disabled={!checkMonth.includes(months.indexOf(el) + 1)}
                    key={el}
                    className={s.item}
                    onClick={() => {
                      setSelectMonth(el);
                      setIsActiveMonth(false);
                    }}
                    style={
                      checkMonth.includes(months.indexOf(el) + 1)
                        ? { color: "black" }
                        : { color: "#D0D0D0" }
                    }
                  >
                    {el}
                  </option>
                );
              })}
            </div>
          )}
          <div
            className={s.selected}
            onClick={() => setIsActiveMonth(!activeMonth)}
          >
            <b className={s.mainSelect}>{selectMonth}</b>
            <svg className={s.icon}>
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
        <div className={s.select_box}>
          {activeYear && (
            <div ref={domNode} className={s.active}>
              {years.map((el) => (
                <option
                  disabled={!checkYear.includes(el)}
                  key={el}
                  className={`${s.item}`}
                  onClick={() => {
                    setSelectYear(el);
                    setIsActiveYear(false);
                  }}
                  style={
                    checkYear.includes(el)
                      ? { color: "black" }
                      : { color: "#D0D0D0" }
                  }
                >
                  {el}
                </option>
              ))}
            </div>
          )}
          <div
            className={s.selected}
            onClick={() => {
              setIsActiveYear(!activeYear);
            }}
          >
            <b className={s.mainSelect}>{selectYear}</b>
            <svg className={s.icon}>
              <use href={`${spriteSvg}#icon-down-arrow`}></use>
            </svg>
          </div>
        </div>
      </div>
      <Button
        styleType={STYLE_TYPE.SECONDARY}
        className={s.reset}
        onClick={resetClick}
        disabled={selectMonth === month && selectYear === year ? true : false}
        text={t.reset}
      />
    </>
  );
};

export default Selectors;

Selectors.propTypes = {
  month: PropTypes.arrayOf(PropTypes.string),
  years: PropTypes.arrayOf(PropTypes.number),
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionDate: PropTypes.string,
    })
  ),
  selectDate: PropTypes.func.isRequired,
};
