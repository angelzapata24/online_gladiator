function randInt(damage_low,damage_high) {
    return damage_low + Math.floor(Math.random() * (damage_high,damage_low))
}

function Gladiator(health, rage, damage_high, damage_low) {
    this.health = health,
    this.rage,
    this.damage_low,
    this.damage_high
}


this.attack = function attack(this, other) {
    var number = this.rage
    var low = this.damage_low
    var high = this.damage_high
    if (number < randInt(0, 100)) {
        var lost = randInt(low, high)
        other.health -= lost
        console.log('\nThe opponent lost'+ lost +'health!\n')
        this.rage += 15
    }
    else {
        var crit_attack = randInt(low, high) * 2
        other.health -= crit_attack
        console.log('\nCritical Attack!! The opponent lost' + crit_attack + 'health\n')
        self.rage = 0

    }

        }

