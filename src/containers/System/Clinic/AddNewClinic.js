import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./AddNewClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/clinicService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddNewClinic extends Component {
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
        <div className="ms-title">
          <FormattedMessage id="admin.manage-clinic.add-new-clinic.title" />
        </div>
        <div className="add-new-clinic row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.nameVi" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.nameVi}
              onChange={(event) => this.handleOnChangeInput(event, "nameVi")}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.nameEn" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.nameEn}
              onChange={(event) => this.handleOnChangeInput(event, "nameEn")}
            />
          </div>
          <div className="col-3 form-group">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.upload-image" />
            </label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.addressVi" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.addressVi}
              onChange={(event) => this.handleOnChangeInput(event, "addressVi")}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.addressEn" />
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.addressEn}
              onChange={(event) => this.handleOnChangeInput(event, "addressEn")}
            />
          </div>
          <div className="col-6">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.descriptionVi" />
            </label>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeVi}
              value={this.state.descriptionMarkdownVi}
            />
          </div>
          <div className="col-6">
            <label>
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.descriptionEn" />
            </label>
            <MdEditor
              style={{ height: "400px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeEn}
              value={this.state.descriptionMarkdownEn}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-clinic"
              onClick={() => this.handleSaveNewClinic()}
            >
              <FormattedMessage id="admin.manage-clinic.add-new-clinic.save" />
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewClinic);
