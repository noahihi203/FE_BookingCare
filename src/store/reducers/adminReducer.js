import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  roles: [],
  users: [],
  topDoctors: [],
};

const adminReducer = (state = initialState, action) => {
  let copyState = { ...state };
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      copyState.genders = action.data;
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      copyState.genders = [];
      copyState.isLoadingGender = false;
      return {
        ...copyState,
      };
    //position
    case actionTypes.FETCH_POSITION_START:
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      copyState.positions = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      copyState.positions = [];
      return {
        ...copyState,
      };
    //role
    case actionTypes.FETCH_ROLE_START:
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      copyState.roles = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      copyState.roles = [];
      return {
        ...copyState,
      };
    //get_all_users
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      copyState.users = action.data;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      copyState.users = [];
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      copyState.topDoctors = action.dataDoctors;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      copyState.topDoctors = [];
      return {
        ...copyState,
      };

    default:
      return state;
  }
};

export default adminReducer;
