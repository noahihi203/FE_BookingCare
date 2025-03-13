import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameVi: "",
      nameEn: "",
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
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Tạo mới chuyên khoa thành công");
      this.setState({
        nameVi: "",
        nameEn: "",
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
      <div className="manage-specialty-container">
        <div className="ms-title">
          <FormattedMessage id="admin.manage-specialty.title" />
        </div>
        <div className="add-new-specialty row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-specialty.nameVi" />
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
              <FormattedMessage id="admin.manage-specialty.nameEn" />
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
              <FormattedMessage id="admin.manage-specialty.upload-image" />
            </label>
            <input
              type="file"
              className="form-control-file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-6">
            <label>
              <FormattedMessage id="admin.manage-specialty.descriptionVi" />
            </label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeVi}
              value={this.state.descriptionMarkdownVi}
            />
          </div>
          <div className="col-6">
            <label>
              <FormattedMessage id="admin.manage-specialty.descriptionEn" />
            </label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChangeEn}
              value={this.state.descriptionMarkdownEn}
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewSpecialty()}
            >
              <FormattedMessage id="admin.manage-specialty.save" />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
