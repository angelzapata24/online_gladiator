const $ = require('jquery');
const appRoot = $('#app');

const STATE = {
    update: '',
    turn: 1
};

var gladiator_1 = Gladiator('Edgar', 100, 25);
var gladiator_2 = Gladiator('Angel', 100, 25);

function randInt(damage_low, damage_high) {
    return damage_low + Math.floor(Math.random() * (damage_high - damage_low));
}

function Gladiator(name, health, rage, damage_high, damage_low) {
    var gladiator = {};
    gladiator.name = name;
    gladiator.health = health;
    gladiator.rage = rage;
    gladiator.damage_low = damage_low;
    gladiator.damage_high = damage_high;

    gladiator.attack = function attack(other) {
        if (gladiator.rage < randInt(0, 100)) {
            var lost = randInt(gladiator.damage_low, gladiator.damage_high);
            other.health -= lost;
            '<div>The opponent lost' + lost + 'health!</div>';
            ("<div><button id='down'>-</button>");
            gladiator.rage += 15;
        } else {
            var crit_attack =
                randInt(gladiator.damage_low, gladiator.damage_high) * 2;
            other.health -= crit_attack;
            console.log(
                '<h2>Critical Attack!! The opponent lost' +
                    crit_attack +
                    'health</h2>'
            );
            gladiator.rage = 0;
        }
    };

    gladiator.heal = function heal() {
        if (gladiator.health >= 100) {
            console.log('\nCan not heal over 100 health!\n');
        } else {
            console.log('\n');
            if (gladiator.rage <= 10) {
                console.log('\nYou do not have enough Rage to heal.\n');
            } else {
                gladiator.rage = gladiator.rage - 10;
                gladiator.health = Math.min(100, gladiator.health + 20);
            }
        }
    };

    gladiator.dead = function is_dead() {
        if (gladiator.health <= 0) {
            return true;
        } else {
            return false;
        }
    };
    return gladiator;
}

function viewButtons() {
    if (STATE.turn === 1) {
        return [
            "<div><button id='Heal'>Heal</button><div>",
            "<div><button id='Attack'>Attack</button><div>",
            STATE.update
        ].join('');
    } else {
        return [
            "<div><button disabled id='Heal'>Heal</button><div>",
            "<div><button disabled id='Attack'>Attack</button></div>",
            STATE.update
        ].join('');
    }
}

function viewButtons2() {
    if (STATE.turn === 2) {
        return [
            "<div><button id='Heal2'>Heal</button><div>",
            "<div><button id='Attack2'>Attack</button><div>",
            STATE.update
        ].join('');
    } else {
        return [
            "<div><button disabled id='Heal2'>Heal</button><div>",
            "<div><button disabled id='Attack2'>Attack</button></div>",
            STATE.update
        ].join('');
    }
}

function view() {
    return [
        '<h3>' + 'Name: ' + gladiator_1.name + '</h3>',
        '<h3>' + 'Health: ' + gladiator_1.health + '</h3>',
        '<h3>' + 'Rage: ' + gladiator_1.rage + '</h3>',
        viewButtons()
    ].join('');
}

function view_2() {
    return [
        '<h3>' + 'Name: ' + gladiator_2.name + '</h3>',
        '<h3>' + 'Health: ' + gladiator_2.health + '</h3>',
        '<h3>' + 'Rage: ' + gladiator_2.rage + '</h3>',
        viewButtons2()
    ].join('');
}

function attachHandlers() {
    $('#Attack').click(function() {
        gladiator_1.attack(gladiator_2);
        draw();
    });
    $('#Heal').click(function() {
        gladiator_1.heal();
        draw();
    });
    $('#Attack2').click(function() {
        gladiator_2.attack(gladiator_1);
        draw();
    });
    $('#Heal2').click(function() {
        gladiator_2.heal();
        draw();
    });
}

function draw() {
    appRoot.html(view() + view_2());
    attachHandlers();
}

function main() {
    draw();
}

$(main);
