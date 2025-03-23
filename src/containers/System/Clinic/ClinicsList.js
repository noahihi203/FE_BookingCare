import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ClinicsList.scss";
import { LANGUAGES } from "../../../utils";
import { getClinicsList } from "../../../services/clinicService";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
class ClinicsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicsList: [],
      isOpen: false,
      previewImgURL: "",
    };
  }
  async componentDidMount() {
    await this.getClinicsList();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getClinicsList = async () => {
    let res = await getClinicsList();
    if (res && res.errCode === 0) {
      this.setState({
        clinicsList: res.data,
      });
    } else {
      console.log("Không lấy được danh sách!");
    }
  };
  openPreviewImage = (image) => {
    if (!image) return;
    this.setState({
      isOpen: true,
      previewImgURL: image,
    });
  };
  handleEditUser = (clinic) => {
    if (clinic && clinic.id) {
      this.props.history.push(`/system/edit-clinic/${clinic.id}`);
    }
  };
  render() {
    let { clinicsList } = this.state;
    return (
      <div className="clinics-list-container">
        <div className="clinics-list-body">
          <div className="clinics-list-title">
            <FormattedMessage id="admin.manage-clinic.clinics-list.title" />
          </div>
          <div className="clinics-list-table">
            <table id="customers">
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="admin.manage-clinic.clinics-list.clinic-name" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-clinic.clinics-list.clinic-address" />
                  </th> 
                  <th>
                    <FormattedMessage id="admin.manage-clinic.clinics-list.clinic-description" />
                  </th>
                  <th>
                    <FormattedMessage id="admin.manage-clinic.clinics-list.clinic-image" />
                  </th>
                  <th className="edit-clinic">
                    <FormattedMessage id="admin.manage-clinic.clinics-list.edit-clinic" />
                  </th>
                  <th className="delete-clinic">
                    <FormattedMessage id="admin.manage-clinic.clinics-list.delete-clinic" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {clinicsList &&
                  clinicsList.length > 0 &&
                  clinicsList.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {this.props.language === LANGUAGES.VI
                            ? item.nameVi
                            : item.nameEn}
                        </td>
                        <td>
                          {this.props.language === LANGUAGES.VI
                            ? item.addressVi
                            : item.addressEn}
                        </td>
                        <td>
                          {this.props.language === LANGUAGES.VI
                            ? item.descriptionMarkdownEn
                            : item.descriptionMarkdownEn}
                        </td>
                        <td
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${item.image})`,
                          }}
                          onClick={() => this.openPreviewImage(item.image)}
                        ></td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
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
