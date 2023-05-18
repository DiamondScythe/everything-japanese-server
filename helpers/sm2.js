function sm2Algorithm(q, N, EF, I) {
  try {
    if (q >= 3) {
      // correct response
      if (N === 0) {
        I = 1;
      } else if (N === 1) {
        I = 6;
      } else {
        I = Math.round(I * EF);
      }
      N++;
    } else {
      // incorrect response
      N = 0;
      I = 1;
    }
    EF = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (EF < 1.3) {
      EF = 1.3;
    }
    return { N, EF, I };
  } catch (err) {
    console.log(err);
  }
}

//export the sm2algorithm function
module.exports = sm2Algorithm;
