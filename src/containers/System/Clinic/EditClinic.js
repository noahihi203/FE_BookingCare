import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./EditClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic } from "../../../services/clinicService";
import { toast } from "react-toastify";
import {getDetailClinicById} from "../../../services/clinicService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicId: "",
      nameVi: "",
      nameEn: "",
      addressVi: "",
      addressEn: "",
      descriptionHTMLVi: "",
      descriptionMarkdownVi: "",
      descriptionHTMLEn: "",
      descriptionMarkdownEn: "",
      image: "",
      detailClinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        clinicId: id,
      });
      let res = await getDetailClinicById(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailClinic: res.data,
        });
      }
    }
    console.log("Noah check state: ", this.state);
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}
 
  render() {
    return (
      <div className="manage-clinic-container">
        edit clinic
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

export default connect(mapStateToProps, mapDispatchToProps)(EditClinic);
