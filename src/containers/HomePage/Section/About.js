import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          <span>About</span>
        </div>
        {/* <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/bqcm-rqbc-Q"
              title="Tất cả các kiểu cầu thủ bóng đá trong 11 phút"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Thông báo tuyển dụng Chào anh em Để bảo đảm chất lượng cũng như số
              lượng video để phục vụ giờ cơm và các hoạt động cần background của
              anh em thì Nhi Đồng Mất Não đang cần tìm các cộng tác viên nội
              dung và cộng tác viên kiểm duyệt.
            </p>
          </div>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
