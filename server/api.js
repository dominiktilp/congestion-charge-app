import express from 'express';
import moment from 'moment';
const router = express.Router();

const vehicleTypes = {
  c: 'CAR',
  b: 'BIKE',
  m: 'MOTORBIKE'
};

const prices = [
  12.0, 5.5, 3.9, 0
];

let payments = [];

function randPrice() {
  return prices[Math.floor(Math.random() * prices.length)];
}

// get info about vehicle
router.get('/vehicle/:vehicleId', (req, res) => {
  const date = moment();
  const data = {
    vehicle: {
      id: req.params.vehicleId,
      type: vehicleTypes[req.params.vehicleId[0].toLocaleLowerCase()],
      daySlots: {
        today: { date: date.format('YYYY-MM-DD'), price: randPrice() },
        tomorrow: { date: date.add(1, 'day').format('YYYY-MM-DD'), price: randPrice() },
        yesterday: { date: date.add(-2, 'day').format('YYYY-MM-DD'), price: randPrice() }
      }
    }
  };
  
  res.json(data);
});

// define the about route
router.post('/vehicle/:vehicleId/payment', (req, res) => {
  
  let data = {
    payment: {
      vehicleId: req.body.vehicleId,
      accountNumber: req.body.accountNumber,
      amount: req.body.amount,
      date: req.body.date,
      state: 'OK'
    },
    errorCode: 0
  };
  
  console.log('PAYMENTS', payments);
  
  if (req.body.cardSecurityCode === '1234') {
    data = {
      payment: {},
      errorCode: 1
    };
  } if (payments.filter((el) => {
    return el.vehicleId === data.payment.vehicleId && el.date === data.payment.date;
  }).length !== 0) {
    data = {
      payment: {},
      errorCode: 2
    };
  } else {
    payments.push(data.payment);
  }
  
  res.json(data);
});

export default router;
