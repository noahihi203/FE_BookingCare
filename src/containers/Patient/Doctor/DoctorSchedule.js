import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
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
    this.getScheduleDoctor(this.props.scheduleData);
    let allDays = this.getArrDays(this.props.language);
    if (allDays && allDays.length > 0) {
      let res = this.getScheduleDoctor(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allDays: allDays,
        arrSchedule: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.scheduleData !== prevProps.scheduleData) {
      this.setState({
        arrSchedule: this.props.scheduleData,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = this.getScheduleDoctor(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        arrSchedule: res.data ? res.data : [],
      });
    }
  }
  getScheduleDoctor = async (doctorId, date) => {
    await this.props.fetchScheduleDoctorByDate(doctorId, date);
  };
  capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today- ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("dddd - DD/MM");
        }
      }
      object.value = moment(new Date())
        .add(i, "days")
        .startOf("days")
        .valueOf();
      allDays.push(object);
    }
    return allDays;
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
              <i className="fas fa-calendar-alt"></i>{" "}
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="time-content">
            {arrSchedule && arrSchedule.length > 0 ? (
              <React.Fragment>
                <div className="time-content-btn">
                  {arrSchedule.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vie" : "btn-en"
                        }
                      >
                        {language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                    <i className="far fa-hand-point-up"> </i>{" "}
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </React.Fragment>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.Notification-when-there-is-no-schedule" />
              </div>
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
