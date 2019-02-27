let formulaService = {
    fuelCalculation(ship, planet) {
        return ship.fuel - (planet.distance * 20);
    },
    timeToTravel(planet, ship) {
        return planet.distnce * 1000 / ship.speed
    }

}


let price = {
    fuel: 50,
    repair: 60,
    crew: 80
}

let dockedShips = [];


class Ship {

    constructor(name, crew, fuel, hull, speed, credits, img) {
        this.name = name;
        this.crew = crew;
        this.fuel = fuel;
        this.hull = hull;
        this.speed = speed;
        this.credits = credits;
        this.img = img;
        this.isWorking = false;
        this.isDamaged = false;
        this.isDestroyed = false;
        this.dockedPlanet = null;
        this.maxFuel = fuel;
        this.maxHull = hull;
    }

    start(planet) {
        if (planet instanceof Planet === false) {
            return console.log("Not a planet")
        }
            let neededFuel = formulaService.fuelCalculation(this, planet);
            console.log(neededFuel)

         if (this.dockedPlanet === planet) {
            console.log("Already here")
        } 
        if (this.isDamaged === true || this.isDestroyed === true || this.crew <= 0) {
            return console.log("Engine failure")
        } 
        else {
            this.isWorking === true;
            setTimeout(() => {
                this.fuel = this.fuel - neededFuel;
                this.dock(planet);
            }, formulaService.timeToTravel(planet, this))
        }
    }

    dock(planet) {
        setTimeout(() => {
            console.log(`${this.name} has landed`)
            let that = this;
            dockedShips.push(this);
            that.isWorking = false;
            that.dockedPlanet = planet.name;
        }, 2000)

    }
}

class Planet {
    constructor(name, size, population, distance, development, shipDocked, img, ) {
        this.name = name;
        this.size = size;
        this.population = population;
        this.distance = distance;
        this.development = development;
        this.img = img;
        this.shipDocked = shipDocked;
    }
    getmarketPrice(price) {
        return this.development * price - Math.floor(this.population / this.size)
    }

    repair(ship) {
        if (ship instanceof Ship === false) {
            return console.log("Not a ship")
        }
        if (ship.dockedPlanet === null) {
            return console.log(`The ${ship} is not docked`)
        }
        if (ship.hull === ship.maxHull) {
            return console.log(`The ${ship.name} has max hull`)
        }
        let needToRepair = this.getmarketPrice(price.repair)
        if (needToRepair < ship.credit) {
            console.log("Not enough credit for repair")
        }
        else {
            console.log("Repaired")
            ship.hull = ship.maxHull
        }
    }
    refuel(ship) {
        if (ship instanceof Ship === false) {
             console.log("Not a ship");
             return;
        }
        if (ship.dockedPlanet === null) {
             console.log(`The ${ship.name} is not docked`);
             return;
        }
        if (ship.fuel === ship.maxFuel) {
             console.log(`The ${ship.name} has max hull`);
             return;
        }
        let needToRefuel = this.getmarketPrice(price.fuel)
        if (needToRefuel < ship.credit) {
            console.log("Not enough credit for refuel")
        }
        else {
            console.log("Refueled")
            ship.hull = ship.maxHull
        }
    }
    hireCrewMember(ship) {
        if (ship instanceof Ship === false) {
            return console.log("Can not add member")
        }

        if (ship.dockedPlanet === null) {
            return console.log(`The ${ship} cant add member`)
        }

        let hireCrew = this.getmarketPrice(price.crew);

        if (hireCrew < ship.credit) {
            console.log("Not enough credit for a new member")
        }
        else {
            ship.crew += 1
            console.log(ship.crew);
        }
    }
}

