class game {
    constructor(gameclass, bikeclass) {
        this.gameclass = gameclass;
        this.bikeclass = bikeclass
        this.delay = 10;
        this.gameRunning = false;
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
            document.querySelector(`.${this.gameclass}`).style.backgroundPositionX = `${-this.b_pos}px`;
            this.b_pos += this.speedKmh / 5;
            if (this.accelerating == false && this.speedKmh > 0) {
                if (this.angle > 0 && this.angle < this.balancePoint)
                    this.angle--;
                else if (this.angle >= this.balancePoint)
                    this.angle++;
                await this.sleep(5);
                this.speedKmh -= 0.2;
            }
            if (this.angle >= 85)
                console.log("scraping");
            if (this.angle > 90)
                this.gameRunning = false;
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
            document.getElementById("speed").textContent = `${Math.round(this.speedKmh)}kmh`;
            document.querySelector(`.${this.bikeclass}`).style.rotate = `${-this.angle}deg`;
            await this.sleep(this.delay);
        }
    }

    start() {
        this.gameRunning = true;
        this.loop();
        document.getElementById("startbutton").style.display = "none";

        window.addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp") {
                this.accelerating = true;
                this.angle += 2;
                for (let i = 0; i < 3; i++) {
                    if (this.speedKmh < 100)
                        this.speedKmh++;
                }
            }
            else if (e.key == "ArrowDown") {
                if (this.speedKmh >= 3) {
                    this.accelerating = false;
                    if (this.angle >= 4)
                        this.angle -= 4;
                    for (let i = 0; i < 3; i++)
                        this.speedKmh -= 1;
                }
            }
        })

        window.addEventListener("keyup", (e) => {
            if (e.key == "ArrowUp")
                this.accelerating = false;
        })
    }
}