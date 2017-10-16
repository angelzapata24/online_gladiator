function randInt(damage_low, damage_high) {
    return damage_low + Math.floor(Math.random() * (damage_high - damage_low));
}

function Gladiator(health, rage, damage_high, damage_low) {
    this.health = health;
    this.rage = rage;
    this.damage_low = damage_low;
    this.damage_high = damage_high;

    this.attack = function attack(other) {
        if (this.rage < randInt(0, 100)) {
            var lost = randInt(this.damage_low, this.damage_high);
            other.health -= lost;
            console.log('\nThe opponent lost' + lost + 'health!\n');
            this.rage += 15;
        } else {
            var crit_attack = randInt(this.damage_low, this.damage_high) * 2;
            other.health -= crit_attack;
            console.log(
                '\nCritical Attack!! The opponent lost' +
                    crit_attack +
                    'health\n'
            );
            this.rage = 0;
        }
    };

    this.health = function heal() {
        if (this.health >= 100) {
            console.log('\nCan not heal over 100 health!\n');
        } else {
            console.log('\n');
            if (this.rage <= 10) {
                console.log('\nYou do not have enough Rage to heal.\n');
            } else {
                this.rage = this.rage - 10;
                this.health = min(100, this.health + 20);
            }
        }
    };

    this.dead = function is_dead() {
        if (this.health <= 0) {
            return true;
        } else {
            return false;
        }
    };
}
