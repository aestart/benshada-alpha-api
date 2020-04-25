import React, { Component } from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { filterContent } from "../../actions/load";
import { connect } from "react-redux";
// import NotFound from "../Misc/NotFound/NotFound";
import Reviews from "./Reviews";

class Review extends Component {
  renderProductReview = (reviews, productId) => {
    let { orders } = this.props,
      orderedProductIds = [];

    orders.forEach(({ products }) =>
      products.forEach(({ _id }) => {
        orderedProductIds.push(_id);
      })
    );

    return <Reviews reviews={reviews} />;
  };

  renderStars(count) {
    let response = ["", "", "", "", ""],
      i = 0;

    while (i < count) {
      response[i] = i;

      i++;
    }
    return response.map((i) =>
      i === "" ? (
        <FontAwesomeIcon className="text-light mr-1" icon={faStar} />
      ) : (
        <FontAwesomeIcon className="text-primary mr-1" icon={faStar} />
      )
    );
  }

  render() {
    const { i, product, className } = this.props,
      { overallRating, _id, reviews } = product;

    return (
      <div className={`${className} mr-3 rounded-0 text-left pointer`}>
        {this.renderStars(overallRating)}
        <div className="modal-body">
          <div
            className="modal fade"
            id={`reviewModal${i}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="reviewModalLabel"
            aria-hidden="true"
            key={`reviewModal${i}`}
          >
            <div className="modal-dialog modal-xl" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5
                    className="modal-title font-weight-light"
                    id="reviewModalLabel"
                  >
                    Reviews
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
                <div className="modal-body">
                  {this.renderProductReview(filterContent(reviews), _id)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, order }) => ({
  isSignedIn: auth.isSignedIn,
  orders: order,
});

export default connect(mapStateToProps, {})(Review);
