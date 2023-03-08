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
  const classLoader = styles[`loader_size-${size}`];

  if (loading) {
    return <div className={classLoader} />;
  }
  return;
};

export default React.memo(Loader);
