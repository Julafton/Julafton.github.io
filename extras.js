function changeMode() {
    let themeS = document.getElementById("theme");
    let p = document.querySelectorAll("p");
    if (themeS.value == "Dark") {
        document.body.style.backgroundColor = "#353535";
        p[0].style.color = "White";
        p[1].style.color = "White";
        p[2].style.color = "White";
        p[3].style.color = "White";
        p[4].style.color = "White";
        localStorage.setItem("theme", "#353535");
    }
    else if (themeS.value == "Light") {
        document.body.style.backgroundColor = "White";
        p[0].style.color = "Black";
        p[1].style.color = "Black";
        p[2].style.color = "Black";
        p[3].style.color = "Black";
        p[4].style.color = "Black";
        localStorage.setItem("theme", "White");
    }
}

window.onload = () => {
    let theme = localStorage.getItem("theme");
    let score = localStorage.getItem("score");
    let p = document.querySelectorAll("p");

    if (theme != null) {
        document.body.style.backgroundColor = theme;
        if (theme == "#353535") {
            document.getElementById("theme").value = "Dark";
            p[0].style.color = "White";
            p[1].style.color = "White";
            p[2].style.color = "White";
        }
        else if (theme == "White") {
            document.getElementById("theme").value = "Light";
            p[0].style.color = "Black";
            p[1].style.color = "Black";
            p[2].style.color = "Black";
        }
    }

    if (score != null) {
        document.getElementById("highscore").textContent = `highscore: ${score}`;
    }
}