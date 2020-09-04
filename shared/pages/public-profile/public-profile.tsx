import Head from "next/head";
import { FC } from "react";
import logo from "../../../public/bix_logo.svg";
import { CompanyHeader } from "../../components/company-header/company-header";
import { CompanySearch } from "../../components/company-search/company-search";
import { Header } from "../../components/header/header";
import classes from "./public-profile.module.scss";

export const PublicProfile: FC = () => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <div className={classes.headerBlock}>
        <div className={classes.container}>
          <Header logoPath={logo} />
        </div>
        <div className={classes.divider}></div>
        <div className={classes.container}>
          <CompanySearch />
        </div>
        <div className={classes.container}>
          <CompanyHeader />
        </div>
      </div>
    </div>
  );
};
