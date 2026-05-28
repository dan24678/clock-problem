import { LEDNumbers, ClockDigit } from './types/types';
import process from 'process';

const positions = new LEDNumbers();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const h1 = new ClockDigit('h1', null, []);
const h2 = new ClockDigit('h2', null, []);
const m1 = new ClockDigit('m1', null, []);
const m2 = new ClockDigit('m2', null, []);

const updateClockDigits = (hours: number, mins: number) => {
    if (hours < 10) {
        h1.value = null;
        h1.positions = [];
        h2.value = hours;
        h2.positions = positions.get(hours);
    } else {
        h1.value = 1;
        h1.positions = positions.get(1);
        h2.value = hours % 10;
        h2.positions = positions.get(hours % 10);
    }
    if (mins < 10) {
        m1.value = 0;
        m1.positions = positions.get(0);
        m2.value = mins;
        m2.positions = positions.get(mins);
    } else {
        m1.value = Math.floor(mins / 10);
        m1.positions = positions.get(Math.floor(mins / 10));
        m2.value = mins % 10;
        m2.positions = positions.get(mins % 10);
    }
};

const totals: { [key: string]: number } = {};
const updateTotals = () => {
    [h1, h2, m1, m2].forEach(digit => {
        if (digit.positions.length > 0) {
            digit.positions.forEach(pos => {
                const key = `${digit.name}-${pos}`;
                totals[key] = (totals[key] || 0) + 1;
            });
        }
    });
}

async function showDisplay(hours: number, mins: number) {
    process.stdout.write(`${hours}:${mins}`);
    //process.stdout.write(`${hours}:${mins} -- ${m2.positions.join(', ')}\n`);

    await sleep(10);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
}

// Main program loop
async function main() {
    for (let i=0; i<720; i++) {
        let hours, mins;
        if (i < 60) {
            hours = 12;
            mins = Math.floor(i % 60);
        } else {
            hours = Math.floor(i / 60);
            mins = Math.floor(i % 60);
        }

        updateClockDigits(hours, mins);
        updateTotals();
        await showDisplay(hours, mins);
    }
    const sortedTotals = Object.entries(totals).sort(([,a], [,b]) => b - a);
    console.log('Totals:', sortedTotals);
}

main();
