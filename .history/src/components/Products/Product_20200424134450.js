import React, { Component } from "react";
import { connect } from "react-redux";

import {
  productDelete,
  productUpdate,
  userUpdateProfile,
} from "../../actions/user";
import { filterContent } from "../../actions/load";
import BenshadaForm from "../BenshadaForm/BenshadaForm";
import { ifSeller } from "../../actions/auth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faBox,
  faPencilAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { cartAdd, cartRemove } from "../../actions/cart";
import CartButton from "../Cart/CartButton";
import Loading from "../Misc/Loading/Loading";
import NotFound from "../Misc/NotFound/NotFound";
import Price from "./Price";

class Product extends Component {
  renderDiscountedPrice = (price, discount) => {
    return discount > 0 ? (
      <>
        <span className="lead font-weight-bold">
          &#x20A6; {price * (1 - discount / 100)}
        </span>
        <br />
        <span className="font-weight-lighter">
          <strike>&#x20A6; {price}</strike>
        </span>
      </>
    ) : (
      <span>&#x20A6; {price}</span>
    );
  };

  renderProductActions = (i, id, product) => {
    let { isSignedIn, user, userUpdateProfile } = this.props,
      saved = (user && user.saved) || [];

    return !isSignedIn || !ifSeller(user && user.type) ? (
      <>
        <button className="btn mr-3">
          {saved.filter(({ _id }) => _id === id).length > 0 ? (
            <FontAwesomeIcon
              className="text-primary"
              onClick={() =>
                userUpdateProfile({
                  saved: saved.filter(({ _id }) => _id !== id).unique(),
                })
              }
              icon={faHeart}
            />
          ) : (
            <FontAwesomeIcon
              className="text-primary"
              onClick={() =>
                userUpdateProfile({ saved: [...saved, product].unique() })
              }
              icon={faHeart}
            />
          )}
        </button>
        <CartButton product={product} />
      </>
    ) : window.location.pathname.includes("user") ? (
      <>
        <button
          className="btn btn-danger mr-3"
          onClick={() => this.props.productDelete(id)}
        >
          <FontAwesomeIcon className="text-primary ml-2" icon={faTrash} />{" "}
          Delete
        </button>
        <button
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`#productUpdateModal${i}`}
          key={`productEdit${i}`}
        >
          <FontAwesomeIcon icon={faPencilAlt} /> Edit
        </button>
      </>
    ) : (
      ""
    );
  };

  renderSrc = ({ src, name }) =>
    src === undefined ? (
      <FontAwesomeIcon icon={faBox} className="fa-6x text-light" />
    ) : (
      <img className="card-img" src={src} alt={name} />
    );

  renderProducts = (products) =>
    products === null ? (
      <Loading />
    ) : products === undefined || products.length < 1 ? (
      <NotFound type="product" />
    ) : (
      <div className="card-columns products my-2">
        {filterContent(products).map((product, i) => {
          let { _id, discountPercentage, name, price } = product,
            productFields = [
              {
                desc: "_id",
                varClass: "input",
                type: "hidden",
                options: [],
                icon: 0,
              },
              {
                desc: "name",
                label: "Name",
                placeholder: "Product Name",
                varClass: "input",
                type: "text",
                options: [],
                row: 1,
                icon: 0,
              },
              {
                desc: "description",
                label: "Description",
                placeholder: "Product Description",
                varClass: "textarea",
                type: "text",
                options: [],
                row: 2,
                icon: 0,
              },
              {
                desc: "price",
                label: "Price",
                varClass: "input",
                type: "number",
                options: [],
                row: 1,
                icon: 1,
                help: "Enter Naira value of price",
              },
              {
                desc: "discountPercentage",
                label: "Discount",
                varClass: "input",
                type: "number",
                options: [],
                row: 2,
                icon: 0,
                help: "Discount in percentage",
              },
            ],
            productButtons = [
              { value: "Upload Changes", className: "btn-primary" },
            ];

          return (
            <>
              <div
                className="card mb-4 product rounded shadow-sm border-0"
                key={`product${_id}`}
              >
                <div className="card-body px-3">
                  <div className="px-3 pb-4">{this.renderSrc(product)}</div>

                  <div className="text-left">
                    <p>
                      <Link to={`/products/?id=${_id}`}>{name}</Link>
                    </p>
                    <p className="lead font-weight-bold">
                      <Price price, discountPercentage)}
                    </p>
                    {this.renderProductActions(i, _id, product)}
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id={`productUpdateModal${i}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby={`productUpdateModalLabel${i}`}
                aria-hidden="true"
                key={`productModal${i}`}
              >
                <div className="modal-dialog modal-xl" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title font-weight-light"
                        id={`productUpdateModalLabel${i}`}
                      >
                        Edit {name}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-left">
                      <BenshadaForm
                        form={`form-product-edit${i}`}
                        onSubmitForm={this.props.productUpdate}
                        className="form"
                        fields={productFields}
                        buttons={productButtons}
                        initialValues={product}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    );

  render() {
    let { title, products, className } = this.props;

    return (
      <div className={`container my-3 text-center ${className}`}>
        <div className="row">
          <div className="col p-0">
            <h4 className="text-left text-uppercase">{title}</h4>
            {this.renderProducts(products)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, order, cart }) => ({
  isSignedIn: auth.isSignedIn,
  user: auth.user,
  orders: order,
  cart,
});

export default connect(mapStateToProps, {
  productDelete,
  productUpdate,
  userUpdateProfile,
  cartAdd,
  cartRemove,
})(Product);
