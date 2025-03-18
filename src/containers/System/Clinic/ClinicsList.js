import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ClinicsList.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/clinicService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ClinicsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
      addressVi: "",
      addressEn: "",
      descriptionHTMLVi: "",
      descriptionMarkdownVi: "",
      descriptionHTMLEn: "",
      descriptionMarkdownEn: "",
      image: "",
    };
  }
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChangeVi = ({ html, text }) => {
    this.setState({
      descriptionHTMLVi: html,
      descriptionMarkdownVi: text,
    });
  };
  handleEditorChangeEn = ({ html, text }) => {
    this.setState({
      descriptionHTMLEn: html,
      descriptionMarkdownEn: text,
    });
  };
  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        image: base64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    console.log("Noah check state: ", this.state)
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Tạo mới chuyên khoa thành công");
      this.setState({
        nameVi: "",
        nameEn: "",
        addressVi: "",
        addressEn: "",
        image: "",
        descriptionHTMLVi: "",
        descriptionMarkdownVi: "",
        descriptionHTMLEn: "",
        descriptionMarkdownEn: "",
      });
    } else {
      toast.error("Tạo mới chuyên khoa thất bại");
    }
  };
  render() {
    return (
      <div className="manage-clinic-container">
        Clinics list
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicsList);
