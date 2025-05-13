import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/bookingcare-2020.svg";
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";
import "./Section/About.scss";

class HomeFooter extends Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col lg={4} md={6} className="mb-4 mb-md-0">
              <div className="footer-about">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="BookingCare Logo"
                  className="footer-logo"
                />
                <h5>Công ty Cổ phần Công nghệ BookingCare</h5>
                <p>
                  <strong>Địa chỉ:</strong> 28 Thành Thái, Dịch Vọng, Cầu Giấy,
                  Hà Nội
                </p>
                <p>
                  <strong>ĐKKD số:</strong> 0106790291. Sở KHĐT Hà Nội cấp ngày
                  16/03/2015
                </p>
              </div>
            </Col>

            <Col lg={2} md={6} className="mb-4 mb-md-0">
              <h5 className="footer-heading">Liên kết nhanh</h5>
              <ul className="footer-links">
                <li>
                  <a href="#!">Trang chủ</a>
                </li>
                <li>
                  <a href="#!">Cơ sở y tế</a>
                </li>
                <li>
                  <a href="#!">Bác sĩ</a>
                </li>
                <li>
                  <a href="#!">Chuyên khoa</a>
                </li>
                <li>
                  <a href="#!">Cẩm nang</a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6} className="mb-4 mb-md-0">
              <h5 className="footer-heading">Về BookingCare</h5>
              <ul className="footer-links">
                <li>
                  <a href="#!">Giới thiệu</a>
                </li>
                <li>
                  <a href="#!">Liên hệ</a>
                </li>
                <li>
                  <a href="#!">Quy chế hoạt động</a>
                </li>
                <li>
                  <a href="#!">Điều khoản sử dụng</a>
                </li>
                <li>
                  <a href="#!">Chính sách bảo mật</a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6} className="mb-4 mb-md-0">
              <h5 className="footer-heading">Liên hệ hỗ trợ</h5>
              <p>
                Gọi tư vấn đặt khám: <strong>1900-2115</strong>
              </p>
              <p>Email: support@bookingcare.vn</p>
              <div className="footer-social">
                <a href="#!" className="social-icon">
                  <FaFacebookF />
                </a>
                <a href="#!" className="social-icon">
                  <FaYoutube />
                </a>
                <a href="https://github.com/noahihi203" className="social-icon">
                  <FaGithub />
                </a>
                <a href="#!" className="social-icon">
                  <FaLinkedinIn />
                </a>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <p className="copyright">
                &copy; {new Date().getFullYear()} BookingCare. Tất cả các quyền
                được bảo lưu.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
