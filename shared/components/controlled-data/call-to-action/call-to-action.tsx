import React, { FC } from 'react';
import classes from './call-to-action.module.scss';

interface ICallToAction {
  title?: string;
  bestCustomerExperience?: string;
  buttonLink?: string;
  buttonText?: string;
  needInput?: boolean;
  handler?: () => void;
}

export const CallToAction: FC<ICallToAction> = ({
  bestCustomerExperience,
  // buttonLink,
  // buttonText,
  // handler,
  needInput,
  title,
}) => {
  // state = {
  //   email: '',
  //   firstname: '',
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
  //           label: 'Interestform sent',
  //         });
  //       } else {
  //         toast.error('Az érdeklődést sajnos nem sikerült elküldeni! Kérjük próbálja később', toastConfig);
  //       }
  //     })
  //     .catch(() => {
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
  //   if (!restrictContactSend) {
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
    <section className={classes.callToAction}>
      <div className="container">
        {!needInput && (
          <div className="row">
            <div className={['col-12', classes.callToActionContainer].join(' ')}>
              <h2>{title}</h2>
            </div>
          </div>
        )}
        {needInput && (
          <div className="row">
            <div className={['col-12 col-md-6', classes.titleContainer].join(' ')}>
              <h2>{title}</h2>
            </div>
            <div className={['col-12 col-md-6 mobile-margin-top-30', classes.inputContainer].join(' ')}>
              {/* <DefaultInput placeholder="Email-cím" onChange={(e) => this.handleInput('email', e.target.value)} /> */}
              {/* <PrimaryButton onClick={this.askForLastName}>Küldés</PrimaryButton> */}
            </div>
          </div>
        )}
      </div>
      {
        !needInput && !bestCustomerExperience && <></>
        // <PrimaryButton>
        //   <Link to={`${buttonLink}`}>{buttonText}</Link>
        // </PrimaryButton>
      }
      {!needInput && bestCustomerExperience && (
        <></>
        // <BestCustomerExperienceButton onClick={handler}>{buttonText}</BestCustomerExperienceButton>
      )}
      {/* <ToastContainer />
      <CTAAction
        lastName={this.state.lastName}
        handleInput={this.handleInput}
        bisnodeCompanyHandler={this.bisnodeCompanyHandler}
        isInfoShow={this.state.isInfoShow}
        hideInfoHandler={this.hideInfoHandler}
        handleMessageSend={this.handleMessageSend}
        loading={this.state.loading}
        inputName="mainPageCTA"
      /> */}
    </section>
  );
};
