$(document).ready(function () {

    var playerLetter = "";
    var compLetter = "";

    var spaces = document.getElementsByClassName("col");
    var moves = ["", "", "", "", "", "", "", "", ""];
    var count = 0;

    var wonGame = false;

    var win = 1;
    var loss = 1;
    var tie = 1;

    var showWin = $("#win");
    var showLoss = $("#loss");
    var showTie = $("#tie");

    function clearRadioButtons() {
        $('input[name="piece"]').prop('checked', false);
    }

    clearRadioButtons();

    function disableGameboard() {
        $('#gameboard').addClass("disabled");
    }

    disableGameboard();

    function enableGameboard() {
        $('#gameboard').removeClass("disabled");
    }

    function disableRadioButtons() {
        $('input[name="piece"]').prop('disabled', true);
    }

    function enableRadioButtons() {
        $('input[name="piece"]').prop('disabled', false);
    }

    function clearGameboard() {
        moves = ["", "", "", "", "", "", "", "", ""];
        $(spaces).text("");
        count = 0;
        clearRadioButtons();
        enableRadioButtons();
        disableGameboard();
        playerLetter = "";
        compLetter = "";
        wonGame = false;
    }

    function pickPlayerLetter() {
        playerLetter = $("input[name=piece]:checked").val();

        if (playerLetter == "x") {
            compLetter = "o";
        } else {
            compLetter = "x";
        }
    }

    $('input').click(function () {
        pickPlayerLetter();
        disableRadioButtons();
        enableGameboard();
    });

    function computerMove() {
        var taken = false;

        while (taken === false && count < 5) {
            var aMove = (Math.random() * 8).toFixed();
            var move = $("#" + aMove);

            if (move.text() === "") {
                taken = true;
                moves[aMove] = compLetter;
                move.text(compLetter);
                winningGame(moves, compLetter);

                if (wonGame === true) {
                    showLoss.text(loss++);
                    clearGameboard();
                }
            } 
        }
    }

    function playerMove(moveLetter, id) {
        var space = $("#" + id);

        if (space.text() === "") {
            moves[id] = moveLetter;
            space.text(moveLetter);
            winningGame(moves, moveLetter);

            if (wonGame === true) {
                showWin.text(win++);
                clearGameboard();
            } else if (wonGame === false) {
                count++;
                computerMove();
            }
        }

        if (wonGame === false && count === 5) {
                showTie.text(tie++);
                clearGameboard();
        }
    }

    function winningGame(moves, move) {
        if (moves[0] === move && moves[1] === move && moves[2] === move) {
            wonGame = true;
        } else if (moves[3] === move && moves[4] === move && moves[5] === move) {
            wonGame = true;
        } else if (moves[6] === move && moves[7] === move && moves[8] === move) {
            wonGame = true;
        } else if (moves[0] === move && moves[3] === move && moves[6] === move) {
            wonGame = true;
        } else if (moves[1] === move && moves[4] === move && moves[7] === move) {
            wonGame = true;
        } else if (moves[2] === move && moves[5] === move && moves[8] === move) {
            wonGame = true;
        } else if (moves[0] === move && moves[4] === move && moves[8] === move) {
            wonGame = true;
        } else if (moves[2] === move && moves[4] === move && moves[6] === move) {
            wonGame = true;
        } else {
            wonGame = false;
        }
    }

    $(spaces).click(function () {
        var selection = $(this).attr('id');
        playerMove(playerLetter, selection);
    });

}); // end document ready