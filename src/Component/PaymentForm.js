import React from "react";
export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="paymentForm" class="w3-card">
        <div class="w3-green">
          <h4 style={{ textAlign: "center" }}>Please input card number:</h4>
        </div>
        <table class="w3-table w3-striped">
          <tbody>
            <tr>
              <th>Holder Name</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th>Card Number</th>
              <td>
                <input type="text" />
              </td>
            </tr>
            <tr>
              <th>CVV code</th>
              <td>
                <input type="text" />
              </td>
            </tr>
          </tbody>
        </table>
        <button
          class="w3-btn w3-light-green"
          margin-right="50px"
          onClick={() => this.props.callback("ok")}
        >
          OK
        </button>
        <button
          class="w3-btn w3-lime w3-margin-left"
          onClick={() => this.props.callback("cancel")}
        >
          Cancel
        </button>
      </div>
    );
  }
}
