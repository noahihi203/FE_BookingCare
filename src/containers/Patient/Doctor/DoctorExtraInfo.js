import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfo.scss";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };
  render() {
    let { isShowDetailInfo } = this.state;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">Địa chỉ phòng khám</div>
          <div className="name-clinic">Phòm khám chuyên khoa da liễu</div>
          <div className="address-clinic">
            207 Phố Huế - Hai Bà Trưng Hà Nội
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ? (
            <>
              <div>Giá khám: 250000</div>
              <div className="see-detail">
                <span onClick={() => this.showHideDetailInfo(true)}>
                  Xem chi tiết
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="title-price">Giá khám: </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">Giá khám:</span>
                  <span className="right">250000</span>
                </div>
                <div className="note">Dược ưu tiên......................</div>
              </div>
              <div className="payment">Người bệnh có thể trả bằng ..............</div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfo(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
