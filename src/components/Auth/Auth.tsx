import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import Button from "@material-ui/core/Button";
import { useTranslation } from "react-i18next";

import { signIn, signOut } from "../../actions/auth";
import { registerUser } from "../../actions/user";
import { setCurrentLocation } from "../../actions/location";
import { IState } from "../../reducers";
import getLocation from "../../utils/getLocation";
import { SnackbarContext } from "../Snackbar/SnackbarProvider";

export interface User {
  name: string;
  email: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    name: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
  })
);

interface Props {}

export const Auth = (props: Props) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { setSnackbar } = useContext(SnackbarContext);

  const user = useSelector((state: IState) => state.auth.user);

  const isSignedIn = useSelector((state: IState) => state.auth.isSignedIn);

  const onSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ("profileObj" in response) {
      const name = response.profileObj.name;
      const email = response.profileObj.email;
      const user = { name, email };

      dispatch(signIn(user));

      dispatch(registerUser(user));

      setSnackbar({
        type: "success",
        message: t("auth.singIn"),
      });
    }

    getLocation()
      .then((p: unknown) => {
        const position = p as GeolocationPosition;
        const currentLocation = {
          lon: position.coords.longitude,
          lat: position.coords.latitude,
        };

        dispatch(setCurrentLocation(currentLocation));
      })
      .catch((error) => {
        setSnackbar({
          type: "error",
          message: error,
        });

        throw error;
      });
  };

  const onFailure = (response: any) => {
    dispatch(signOut());

    setSnackbar({
      type: "error",
      message: t("auth.failure"),
    });
  };

  const onSignOut = (event: any) => {
    dispatch(signOut());

    setSnackbar({
      type: "success",
      message: t("auth.signOut"),
    });
  };

  return isSignedIn ? (
    <div>
      <span className={classes.name}>{user.name}</span>

      <Button variant="contained" color="default" onClick={onSignOut}>
        {t("header.signOut")}
      </Button>
    </div>
  ) : (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
      buttonText={t("header.signIn")}
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
