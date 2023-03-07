import React from "react";

import styles from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
}): any => {
  let classLoader = styles["medium-loader"];
  if (size === LoaderSize.s) {
    classLoader = styles["small-loader"];
  } else if (size === LoaderSize.l) {
    classLoader = styles["large-loader"];
  }

  if (loading) {
    return <div className={classLoader}></div>;
  }
  return;
};

export default React.memo(Loader);
