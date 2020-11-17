import React, { FC } from 'react';
import { SectionHeading } from '../../heading/section-heading/section-heading';
import classes from './we-know-exactly.module.scss';

export const WeKnowExactly: FC = () => {
  // state = {
  //   email: '',
  //   lastName: '',
  //   isInfoShow: '',
  //   companyName: '',
  //   taxNumber: '',
  //   source: 'Marketing kampány',
  //   loading: false,
  // };

  // handleInput = (field, value) => {
  //   this.setState({
  //     [field]: value,
  //   });
  // };

  // handleMessageSend = () => {
  //   this.setState({ loading: true });
  //   sendContactInfo(this.state)
  //     .then(res => {
  //       if (res.data.ResponseStatus === 'success') {
  //         this.setState({ loading: false });
  //         this.hideInfoHandler(true);
  //         toast.success('Érdeklődés sikeresen elküldve! Köszönjük!', toastConfig);
  //         ReactGA.event({
  //           category: 'Precontact',
  //           action: 'send',
  //           label: 'Interest form sent',
  //         });
  //       } else {
  //         toast.error('Az érdeklődést sajnos nem sikerült elküldeni! Kérjük próbálja később', toastConfig);
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       this.setState({ loading: false });
  //       this.hideInfoHandler(true);
  //       toast.error('Az érdeklődést sajnos nem sikerült elküldeni! Kérjük próbálja később', toastConfig);
  //     });
  // };

  // askForLastName = () => {
  //   if (this.state.email === '') {
  //     toast.error('Kérjük adjon meg egy email címet az érdeklődés elküldéséhez', toastConfig);
  //     return;
  //   }
  //   if (
  //     !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
  //       this.state.email,
  //     )
  //   ) {
  //     toast.error('Kérjük adjon meg egy érvényes email címet az érdeklődés elküldéséhez!', toastConfig);
  //     return;
  //   }
  //   this.setState({
  //     isInfoShow: true,
  //   });
  // };

  // hideInfoHandler = restrictContactSend => {
  //   if (restrictContactSend !== true) {
  //     sendContactInfo(this.state)
  //       .then(res => {
  //         if (res.data.ResponseStatus === 'success') {
  //           toast.success('Érdeklődés sikeresen elküldve! Köszönjük!', toastConfig);
  //         } else {
  //           toast.error('Az érdeklődést sajnos nem sikerült elküldeni! Kérjük próbálja később', toastConfig);
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         toast.error('Az érdeklődést sajnos nem sikerült elküldeni! Kérjük próbálja később', toastConfig);
  //       });
  //   }
  //   this.setState({
  //     isInfoShow: false,
  //   });
  // };

  // bisnodeCompanyHandler = companyData => {
  //   for (let key in companyData) {
  //     this.setState({ [key]: companyData[key] });
  //   }
  // };

  return (
    <section className={classes.weKnowExactly}>
      <div className={classes.overlay}></div>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <SectionHeading>
              Mi pontosan tudjuk, hogy érdemes kérdezni, Neked annyi a dolgod, hogy jól használd a kimutatást
            </SectionHeading>
          </div>
        </div>
        <div className="row mt-40">
          <div className="col-md-4 offset-md-2">
            {/* <DefaultInput placeholder="Email cím" onChange={(e) => this.handleInput('email', e.target.value)} /> */}
          </div>
          <div className="col-md-4">
            {/* <PrimaryButton onClick={this.askForLastName}>Kérdezzük meg az ügyfeleimet</PrimaryButton> */}
          </div>
        </div>
      </div>
      {/* <ToastContainer />
      <CTAAction
        lastName={this.state.lastName}
        handleInput={this.handleInput}
        bisnodeCompanyHandler={this.bisnodeCompanyHandler}
        isInfoShow={this.state.isInfoShow}
        hideInfoHandler={this.hideInfoHandler}
        handleMessageSend={this.handleMessageSend}
        loading={this.state.loading}
        inputName="weKnowExactlyCTA"
      /> */}
    </section>
  );
};
