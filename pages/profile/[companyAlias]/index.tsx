import Axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Page from '../../index';
import { mockData } from '../../../shared/data/mockData';

export default Page;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ companyAlias: string }>,
): Promise<unknown> {
  const host = context?.req?.headers?.host;

  const {
    params: { companyAlias },
  } = context;

  const instance = Axios.create({ baseURL: `http://${host}/api` });
  const profile = await instance
    .get(`/public-profiles/${companyAlias}?by=ALIAS`)
    .then((res) => res.data)
    .catch((err) => {
      // console.log({ err });
      return null;
    });

  console.log({ profile });

  return {
    props: {
      publicProfile: mockData(),
      profile,
    }, // will be passed to the page component as props
  };
}
