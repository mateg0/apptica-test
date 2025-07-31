import React from "react";
import { Select } from "antd";
import { Country } from "@/shared/lib/types";
import styles from "./CountrySelect.module.css";

interface CountrySelectProps {
  countryId: number | null;
  countries: Country[];
  onChange: (countryId: number) => void;
  loading?: boolean;
}

export const CountrySelect = ({
  countryId,
  countries,
  onChange,
  loading,
}: CountrySelectProps) => {
  return (
    <Select
      className={styles.Select}
      onChange={onChange}
      loading={loading && !countryId}
      disabled={loading}
      value={countryId}
      options={countries.map((country) => ({
        value: country.id,
        label: (
          <div className={styles.Select__option}>
            <img
              className={styles.Select__optionIcon}
              src={country.icon}
              alt={country.name}
            />
            <div>{country.name}</div>
          </div>
        ),
      }))}
    />
  );
};
