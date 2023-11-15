import PropTypes from "prop-types";

export const ingredientPropType = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  _constId: PropTypes.string,
});
