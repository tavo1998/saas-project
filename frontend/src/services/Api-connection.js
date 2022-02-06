async function TrainModel() {
  await fetch("http://localhost:8080/train-model", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      sepal_length: "5.8",
      sepal_width: "2.7",
      petal_length: "5.1",
      petal_width: "1.9",
    }),
  }).then(res => res.json());
}

export { TrainModel };
