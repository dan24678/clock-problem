type Position = 'top' | 'topLeft' | 
    'topRight' | 'middle' | 'bottomLeft' | 
    'bottomRight' | 'bottom';

class ClockDigit {
    private _name: string;
    private _value: number | null;
    private _positions: Position[];

    constructor(name: string, value: number | null, positions: Position[] = []) {
        this._name = name;
        this._value = value;
        this._positions = positions;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newValue: string) {
        this._name = newValue;
    }

    public get value(): number | null {
        return this._value;
    }

    public set value(newValue: number | null) {
        this._value = newValue;
    }

    public get positions(): Position[] {
        return this._positions;
    }

    public set positions(newPositions: Position[]) {
        this._positions = newPositions;
    }
}

class LEDNumber {
    private _positions: Position[];
    private _value: number;

    constructor(value: number, positions: Position[] = []) {
        this._value = value;
        this._positions = positions;
    }

    public get value(): number {
        return this._value;
    }

    public get positions(): Position[] {
        return this._positions;
    }
}

class LEDNumbers {
    private numbers: LEDNumber[];

    constructor() {
        this.numbers = [
            new LEDNumber(0, ['top', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'bottom']),
            new LEDNumber(1, ['topRight', 'bottomRight']),
            new LEDNumber(2, ['top', 'topRight', 'middle', 'bottomLeft', 'bottom']),
            new LEDNumber(3, ['top', 'topRight', 'middle', 'bottomRight', 'bottom']),
            new LEDNumber(4, ['topLeft', 'topRight', 'middle', 'bottomRight']),
            new LEDNumber(5, ['top', 'topLeft', 'middle', 'bottomRight', 'bottom']),
            new LEDNumber(6, ['top', 'topLeft', 'middle', 'bottomLeft', 'bottomRight', 'bottom']),
            new LEDNumber(7, ['top', 'topRight', 'bottomRight']),
            new LEDNumber(8, ['top', 'topLeft', 'topRight', 'middle', 'bottomLeft', 'bottomRight', 'bottom']),
            new LEDNumber(9, ['top', 'topLeft', 'topRight', 'middle', 'bottomRight', 'bottom']),
        ];
    }

    public addNumber(number: LEDNumber): void {
        this.numbers.push(number);
    }

    public get(numValue: number): Position[] {
        return this.numbers[numValue]?.positions || [];
    }
}

export { 
    ClockDigit,
    LEDNumber, 
    LEDNumbers 
};
