import React from "react";
export default class DonationItem extends React.Component {
  render() {
    return (
      <tr style={{ cursor: "pointer" }}>
        <td className="itemTd">{this.props.item.info.donatername}</td>
        <td className="itemTd">{this.props.item.info.donateremail}</td>
        <td className="itemTd">{this.props.item.info.donateamount}</td>
      </tr>
    );
  }
}
