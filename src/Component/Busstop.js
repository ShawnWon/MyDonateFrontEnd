class busstopItem {
  constructor(item) {
    this.info = {};
    this.info.busstopid = item.busstopid;
    this.info.busstopname = item.busstopname;
    this.info.area = item.area;

    this.key = ++busstopItem.key;
  }
}
busstopItem.key = 0;

export default class Busstop {
  constructor() {
    this.busstops = [];
    this.word = "";
    this.area = "";

    fetch("http://ec2-3-20-204-5.us-east-2.compute.amazonaws.com:3000/busstops")
      .then((response) => response.json())
      .then((data) => data.busstops)
      .then((data) => {
        this.state = { allBusstop: data.map((bs) => new busstopItem(bs)) };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  searchBusstop(word) {
    this.word = word;
    this.busstops = this.state.allBusstop;

    this.busstops = this.busstops.filter((item) => {
      return (
        item.info.busstopname.toUpperCase().indexOf(word.toUpperCase()) != -1 ||
        item.info.area.toUpperCase().indexOf(word.toUpperCase()) != -1
      );
    });
    if (word == "") {
      this.busstops = [];
    }
    return this;
  }
}
