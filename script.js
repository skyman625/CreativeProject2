function onClick(e) {
  let resultAge = "";
  let resultGender = "";
  let resultNationality = "";
  e.preventDefault();
  // get form values
  let name = document.getElementById('name').value;

  // check if name is empty
  if (name === "") {
    name = "random";
  }

  // setup URL
  let url = "https://api.agify.io?name=" + name +"&country_id=US";
  // call API
  fetch(url)
    .then(function(responseAge) {
      // make sure the request was successful
      if (responseAge.status != 200) {
        return {
          text: "Error calling the names API service: " + responseAge.statusText
        }
      }
      return responseAge.json();
    })
    .then(function(json) {
      // update DOM with responseAge
      resultAge = json.age;
        let url = "https://api.genderize.io?name=" + name +"&country_id=US";
        // call API
        fetch(url)
          .then(function(responseGender) {
            // make sure the request was successful
            if (responseGender.status != 200) {
              return {
                text: "Error calling the names API service: " + responseGender.statusText
              }
            }
            return responseGender.json();
          })
          .then(function(json) {
            resultGender = json.gender;
            resultGenderProbability = json.probability;
            updateResult(resultAge, resultGender, resultGenderProbability);
          })


    });
    url = "https://api.nationalize.io?name=" + name;
    fetch(url)
    .then(function(responseNationality) {
      if (responseNationality.status != 200) {
        return {
          text: "Error calling the names API service: " + responseAge.statusText
        }
      }
      return responseNationality.json();
    })
    .then(function(json) {
      responseNationality = json.country[0].country_id;
      let resultNationalityProbability = json.country[0].probability;
      updateNationality(responseNationality, resultNationalityProbability);
    });

}

function updateResult(age, gender, probability) {
  document.getElementById('resultAge').textContent = "Age: " + age;
  document.getElementById('resultGender').textContent = "Gender: " + gender;
  document.getElementById('resultProbabilityGender').textContent = "Probability: " + probability * 100 + "%";
}

function updateNationality(nationality, probability) {
  document.getElementById('resultNationality').textContent = "Nationality: " + nationality;
  document.getElementById('resultProbabilityNationality').textContent = "Probability: " + probability * 100 + "%";
}

document.getElementById('Get Info').addEventListener('click', onClick);
