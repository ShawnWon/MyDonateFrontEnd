import React from "react";
import ReactDOM from "react-dom";
import DonationItem from "./DonationItem.js";
import Donation from "./Donation.js";
import "w3-css/w3.css";
export default class DonateDetail extends React.Component {
  render() {
    var target = 700;
    var subtotal = 0;
    var gap = target - subtotal;
    let itemslist = [];
    let detailview = ReactDOM.findDOMNode(this.refs.donateDetailView);

    if (this.props.currentBSid != 0) {
      detailview.style.display = "block";
    } else {
      if (detailview != null) detailview.style.display = "none";
    }

    if (this.props.items.length == 0) {
      target = 700;
      subtotal = 0;
      gap = target - subtotal;
      itemslist.push(
        <tr>
          <th colSpan="3" className="tempEmpty">
            No donation found.
          </th>
        </tr>
      );
    } else {
      target = 700;
      subtotal = this.props.items.reduce(
        (total, obj) => parseInt(obj.info.donateamount) + total,
        0
      );
      if (subtotal < target) gap = target - subtotal;
      else gap = "This stop has met the target.";
      this.props.items.forEach((item) => {
        itemslist.push(<DonationItem key={item.key} item={item} />);
      });
    }

    return (
      <div ref="donateDetailView" className="donateForm">
        <h3 style={{ "text-align": "center" }}>Busstop Status</h3>
        <hr />
        <div class="w3-third">
          <div class="w3-card w3-green">
            <h6>The target amount to meet: $ {target}</h6>
          </div>
        </div>
        <div class="w3-third">
          <div class="w3-card w3-light-green">
            <h6>Total amount raised by now:$ {subtotal}</h6>
          </div>
        </div>
        <div class="w3-third">
          <div class="w3-card w3-lime">
            <h6>Gap left to meet the target: $ {gap}</h6>
          </div>
        </div>

        <table class="w3-table w3-striped">
          <thead>
            <th className="itemTd">Donater Name</th>
            <th className="itemTd">Donater Email</th>
            <th className="itemTd">Amount</th>
          </thead>
          <tbody>{itemslist}</tbody>
        </table>
      </div>
    );
  }
}
