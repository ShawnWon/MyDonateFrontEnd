import React from "react";
import ReactDOM from "react-dom";
export default class BusstopItem extends React.Component {
  detailClick() {
    let bar = ReactDOM.findDOMNode(this.refs.detailButton);
    let value = bar.id;
    this.props.refreshDonations(value);
  }

  render() {
    return (
      <tr style={{ cursor: "pointer" }}>
        <td>{this.props.item.info.busstopid}</td>
        <td>{this.props.item.info.busstopname}</td>
        <td>{this.props.item.info.area}</td>
        <td>
          <a>
            <button
              id={this.props.item.info.busstopid}
              ref="detailButton"
              onClick={this.detailClick.bind(this)}
              class="w3-btn w3-green"
            >
              Go
            </button>
          </a>
        </td>
      </tr>
    );
  }
}
