class game {
    constructor(gameclass, bikeclass) {
        this.gameclass = document.querySelector(`.${gameclass}`);
        this.bikeclass = document.querySelector(`.${bikeclass}`);
        this.statusP = document.getElementById("status");
        this.speedP = document.getElementById("speed");
        this.angleP = document.getElementById("angle");
        this.delay = 10;
        this.gameRunning = false;
        this.status = 0;
        this.b_pos = 0;
        this.speedKmh = 0;
        this.accelerating = false;
        this.angle = 0;
        this.balancePoint = 55;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loop() {
        while(this.gameRunning) {
            this.gameclass.style.backgroundPositionX = `${-this.b_pos}px`;
            this.b_pos += this.speedKmh / 5;
            if (this.accelerating == false && this.speedKmh > 0) {
                if (this.angle > 0 && this.angle < this.balancePoint)
                    this.angle--;
                else if (this.angle >= this.balancePoint)
                    this.angle++;
                await this.sleep(5);
                this.speedKmh -= 0.2;
            }
            if (this.angle > 10 && this.angle < 75)
                this.status = "Wheelie";
            else if (this.angle >= 75)
                this.status = "Scraping";
            else
                this.status = "Normal";
            if (this.angle > 90) {
                this.gameRunning = false;
                document.getElementById("startbutton").style.display = "block";
                window.removeEventListener("keydown");
                window.removeEventListener("keyup");
            }
            if (this.speedKmh < 0) 
                this.speedKmh = 0;
            if (this.speedKmh == 0) {
                if (this.angle > this.balancePoint) {
                    while (this.angle <= 95) {
                        this.angle++;
                        await this.sleep(15);
                    }
                }
                else {
                    while (this.angle > 0) {
                        this.angle--;
                        await this.sleep(15);
                    }
                }
            }
            this.speedP.textContent = `${Math.round(this.speedKmh)}kmh`;
            this.angleP.textContent = `${this.angle} deg`
            this.bikeclass.style.rotate = `${-this.angle}deg`;
            this.statusP.textContent = this.status;
            await this.sleep(this.delay);
        }
    }

    start() {
        this.gameRunning = true;
        this.loop();
        document.getElementById("startbutton").style.display = "none";

        window.addEventListener("keydown", async (e) => {
            if (e.key == "ArrowUp") {
                this.accelerating = true;
                if (this.speedKmh < 150) {
                    this.angle += 2;
                    this.speedKmh += 2;
                }
                else {
                    while (this.angle > 0) {
                        this.angle--;
                        await this.sleep(5);
                    }
                }
            }
            else if (e.key == "ArrowDown") {
                if (this.speedKmh >= 3) {
                    this.accelerating = false;
                    for (let i = 0; i < 3; i++) {
                        this.speedKmh -= 1;
                        if (this.angle >= 2)
                            this.angle -= 2;
                    }
                }
            }
        })

        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp")
                this.accelerating = false;
        })
    }
}

let Game = new game("game", "bike");