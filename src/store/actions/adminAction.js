import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInfoDetailDoctor,
  bulkCreateScheduleService,
  getScheduleDoctorByDateService,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error ", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error ", e);
    }
  };
};
export const fetchRoleSuccess = (positionData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: positionData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create the user succeed!");
        dispatch(createNewUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(createNewUserFailed());
      }
    } catch (e) {
      dispatch(createNewUserFailed());
      console.log("createNewUser error ", e);
    }
  };
};
export const createNewUserSuccess = () => ({
  type: "CREATE_USER_SUCCESS",
});
export const createNewUserFailed = () => ({
  type: "CREATE_USER_FAILED",
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all users failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Fetch all users failed!");
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersStart error ", e);
    }
  };
};
export const fetchAllUsersSuccess = (userData) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  data: userData,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user succeed!");
        dispatch(deleteAUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete the user failed!");
        dispatch(deleteAUserFailed());
      }
    } catch (e) {
      toast.error("Delete the user failed!");
      dispatch(deleteAUserFailed());
      console.log("deleteAUser error ", e);
    }
  };
};
export const deleteAUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteAUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update the user succeed!");
        dispatch(editAUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Update the user failed!");
        dispatch(editAUserFailed());
      }
    } catch (e) {
      toast.error("Update the user failed!");
      dispatch(editAUserFailed());
      console.log("editAUser error ", e);
    }
  };
};
export const editAUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editAUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_TOP_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          dataDr: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALL_DOCTORS_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
    }
  };
};
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctorService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
        toast.success("Save info detail doctor succeed!");
      } else {
        toast.error("Save info detail doctor fail!");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      toast.error("Save info detail doctor fail!");
      console.log("SAVE_DETAIL_DOCTOR_FAILED: ", e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
    }
  };
};

export const saveScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await bulkCreateScheduleService(data);
      if (res && res.errCode === 0) {
        toast.success("Save schedule doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS,
        });
      } else {
        toast.success("Save schedule doctor succeed!");
        dispatch({
          type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED,
        });
      }
    } catch (e) {
      console.log("SAVE_SCHEDULE_DOCTOR_FAILED", e);
      toast.success("Save schedule doctor succeed!");
      dispatch({
        type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAILED,
      });
    }
  };
};

export const fetchScheduleDoctorByDate = (doctorId, date) => {
  return async (dispatch, getState) => {
    try {
      let res = await getScheduleDoctorByDateService(doctorId, date);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_SUCCESS,
          scheduleData: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED,
        });
      }
    } catch (e) {
      console.log("FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED: ", e);
      dispatch({
        type: actionTypes.FETCH_SCHEDULE_DOCTOR_BY_DATE_FAILED,
      });
    }
  };
};

export const getRequiredDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
        };
        dispatch({
          type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
          allRequiredData: data,
        });
      } else {
        dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED });
      }
    } catch (e) {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED });
    }
  };
};

//start doing end
