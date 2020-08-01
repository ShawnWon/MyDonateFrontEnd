module.exports = (req, res) => {
  const donate = req.body.info;

  if (donate.donateamount === 0) {
    return res.sendStatus(409);
  }

  return res.status(201).send({
    info: "Successfully Added.",
  });
};
