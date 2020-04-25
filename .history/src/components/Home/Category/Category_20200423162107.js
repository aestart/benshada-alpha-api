import React, { Component } from "react";
import Product from "../../Products/Product";

export default class Category extends Component {
  render() {

    const {reversed} = this.props

    return (
      <div className="container-fluid my-3 bg-white h-100">
        <div className={`row ${reversed ? } flex-row-reverse h-100 align-items-center`}>
          <div className="col-12 col-md-3 col-lg- bg-warning p-4">
            <h5>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</h5>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto officia porro ea quas perferendis recusandae labore
              soluta eveniet? A, earum quod nulla qui similique praesentium
              architecto deleniti eaque est laboriosam.
            </p>
            <button className="btn btn-outline-danger rounded-pill mt-3">
              Shop Now
            </button>
          </div>
          <div className="col">
            <div className="row">
              <Product />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
