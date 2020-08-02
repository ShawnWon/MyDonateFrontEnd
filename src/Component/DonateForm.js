import React from "react";
import ReactDOM from "react-dom";
import PaymentForm from "./PaymentForm";
export default class DonateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      iteminfo: null,
    };
  }

  proceedDonate(action) {
    var item = this.state.iteminfo;
    let addForm = ReactDOM.findDOMNode(this.refs.addForm);
    if (action == "ok") {
      this.props.addDonations(item);
      this.setState({ showDialog: false });
      //This is for successfully donation
      let tips = ReactDOM.findDOMNode(this.refs.tips);
      tips.style.display = "block";
      setTimeout(function () {
        tips.style.display = "none";
      }, 1000);
    } else {
      item.donateamount = 0;
      this.setState({ showDialog: false });
    }
    addForm.reset();
    this.state.showDialog = false;
  }

  handlerAddClick(evt) {
    evt.preventDefault();

    let item = {};
    let addForm = ReactDOM.findDOMNode(this.refs.addForm);
    item.busstopid = this.props.currentBSid;
    item.donatername = addForm.querySelector("#donateAddName").value.trim();
    item.donateamount = addForm.querySelector("#donateAddAmount").value.trim();
    item.donateremail = addForm.querySelector("#donateAddEmail").value.trim();

    if (item.busstopid == "0") {
      let tips = ReactDOM.findDOMNode(this.refs.tipsNoBS);
      tips.style.display = "block";
      setTimeout(function () {
        tips.style.display = "none";
      }, 1000);
      return;
    }
    /*
     *validate form
     */
    if (item.donatername == "" || item.age == "") {
      let tips = ReactDOM.findDOMNode(this.refs.tipsUnDone);
      tips.style.display = "block";
      setTimeout(function () {
        tips.style.display = "none";
      }, 1000);
      return;
    }
    //validate number input
    let numReg = /^\d+$/;
    if (!numReg.test(item.donateamount) || parseInt(item.age) > 1000) {
      let tips = ReactDOM.findDOMNode(this.refs.tipsUnAge);
      tips.style.display = "block";
      setTimeout(function () {
        tips.style.display = "none";
      }, 1000);
      return;
    } else {
      item.donateamount = parseInt(item.donateamount);
    }

    this.setState({ showDialog: true });
    this.setState({ iteminfo: item });
  }

  render() {
    let formview = ReactDOM.findDOMNode(this.refs.donateFormView);
    if (this.props.currentBSid != 0) {
      formview.style.display = "block";
    } else {
      if (formview != null) formview.style.display = "none";
    }

    return (
      <div ref="donateFormView" className="donateForm">
        <div style={{ "text-align": "center" }} class="w3-cell-middle">
          <h3>Add Donation</h3>
          <hr />
          <form ref="addForm" className="addForm">
            <div class="w3-card w3-green">
              <label for="donateAddName" style={{ display: "block" }}>
                Name
              </label>
              <input
                ref="addName"
                id="donateAddName"
                type="text"
                placeholder="Your Name"
                class="w3-input"
              />
            </div>
            <div class="w3-card w3-light-green">
              <label for="donateAddAmount" style={{ display: "block" }}>
                Amount
              </label>
              <input
                ref="addAmount"
                id="donateAddAmount"
                type="text"
                placeholder="Input Your donate amount(0-1000)"
                class="w3-input"
              />
            </div>

            <div class="w3-card w3-lime">
              <label for="donateAddEmail" style={{ display: "block" }}>
                Email(Optional)
              </label>
              <input
                ref="addEmail"
                id="donateAddEmail"
                type="text"
                placeholder="Your Email"
                class="w3-input"
              />
            </div>
            <p ref="tips" className="tips">
              Submit Successfully
            </p>
            <p ref="tipsUnDone" className="tips">
              Please input a name.
            </p>
            <p ref="tipsUnAge" className="tips">
              Please input a valid amount number.
            </p>
            <p ref="tipsNoBS" className="tips">
              Please select a bus stop firstly.
            </p>
            <div>
              <br />
              <button
                class="w3-btn w3-green"
                onClick={this.handlerAddClick.bind(this)}
              >
                Submit
              </button>
              {this.state.showDialog ? (
                <PaymentForm callback={this.proceedDonate.bind(this)} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
