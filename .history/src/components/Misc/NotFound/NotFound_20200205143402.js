import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faStoreAlt,
  faShoppingBag,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ContainerDimensions from "react-container-dimensions";

import "../Misc.css";

export default function NotFound(props) {
  const { type } = props;
  return (
    <ContainerDimensions>
      {({ height, width }) => (
        <div
          className="text-center pt-4 v-align"
          style={{ height: height * 0.8, width }}
        >
          <FontAwesomeIcon
            icon={
              {
                product: faBox,
                store: faStoreAlt,
                order: faShoppingBag,
                review: faUserEdit
              }[type]
            }
            className="fa-7x text-primary my-2"
          />
          <h4 className="mb-2">No {type}s found</h4>
          {
            {
              product: window.location.href.includes("user") ? (
                <span
                  className="pointer text-primary"
                  data-toggle="modal"
                  data-target="#productModal"
                >
                  Upload one
                </span>
              ) : (
                <Link
                  to={`/${type}s`}
                  className="btn btn-primary text-white text-capitalize"
                >
                  Shop {type}s
                </Link>
              ),
              store: (
                <Link
                  to={`/${type}s`}
                  className="btn btn-primary text-white text-capitalize"
                >
                  Shop {type}s
                </Link>
              )
            }[type]
          }
        </div>
      )}
    </ContainerDimensions>
  );
}
