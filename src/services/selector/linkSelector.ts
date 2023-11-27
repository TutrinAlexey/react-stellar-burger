type TLinkSelector = {
  link: {
    burgerActive: boolean;
    orderListActive: boolean;
    accountActive: boolean;
  };
};

export const burgerStatus = (state: TLinkSelector) => state.link.burgerActive;
export const orderListStatus = (state: TLinkSelector) =>
  state.link.orderListActive;
export const accountStatus = (state: TLinkSelector) => state.link.accountActive;
