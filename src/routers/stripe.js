const express = require("express");

const stripe = require("stripe")("sk_test_rCmXib3tVkLG8abCd8UlkNBR00HsnwkALn");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("test");
  console.log(req.body);
  (async () => {
    console.log("test");
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "EUR",
      source: "tok_visa",
      receipt_email: "jenny.rosen@example.com"
    });
    console.log(charge);
  })();
});

module.exports = router;
