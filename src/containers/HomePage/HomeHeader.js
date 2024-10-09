import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {
        console.log('check props', this.props)
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img className='header-logo' src={logo} />
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="home-header.specialty" />
                                </b></div>
                                <div className='sub-title' >
                                    <FormattedMessage id="home-header.search-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="home-header.health-facility" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.select-room" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="home-header.doctor" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.select-doctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div><b>
                                    <FormattedMessage id="home-header.fee" />
                                </b></div>
                                <div className='sub-title'>
                                    <FormattedMessage id="home-header.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner.medical-platform" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner.comprehensive-healthcare" />
                        </div>
                        <div className='search'>
                            <i className="fas fa-search"></i>
                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='option'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="far fa-hospital"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.specialist-consultation" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.remote-consultation" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.general-check-up" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.medical-tests" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.mental-health" />
                                </div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-nurse"></i></div>
                                <div className='text-child'>
                                    <FormattedMessage id="options.dental-examination" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
