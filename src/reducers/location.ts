import { LOCATION_SET_CURRENT, LOCATION_SET_PICKED } from "../constants";
import { IAction } from "../actions/location";
import { Location } from "../components/Map";

export interface IStateLocation {
  current: Location;
  picked: Location;
}

const initialState = {
  current: null,
  picked: null,
};

const reducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case LOCATION_SET_CURRENT:
      return {
        ...state,
        current: action.payload.location,
      };

    case LOCATION_SET_PICKED:
      return {
        ...state,
        picked: action.payload.location,
      };
    default:
      return state;
  }
};

export default reducer;
