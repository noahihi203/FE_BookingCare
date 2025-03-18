import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ClinicsList.scss";
import { LANGUAGES } from "../../../utils";
import { getClinicsList } from "../../../services/clinicService";

class ClinicsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinicsList: [],
      isOpen: false,
    };
  }
  async componentDidMount() {
    await this.getClinicsList();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getClinicsList = async () => {
    let res = await getClinicsList();
    console.log("Noah check res: ", res.data);
    if (res && res.errCode === 0) {
      this.setState({
        clinicsList: res.data,
      });
    } else {
      console.log("Không lấy được danh sách!");
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
              <tbody>
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
                  <th>
                    <FormattedMessage id="admin.manage-clinic.clinics-list.clinic-actions" />
                  </th>
                </tr>
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
                            backgroundImage: `url(${this.state.previewImgURL})`,
                          }}
                          onClick={() => this.openPreviewImage()}
                        ></td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
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
