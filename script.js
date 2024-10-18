const passwords = ["banana", "apple", "mango", "orange", "grape"];
const password = passwords[Math.floor(Math.random() * passwords.length)];
let attempts = 0;

const clues = [
    "The password is a type of fruit.",
    "This fruit is often associated with tropical regions.",
    "This fruit is known for its vibrant yellow color."
];

document.getElementById("submit").addEventListener("click", function() {
    const guess = document.getElementById("guess").value.toLowerCase();
    let feedback = document.getElementById("feedback");

    if (guess === password) {
        feedback.textContent = "Congratulations! You've guessed the password!";
    } else {
        if (attempts < clues.length) {
            feedback.textContent = "That's not it. Try again!";
            attempts++;
            document.getElementById("clue").textContent = clues[attempts - 1];
        } else {
            feedback.textContent = "You've used all your attempts. The password was: " + password;
            document.getElementById("submit").disabled = true;
        }
    }

    document.getElementById("guess").value = ""; // Clear the input
});
