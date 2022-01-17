import { Fragment } from 'react';

import MainNavigation from './MainNavigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe('pk_test_51K5KCYJnr3G3bhPBbGXlSm4ZbthaOxTpnS7teMhEtTH2TX6I85WzNNDP13mwtOztAxXeaKv5meRvO6XwVl6ngVam00RIWzUDxk');

const Layout = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <MainNavigation />
      <main>{props.children}</main>
    </Elements>
  );
};

export default Layout;
