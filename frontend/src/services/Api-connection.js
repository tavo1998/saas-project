async function TrainModel() {
  return await fetch("http://localhost:8080/train-model", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
}

async function GetModelInfo() {
  return await fetch("http://localhost:8080/model-info", {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      if (response.status === 500) {
        return false;
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

async function Predict(body) {
  return await fetch("http://localhost:8080/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
}

async function GetAllFlowers() {
  return await fetch("http://localhost:8080", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

async function AddFlower(body) {
  return await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

export { TrainModel, GetModelInfo, Predict, GetAllFlowers, AddFlower };
