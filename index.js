class game {
    constructor() {
        this.gameclass = document.querySelector(".game");
        this.bikeclass = document.querySelector(".bike");
        this.sparksclass = document.querySelector(".sparks");
        this.scoreP = document.getElementById("score");
        this.statusP = document.getElementById("status");
        this.speedP = document.getElementById("speed");
        this.angleP = document.getElementById("angle");
        this.score = 0;
        this.multiplier = 1;
        this.delay = 15;
        this.gameRunning = false;
        this.status = 0;
        this.b_pos = 0;
        this.speedKmh = 0;
        this.accelerating = false;
        this.angle = 0;
        this.balancePoint = 65;
        this.keys = [false, false];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loop() {
        while(this.gameRunning) {
            if (this.keys[0] == true) {
                this.accelerating = true;
                if (this.speedKmh < Bike.top_speed) {
                    this.angle++;
                    this.speedKmh += 0.5;
                }
                else {
                    if (this.angle > 0) {
                        this.angle--;
                        await this.sleep(5);
                    }
                }
            }
            else if (this.keys[1] == true) {
                if (this.speedKmh > 0) {
                    this.accelerating = false;
                    this.speedKmh -= 0.5;
                    if (this.angle >= 2)
                        this.angle -= 2;
                }
            }
            this.gameclass.style.backgroundPositionX = `${-this.b_pos}px`;
            this.b_pos += this.speedKmh / 5;
            if (this.accelerating == false && this.speedKmh > 0) {
                if (this.angle > 0 && this.angle < this.balancePoint)
                    this.angle -= 1;
                else if (this.angle >= this.balancePoint)
                    this.angle += 1;
                this.speedKmh -= 0.2;
                await this.sleep(5);
            }
            if (this.angle > 10 && this.angle < 75) {
                this.status = "Wheelie";
                this.sparksclass.style.display = "none";
            }
            else if (this.angle >= 75) {
                this.status = "Scraping";
                this.sparksclass.style.display = "block";
            }
            else {
                this.status = "Normal";
                this.sparksclass.style.display = "none";
            }
            if (this.angle > 95) {
                this.gameRunning = false;
                document.getElementById("startbutton").style.display = "block";
                window.removeEventListener("keydown", window);
                window.removeEventListener("keyup", window);
                window.removeEventListener("mousedown", document.getElementById("gasbtn"));
                window.removeEventListener("mousedown", document.getElementById("brakebtn"));
                window.removeEventListener("mouseup", document.getElementById("gasbtn"));
                window.removeEventListener("mouseup", document.getElementById("brakebtn"));
                window.removeEventListener("touchstart", document.getElementById("gasbtn"));
                window.removeEventListener("touchstart", document.getElementById("brakebtn"));
                window.removeEventListener("touchend", document.getElementById("gasbtn"));
                window.removeEventListener("touchend", document.getElementById("brakebtn"));

                if (localStorage.getItem("score") < this.score)
                    localStorage.setItem("score", Math.round(this.score));
            }
            if (this.speedKmh < 0) 
                this.speedKmh = 0;
            if (this.speedKmh == 0) {
                if (this.angle > this.balancePoint) {
                    if (this.angle <= 95) {
                        this.angle++;
                    }
                }
                else {
                    if (this.angle > 0) {
                        this.angle--;
                    }
                }
            }
            this.scoreP.textContent = `${Math.round(this.score)} score`;
            this.speedP.textContent = `${Math.round(this.speedKmh)}kmh`;
            this.angleP.textContent = `${Math.round(this.angle)} deg`
            this.bikeclass.style.rotate = `${-this.angle}deg`;
            this.statusP.textContent = this.status;
            await this.sleep(this.delay);
        }
    }

    start() {
        this.gameRunning = true;
        this.speedKmh = 0;
        this.angle = 0;
        this.status = "Normal";
        this.score = 0;
        this.loop();
        second_repeat();
        document.getElementById("highscore").textContent = `highscore: ${localStorage.getItem("score") || 0}`;
        document.getElementById("startbutton").style.display = "none";

        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp")
                this.keys[0] = true;
            if (e.key == "ArrowDown")
                this.keys[1] = true;
        })

        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp") {
                this.keys[0] = false;
                this.accelerating = false;
            }
            if (e.key == "ArrowDown")
                this.keys[1] = false;
        })

        document.getElementById("gasbtn").addEventListener("mousedown", () => {
            this.keys[0] = true;
        })

        document.getElementById("brakebtn").addEventListener("mousedown", () => {
            this.keys[1] = true;
        })

        document.getElementById("gasbtn").addEventListener("touchstart", () => {
            this.keys[0] = true;
        })

        document.getElementById("brakebtn").addEventListener("touchstart", () => {
            this.keys[1] = true;
        })

        document.getElementById("gasbtn").addEventListener("mouseup", (e) => {
            this.accelerating = false;
            this.keys[0] = false;
        })

        document.getElementById("brakebtn").addEventListener("mouseup", (e) => {
            this.keys[1] = false;
        })
    }
}

class bike {
    constructor(top_speed, img) {
        this.top_speed = top_speed;
        document.querySelector(".bike").style.backgroundImage = `url(${img})`;
    }
}

let Game = new game("game", "bike");
let Bike = new bike(100, "derbi_senda.png");