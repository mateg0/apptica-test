import React, { useEffect, useMemo, useState } from "react";
import { Space, Spin, Typography } from "antd";
import { CountrySelect } from "@/features/CountrySelect";
import { PeriodPicker } from "@/features/PeriodPicker";
import { Chart } from "@/features/Chart";
import styles from "./TopHistory.module.css";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { getCountries } from "@/entities/countries/getCountries";
import { getCategories } from "@/entities/categories/getCategories";
import { getTopHistory } from "@/entities/topHistory/getTopHistory";
import { SUB_CATEGORIES } from "@/shared/lib/constants";

export const TopHistory = () => {
  const dispatch = useAppDispatch();
  const [currentCountry, setCurrentCountry] = useState<number | null>(1);
  const [fromDate, setFromDate] = useState<string | null>(null);
  const [toDate, setToDate] = useState<string | null>(null);
  const { status: countriesStatus, countries } = useAppSelector(
    (state) => state.countries,
  );
  const { status: categoriesStatus, categories } = useAppSelector(
    (state) => state.categories,
  );
  const { data, status: topHistoryStatus } = useAppSelector(
    (state) => state.topHistory,
  );

  const chartData = useMemo(() => {
    if (topHistoryStatus === "done" && categoriesStatus === "done") {
      return {
        labels: Array.from(new Set(data.flatMap((v) => Object.keys(v.values)))),
        datasets: data.map(({ categoryId, subcategoryId, values }) => ({
          label: `${categories.find(({ id }) => id === categoryId)!.name} – ${
            //@ts-expect-error 1
            SUB_CATEGORIES[subcategoryId]
          }`,
          data: Object.values(values),
        })),
      };
    }
    return null;
  }, [topHistoryStatus, categoriesStatus]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (currentCountry)
      dispatch(
        getTopHistory({
          countryId: currentCountry,
          dateFrom: fromDate,
          dateTo: toDate,
        }),
      );
  }, [currentCountry, dispatch, fromDate, toDate]);

  return (
    <div className={styles.TopHistoryChart}>
      <div className={styles.TopHistoryChart__header}>
        <div>
          <Typography.Text strong type="secondary">
            Top History
          </Typography.Text>
        </div>
        <Space.Compact className={styles.TopHistoryChart__filters} block>
          <CountrySelect
            countryId={currentCountry}
            loading={countriesStatus !== "done"}
            countries={countries}
            onChange={function (countryId: number): void {
              setCurrentCountry(countryId);
            }}
          />
          <PeriodPicker
            fromDate={fromDate}
            toDate={toDate}
            onChange={function ({
              fromDate,
              toDate,
            }: {
              fromDate: string | null;
              toDate: string | null;
            }): void {
              setFromDate(fromDate);
              setToDate(toDate);
            }}
          />
        </Space.Compact>
      </div>
      <Chart
        options={{
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
        data={chartData}
        type={"line"}
      />
    </div>
  );
};
