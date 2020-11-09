import React from "react";
import { Redirect } from "react-router-dom";

//Redirect user to login page
function RedirectPage() {
  return (
    <Redirect to={{ pathname: "/api/users/login" }} />
  )
}

export default RedirectPage;