import { FC } from "react";
import classes from "./company-search.module.scss";

interface CompanySearchProps {}

export const CompanySearch: FC<CompanySearchProps> = () => {
  return (
    <form className={classes.companySearch}>
      <label htmlFor="search-input">Cégkereső</label>
      <div className={classes.searchInputBlock}>
        <input id="search-input" className={classes.searchInput} />
        <button className={classes.searchButton}>Keresés</button>
      </div>
      <div className={classes.searchExamples}>
        <b>Gyorskeresés:</b> Könyvelők, Marketingesek, HR szolgáltatók,
        Építőipar
      </div>
    </form>
  );
};
