class game {
    constructor(gameclass, bikeclass) {
        this.gameclass = document.querySelector(`.${gameclass}`);
        this.bikeclass = document.querySelector(`.${bikeclass}`);
        this.statusP = document.getElementById("status");
        this.speedP = document.getElementById("speed");
        this.angleP = document.getElementById("angle");
        this.delay = 15;
        this.gameRunning = false;
        this.status = 0;
        this.b_pos = 0;
        this.speedKmh = 0;
        this.accelerating = false;
        this.angle = 0;
        this.balancePoint = 65;
        this.keys = [];
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async loop() {
        while(this.gameRunning) {
            if (this.keys[0] == true) {
                this.accelerating = true;
                if (this.speedKmh < 200) {
                    this.angle++;
                    this.speedKmh += 0.5;
                }
                else {
                    while (this.angle > 0) {
                        this.angle--;
                        await this.sleep(5);
                    }
                }
            }
            else if (this.keys[1] == true) {
                if (this.speedKmh > 0) {
                    this.accelerating = false;
                    this.speedKmh--;
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
            if (this.angle > 10 && this.angle < 75)
                this.status = "Wheelie";
            else if (this.angle >= 75)
                this.status = "Scraping";
            else
                this.status = "Normal";
            if (this.angle > 95) {
                this.gameRunning = false;
                document.getElementById("startbutton").style.display = "block";
                window.removeEventListener("keydown", window);
                window.removeEventListener("keyup", window);
            }
            if (this.speedKmh < 0) 
                this.speedKmh = 0;
            if (this.speedKmh == 0) {
                if (this.angle > this.balancePoint) {
                    while (this.angle <= 95) {
                        this.angle++;
                        this.bikeclass.style.rotate = `${-this.angle}deg`;
                        await this.sleep(15);
                    }
                }
                else {
                    while (this.angle > 0) {
                        this.angle--;
                        this.bikeclass.style.rotate = `${-this.angle}deg`;
                        await this.sleep(15);
                    }
                }
            }
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
        this.loop();
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
    }
}

let Game = new game("game", "bike");