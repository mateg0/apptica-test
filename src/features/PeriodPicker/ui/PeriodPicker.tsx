import React from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { DATE_FORMAT } from "@/shared/lib/constants";
import styles from "./PeriodPicker.module.css";

export const PeriodPicker = ({
  fromDate,
  toDate,
  onChange,
}: {
  fromDate: string | null;
  toDate: string | null;
  onChange: (values: {
    fromDate: string | null;
    toDate: string | null;
  }) => void;
}) => {
  return (
    <DatePicker.RangePicker
      className={styles.PeriodPicker}
      value={[
        fromDate ? dayjs(fromDate, DATE_FORMAT) : null,
        toDate ? dayjs(toDate, DATE_FORMAT) : null,
      ]}
      allowEmpty={[true, true]}
      onChange={(dates) => {
        onChange({
          fromDate: dates?.[0]?.format(DATE_FORMAT) ?? null,
          toDate: dates?.[1]?.format(DATE_FORMAT) ?? null,
        });
      }}
    />
  );
};
