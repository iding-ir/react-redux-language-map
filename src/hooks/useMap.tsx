import { useState, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";

import { loadIcons } from "../modules/loadIcons";
import { build } from "../modules/build";
import { fetchGeoJson } from "../modules/fetchGeoJson";
import { renderGeoJson } from "../modules/renderGeoJson";
import * as iOptions from "../constants/iOptions";

export const useMap = () => {
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN as string;

    const map: Map = new Map({
      container: iOptions.iMap.container,
      center: iOptions.iMap.center,
      zoom: iOptions.iMap.zoom,
      minZoom: iOptions.iMap.minZoom,
      maxZoom: iOptions.iMap.maxZoom,
      pitch: iOptions.iMap.pitch,
      bearing: iOptions.iMap.bearing,
      hash: iOptions.iMap.hash,
      style: iOptions.iStyles[iOptions.iDefaultStyle],
    });

    build(map).then(() => {
      loadIcons(map).then(() => {
        fetchGeoJson(map).then((geoJsons) => {
          renderGeoJson(map, geoJsons).then(() => {
            setMap(map);
          });
        });
      });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { map };
};
