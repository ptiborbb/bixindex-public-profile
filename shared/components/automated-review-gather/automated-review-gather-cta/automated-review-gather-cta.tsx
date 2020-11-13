import clx from 'classnames';
import React, { FC } from 'react';
import automatedReviewGatherCTAImage from '../../../../public/images/automated-gather-review/automated-review-gather-cta.png';
import classes from './automated-review-gather-cta.module.scss';

export const AutomatedReviewGatherCTA: FC = () => {
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
    <>
      <section className={classes.automatedReviewGatherCTA}>
        <div className={classes.overlay}></div>
        <div className="container">
          <div className="row">
            <div className={clx('col-md-9 col-12', classes.automatedReviewGatherCTAContainer)}>
              <h2>
                Szeretnéd, ha minden héten újabb és újabb értékes ügyfélvéleménnyel gazdagodna a céged?
                <p>Beszéljük meg, hogyan érheted ezt el folyamatos erőfeszítés nélkül.</p>
              </h2>
              <div className={classes.automatedReviewGatherContainer}>
                {/* <DefaultInput placeholder="E-mail" onChange={(e) => this.handleInput('email', e.target.value)} /> */}
                {/* <PrimaryButton onClick={this.askForLastName}>Szeretném ezt</PrimaryButton> */}
              </div>
            </div>
            <div className="col-md-3 col-12">
              <img src={automatedReviewGatherCTAImage} alt="partnerlista" />
            </div>
          </div>
        </div>
      </section>
      {/* <ToastContainer /> */}
      {/* <CTAAction
        lastName={this.state.lastName}
        handleInput={this.handleInput}
        bisnodeCompanyHandler={this.bisnodeCompanyHandler}
        isInfoShow={this.state.isInfoShow}
        hideInfoHandler={this.hideInfoHandler}
        handleMessageSend={this.handleMessageSend}
        loading={this.state.loading}
        inputName="automatedReviewGatherCTA"
      /> */}
    </>
  );
};
