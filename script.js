function onClick(e) {
    e.preventDefault();
    // get form values
    let number = document.getElementById("number").value;
    //let s = document.getElementById('selector');
    //let type = s.options[s.selectedIndex].value;
  
    let url = "";
    // check if number is empty
    if (number === "") {
      number = "1";
      url = "http://jservice.io/api/random/?" + number + "?json";
    }

    else {
        url = "http://jservice.io//api/category?id=" + number;
        console.log("http://jservice.io//api/category?id=" + number);
    }

    
    // call API
    fetch(url)
      .then(function(response) {
          console.log(response);
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      })
      .then(function(json) {
        // update DOM with response

        if (json.clues) {
            let randNum = Math.floor(Math.random() * json.clues.length)
            let questions = json.clues[randNum].question;
            updateResultQuestion(questions);
            updateResultAnswer("Answer: " + json.clues[randNum].answer);
            document.getElementById('answerShown').textContent = "";
        }
        else {
            updateResultQuestion(json[0].question);
            updateResultAnswer("Answer: " + json[0].answer);
            document.getElementById('category').textContent = "Category: " + json[0].category.title;
            document.getElementById('answerShown').textContent = "";
            document.getElementById('idsaver').textContent = "Current category ID: " + json[0].category.id;
        }

        
      });
  }

  function onClickAnswerButton(e) {
    e.preventDefault();
    // get form values
    let answer = document.getElementById("answer").textContent;
    document.getElementById('answerShown').textContent = answer;
  }
  
  function updateResultQuestion(info) {
    document.getElementById('question').textContent = info;
  }
  
  function updateResultAnswer(info) {
    document.getElementById('answer').textContent = info;
  }
  
  document.getElementById('woo').addEventListener('click', onClick);
  document.getElementById("answerButton").addEventListener('click', onClickAnswerButton);

  /*
              <p></p>
            <select id="selector">
                <option value="trivia">Trivia</option>
                <option value="math">Math</option>
                <option value="date">Date</option>
                <option value="year">Year</option>
            </select>

*/