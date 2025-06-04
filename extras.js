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

async function second_repeat() {
    while(Game.gameRunning) {
        switch(Game.status) {
            case "Wheelie":
                Game.score += 1 * Game.multiplier;
                break;
            case "Scraping":
                Game.score += 2 * Game.multiplier;
                break;
        }

        await Game.sleep(1000);
    }
}

function changeBike() {
    let newbike = document.getElementById("bikeselect").value;

    if (Game.gameRunning == false) {
        if (newbike == "derbisenda") {
            Bike = new bike(100, "derbi_senda.png");
            Game.multiplier = 1;
        }
        else if (newbike == "aerox") {
            Bike = new bike(100, "aerox.png");
            Game.multiplier = 2;
        }
        else if (newbike == "crf250R") {
            Bike = new bike(150, "crf250r.png");
            Game.multiplier = 3;
        }
        else if (newbike == "fe450") {
            Bike = new bike(200, "fe450.png");
            Game.multiplier = 4;
        }

        if (newbike == "aerox")
            document.querySelector(".bike").style.transform = "scaleX(-1)";
        else
           document.querySelector(".bike").style.transform = "scaleX(1)";

        localStorage.setItem("bike", newbike);
    }
}

document.getElementById("bikeselect").onmousedown = () => {
    let select = document.getElementById("bikeselect");
    let score = localStorage.getItem("score");

    select.querySelectorAll("option")[1].disabled = true;
    select.querySelectorAll("option")[2].disabled = true;
    select.querySelectorAll("option")[3].disabled = true;
    if (score >= 100)
        select.querySelectorAll("option")[1].disabled = false;
    else {
        select.value = "derbisenda";
        changeBike();
    }
    if (score >= 250)
        select.querySelectorAll("option")[2].disabled = false;
    if (score >= 500)
        select.querySelectorAll("option")[3].disabled = false;
}

window.onload = () => {
    if (localStorage.getItem("reset") == null)
        localStorage.setItem("score", 0);

    localStorage.setItem("reset", true);

    let theme = localStorage.getItem("theme");
    let score = localStorage.getItem("score");
    let p = document.querySelectorAll("p");
    let bike = localStorage.getItem("bike");
    let select = document.getElementById("bikeselect");

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

    if (bike != null) {
        select.value = bike;
        changeBike();
    }
}