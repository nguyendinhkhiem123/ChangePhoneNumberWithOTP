import React from "react";

import { Navigate, useNavigate } from "react-router-dom";

import { KEY_TOKEN } from "../../common/constant/key";

export default function PrivateRoute(props) {
  const { Component, ...rest } = props;
  const token = localStorage.getItem(KEY_TOKEN);

  console.log(token);
  if (!token) return <Navigate to="/login" />;
  return <Component {...rest} />;
}
