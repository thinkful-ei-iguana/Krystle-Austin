
 // update counter per correct question
 function scoreAndQuestionRender() {
  let scoreAndQuestionHtml = `<form class= "score-and-question-number">
  <h4>Score: ${store.score} out of 5!</h4>
  <h4>Question ${store.currentQuestion +1} of 5</h4>`;
  return scoreAndQuestionHtml;
}


function generateStartPageHtml() {
  return ` 
  <form id="quiz" novalidate>
      <div class="start-quiz">
          <legend>Can You Clash?</legend>
          <button type="submit" id="start"> Start Fireball</button>
      </div> 
  </form>
  `;
}
//ability to run the quiz
function startClashing() {
  $('.quiz-content').html (generateStartPageHtml())
  console.log('Clashing Commenced')
  //when start button activated resetQuizScore and begins rendering quiz

  $('#quiz').on('submit',(e) => {
    e.preventDefault();
    console.log('startbutton activated')
    $('#quiz').remove();
    showNextQuestion();
    
  });
}

function generateQuestion() {
  let i = store.currentQuestion;
  let questions = store.totalQuestions[i]
  let questionHtml = `<form class="question-form">${questions.question}`;

  for (let x = 0; x<questions.options.length; x++) {
    questionHtml += `<label for=${x}><input id= ${x} type="radio" class="choices" name="options" required><p class="questionNames">${questions.options[x]}
    </p></label>`;
  }
questionHtml += `
<button type="submit" class="submitAnswer"> Throw Fireball!</button>
</form>
`;
return questionHtml;

}

//function for when a choice is made (fireball is answer submitted)
function fireballSubmitted() {
  
  $('body').on('submit', '.question-form', (e) => {
    e.preventDefault();
   console.log('submit button working');
  

  let selection = $('.question-form :checked');
  let answer = parseInt(selection.attr('id'));
    console.log(answer);
  let correctAnswer = store.totalQuestions[store.currentQuestion].answer;
    
      if (answer === correctAnswer) {
        correct();
        store.score++;
        //store.currentQuestion++;
      }
        else {
          incorrect(correctAnswer);
         // store.currentQuestion++;
      }
       if (store.currentQuestion < store.totalQuestions.length) {
    store.currentQuestion++;
  }
  });
 
}


//correct answer function
function correct() {
  $('.quiz-content').html(`<h3>Nice fireball Wizard!</h3>`);
  console.log('correct working');
      nextButton();
}

function incorrect(correct) {
  $('.quiz-content').html(
    `<h3>Fireball missed...</h3>
    <p class="question-data">It's actually:</p>
    <p class="question-data">${store.totalQuestions[store.currentQuestion].options[correct]}</p>`);
      nextButton();
      console.log('incorrect working');
  
}

  function nextButton() {
   let nextButtonHtml = `
   <button type="button" class="next-question">Next</button>`;
    $('.quiz-content').append(nextButtonHtml);

    $('.next-question').on('click', (e) => {
    
    $('.quiz-content').empty();

  if(store.currentQuestion < store.totalQuestions.length) {
    showNextQuestion();
  }
    else {
    finalResult();
  }

    
    console.log('next question button worked');
    
    });
      return nextButtonHtml;
  }

//function to render next question
function showNextQuestion() {
   // when user clicks the Next button, move to the next object in the store
  // add if else statement: if there are no more questions left, call function results()  
let questionHtml = generateQuestion();
let scoreAndQuestionHtml = scoreAndQuestionRender();
  $('main').append(scoreAndQuestionHtml);
  $('main').append(questionHtml);
  $('.score').text(`Score: ${store.score}`);
  $('.question-number').text(`Question: ${store.currentQuestion}/${store.totalQuestions.length}`);
}
   


//displays win or lose screen with score (and restart button?)
function finalResult() {
  let resultHtml =$(
    `<div class="results">
      <form id ="restart-quiz">
        <fieldset>
          <legend>You Scored: ${store.score} out of 5
          </legend>
          <div class="restart-button">
           <button type="button" id="restart">Restart Quiz</button>
          </div>
        </fieldset>
      </form>
    </div>`);
    $(".final-result").html(resultHtml);
     
}


//restart the quiz from beginning
function restartClash() {
  $('body').on('click','#restart', (e)=> {
    store.score = 0;
    store.currentQuestion = 0;
    console.log('render score reset working');
    showNextQuestion();
    $('#restart-quiz').remove();
  });
}

function renderClash() {
  restartClash();
  scoreAndQuestionRender();
  fireballSubmitted();
  generateQuestion();
  startClashing();
}

$(renderClash); 

