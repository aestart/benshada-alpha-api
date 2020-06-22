import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faStoreAlt,
  faUser,
  faShoppingBag,
  faUserEdit
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Image({
  image, name, size, type, xtraClass, id
}) {
  return (image && image.length === 0) || image === undefined ? (
      <div className={`text-center ${xtraClass}`}>
        <FontAwesomeIcon
          icon={
            {
              store: faStoreAlt,
              product: faBox,
              user: faUser,
              order: faShoppingBag,
              review: faUserEdit
            }[type]
          }
          className={`fa-${size}x text-secondary`}
        />
      </div>
  ) : (
      <div className={`text-center ${xtraClass}`}>
        <Link to={`/${type}s/?id=${id}`}>
          <img className="card-img img-responsive" src={image[0]} alt={name} />
        </Link>
      </div>
  );
}

Image.propTypes = {
  id: PropTypes.string,
  image: PropTypes.array,
  name: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.string,
  xtraClass: PropTypes.string
};

export default Image;
