import { FC } from 'react';
import partnerListImage from '../../../../public/images/automated-gather-review/partner-list-image.png';
import classes from './partner-list.module.scss';

interface IPartnerListProps {
  id: string;
}

export const PartnerList: FC<IPartnerListProps> = ({ id }) => {
  return (
    <section className={classes.partnerList} id={id}>
      <div className={classes.partnerListOverlay}></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-12">
            <h3>Partnerlista</h3>
            <p>
              A BIX lelke. Ide töltöd fel, és itt frissíted a partnereid listáját. A feltöltés egyszerű, az alapja egy
              sima excel tábla, amit akár havonta frissíthetsz. Nyomon tudod követni, hogy a korábban feltöltött
              partnerekről kaptál-e értékelést és ha igen, mikor és milyet?
            </p>
            <p>Ennyire egyszerű. Te feltöltöd a partnerlistát, mi felmérjük, mit gondolnak rólad az ügyfeleid.</p>
            {/* <div className={classes.partnerListInputContainer}>
                                  <DefaultInput placeholder="E-mail" onChange={(e) => this.handleInput('email', e.target.value)} />
                                  <PrimaryButton onClick={this.askForLastName}>Szeretném ezt</PrimaryButton>
                              </div> */}
            <div className="header-action-container">
              <div className={classes.partnerListBtn}>
                {/* <Link to="#mutasdafolyamatot">
                    <Button>
                      {'Mutasd a mérési folyamatot'}
                    </Button>
                  </Link> */}
              </div>
              <div className={classes.headerBtn_Primary}>
                {/* <PrimaryButton
                    onClick={this.askForLastName}
                    style={{ width: this.state.isMobile ? '100%' : 'unset' }}
                  >
                    {this.state.isMobile ? 'Beszéljük meg a bevezetést' : 'Beszéljük meg a bevezetést'}
                  </PrimaryButton> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <img src={partnerListImage} alt="partnerlista" />
          </div>
        </div>
      </div>
    </section>
  );
};
