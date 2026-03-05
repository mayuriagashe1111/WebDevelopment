document.getElementById("greetButton").addEventListener("click", function () {
    let name = document.getElementById("nameInput").value;
    let header = document.getElementById("headerText");

    if (name.trim() !== "") {
        header.textContent = "Hello, " + name;     // Change Greeting Text
    } else {
        header.textContent = "Hello";
    }
});

// change box colors
document.getElementById("redBox").addEventListener("click", function () {
    this.style.backgroundColor = "red";
});

document.getElementById("blueBox").addEventListener("click", function () {
    this.style.backgroundColor = "blue";
});

document.getElementById("greenBox").addEventListener("click", function () {
    this.style.backgroundColor = "green";
});

document.getElementById("yellowBox").addEventListener("click", function () {
    this.style.backgroundColor = "yellow";
});
