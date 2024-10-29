import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      arrSchedule: [],
    };
  }
  async componentDidMount() {
    // console.log(moment(new Date()).format("dddd - DD/MM"));
    // console.log(moment(new Date()).locale("en").format("dddd - DD/MM"));

    this.setArrDays(this.props.language);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setArrDays(this.props.language);
    }
    if (this.props.scheduleData !== prevProps.scheduleData) {
      this.setState({
        arrSchedule: this.props.scheduleData,
      });
    }
  }
  getScheduleDoctor = async (doctorId, date) => {
    await this.props.fetchScheduleDoctorByDate(doctorId, date);
  };
  capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = this.capitalizeFirstLetter(labelVi);
      } else {
        object.label = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("dddd - DD/MM");
      }
      object.value = moment(new Date())
        .add(i, "days")
        .startOf("days")
        .valueOf();
      allDays.push(object);
    }
    this.setState({
      allDays: allDays,
    });
  };

  handleOnchangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      await this.getScheduleDoctor(doctorId, date);
    }
  };
  render() {
    let { allDays, arrSchedule } = this.state;
    let { language } = this.props;
    console.log("Noah check arr schedule", arrSchedule);
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(event) => this.handleOnchangeSelect(event)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <span>
              <i className="fas fa-calendar-alt"></i>Lịch khám
            </span>
          </div>
          <div className="time-content">
            {arrSchedule && arrSchedule.length > 0 ? (
              arrSchedule.map((item, index) => {
                return (
                  <button key={index}>
                    {language === LANGUAGES.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn}
                  </button>
                );
              })
            ) : (
              <div>Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    scheduleData: state.admin.scheduleData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduleDoctorByDate: (doctorId, date) =>
      dispatch(actions.fetchScheduleDoctorByDate(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
