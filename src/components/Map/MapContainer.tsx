import React, { useEffect, useContext, ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import "mapbox-gl/dist/mapbox-gl.css";

import { StateContext } from "../State";
import { MAP_STYLE_LIGHT, MAP_STYLE_DARK } from "../../constants/constants";
import { useMapboxGL } from "../../hooks/useMapboxGL";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    map: {
      position: "relative",
      width: "100%",
      height: "100%",
      flexGrow: 1,
    },
  })
);

interface Props {
  children: ReactNode;
}

export const MapContainer = (props: Props) => {
  const { children } = props;

  const classes = useStyles();

  const { state, setState } = useContext(StateContext);

  const { map } = useMapboxGL({
    icons: {
      cat: "/assets/images/icon-cat.png",
      dog: "/assets/images/icon-dog.png",
    },
    geoJsons: {
      cats: "/data/cats.json",
      dogs: "/data/dogs.json",
      ways: "/data/ways.json",
    },
    styles: {
      light: MAP_STYLE_LIGHT,
      dark: MAP_STYLE_DARK,
    },
    defaultStyle: "dark",
  });

  useEffect(() => {
    setState({ ...state, map });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <div className={classes.map} id="map">
      {children}
    </div>
  );
};
