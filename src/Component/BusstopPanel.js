import React from "react";
import ReactDOM from "react-dom";
import BusstopItem from "./BusstopItem.js";
import Donation from "./Donation.js";
export default class BusstopPanel extends React.Component {
  refreshDonations(bstopid) {
    this.props.refreshDonations(bstopid);
  }

  render() {
    let itemslist = [];

    if (this.props.items.length == 0) {
      itemslist.push(
        <tr>
          <th colSpan="3" className="tempEmpty">
            No busstop found.
          </th>
        </tr>
      );
    } else {
      this.props.items.forEach((item) => {
        itemslist.push(
          <BusstopItem
            key={item.key}
            item={item}
            refreshDonations={this.refreshDonations.bind(this)}
          />
        );
      });
    }

    return (
      <div class="w3-container">
        <table class="w3-table w3-striped">
          <thead>
            <th>
              <div class="w3-card w3-green">
                <h6>Bus stop Id</h6>
              </div>
            </th>
            <th>
              <div class="w3-card w3-light-green">
                <h6>Busstop Name</h6>
              </div>
            </th>
            <th colSpan="2">
              <div class="w3-card w3-lime">
                <h6>Area</h6>
              </div>
            </th>
          </thead>
          <tbody>{itemslist}</tbody>
        </table>
      </div>
    );
  }
}
