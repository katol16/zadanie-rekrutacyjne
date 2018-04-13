var questions = ["Which company do you think is the greates?", "Which social media do you think is the greates?", "Who is the best CEO","What is the best country to live in?"],
answears = [ ["Rival Organisation","Legit Company","Evil Corporation","Opponent Business"],["Facebook","LinkedIn","Twitter"],["Elon Musk","Bill Gates","Mark Zuckerberg"], ["Norway","Poland","USA","Canada","Denmark"] ],

question = document.querySelector(".question");
counter = 0;
nextBtn = document.querySelector(".next");
backBtn = document.querySelector(".back"); 
progressBar = document.getElementById("progressBar");
progressBar.max = questions.length;

nextBtn.addEventListener("click", nextQuestion);
backBtn.addEventListener("click", previousQuestion);

// load all questions
for( var j=0; j <= answears.length - 1; j++ ) {
    var answearContainer = document.createElement("div");
    var answearList = document.querySelector(".answears");
    answearList.appendChild(answearContainer);
    answearContainer.classList = "answearContainer";

    for ( var i=0; i <= answears[j].length - 1; i++ ) {
        var answearBox = document.createElement("div");
        answearBox.classList = "answear";
        answearBox.innerHTML = answears[j][i];
        answearContainer.appendChild(answearBox);
    }
    checkAnswear();
}

function nextQuestion() {
    if ( counter == questions.length - 1 ) {
        question.innerHTML = "There is no more questions. Thank You for your answears!";
        nextBtn.disabled = true;
        backBtn.disabled = true;        
        answearList.style.display = "none";
        progressBar.value = questions.length; 
    } else {
        nextBtn.disabled = true;
        goToNextOrPreviousQuestion(1);
    }
};


function previousQuestion() { 
    if ( counter == 0 ) {
        backBtn.disabled = true;
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = false;
        goToNextOrPreviousQuestion(-1);
    }
};

function goToNextOrPreviousQuestion(x) {
    counter = counter + x;
    question.innerHTML = questions[counter];    
    backBtn.disabled = false;
    progressBar.value = counter; 

    for ( var i=0; i <= answears[counter].length - 1; i++ ) {      
        var answearBox = document.createElement("div");
        answearBox.classList = "answear";
        answearContainer.classList = "answearContainer";
        answearBox.innerHTML = answears[counter][i];
        answearList.appendChild(answearContainer);
    }
    checkAnswear();
}

function checkAnswear() {

    var answearContainerDiv = document.querySelectorAll(".answearContainer"); 
    $(answearContainerDiv).removeClass("show");
    $(answearContainerDiv[counter]).toggleClass("show");

    var answearContainerChildren = answearContainerDiv[counter].children;

    for (var i=0; i<answearContainerChildren.length; i++ ) {
        answearContainerChildren[i].addEventListener("click", checkYourAnswear(i));
    }

    function checkYourAnswear(i) {
        return function() {
            $(answearContainerChildren).removeClass("yourAnswear");
            $(answearContainerChildren[i]).addClass("yourAnswear");
            nextBtn.disabled = false;  
        }     
    };
    if ( $(answearContainerChildren).hasClass("yourAnswear") == true ) {
       nextBtn.disabled = false;   
    }
};
