class donationItem {
  constructor(item) {
    this.info = {};
    this.info.busstopid = item.busstopid;
    this.info.donatername = item.donatername;
    this.info.donateamount = item.donateamount;
    this.info.donateremail = item.donateremail || "Anonymous";
    this.key = ++donationItem.key;
  }
}
donationItem.key = 0;

export default class Donation {
  constructor() {
    //this.allDonations = DBservices.getAllDonations().map(
    //(dn) => new donationItem(dn)
    //);

    this.donations = [];
    this.bstopid = "";

    fetch(
      "http://ec2-3-20-204-5.us-east-2.compute.amazonaws.com:3000/donations"
    )
      .then((response) => response.json())
      .then((data) => data.donations)
      .then((data) => {
        this.state = { allDonations: data.map((dn) => new donationItem(dn)) };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addDonationItem(item) {
    if (item.donateamount != 0) {
      let newItem = new donationItem(item);

      //Talk to api to update changes
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      };
      fetch(
        "http://ec2-3-20-204-5.us-east-2.compute.amazonaws.com:3000/donations",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (response.success === true) {
            this.state.allDonations.push(newItem);
            this.donations = this.state.allDonations.filter((it) => {
              return it.info.busstopid == item.busstopid;
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return this;
  }

  refreshDonations(bstopid) {
    this.bstopid = bstopid;
    this.donations = this.state.allDonations;

    this.donations = this.donations.filter((item) => {
      return item.info.busstopid == bstopid;
    });
    return this;
  }
}
