import React, { useEffect, useContext, ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { StateContext } from "../State";
import { MAP_STYLE } from "../../constants/constants";

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

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

    const map: Map = new mapboxgl.Map({
      container: "map",
      center: [10, 45],
      zoom: 3.5,
      minZoom: 2,
      maxZoom: 20,
      style: MAP_STYLE,
    });

    const navigationControl = new mapboxgl.NavigationControl({});

    map.addControl(navigationControl, "top-left");

    setState({ ...state, map });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.map} id="map">
      {children}
    </div>
  );
};
