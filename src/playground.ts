
import { readLine } from './utils'

interface IQuestion {
    player: string,
    text: string
}

class Playground {
    private size: number = 3;
    private userSize : number;
    private movementTimes: number = 0;
    private players = ['X', 'O'];
    private playground: string[][] = [];
    private questionQueue: IQuestion[] = [];

    constructor() {}

    /**
     * Start the game
     */
    public start() {
        readLine.question('What is your preferred playground size? ', size => {
            this.userSize = Number(size);
            if(this.userSize.toString() === 'NaN' || this.userSize < 3 || this.userSize > 10) {
                readLine.close();
                
                throw new Error('The playground size must be between 3 and 10');
            }

            this.initMap(this.userSize);

            // Init question queues with one question for every player
            this.players.map(player => 
                this.questionQueue.push({
                    player,
                    text: `Player ${player}: Make your move by stating a number: \n`
                })
            );

            // Start to ask user questions
            this.askUser(this.questionQueue.shift());
        });
    };

    /**
     * Player makes a move and place their symbol to the playground
     * @param player The symbol of the player who makes a move
     * @param position The position number which the player wants to place their symbol to the playground
     */
    private makeMove(player, position) {
        const positionNo = Number(position);
        this.movementTimes++;

        this.placeCell(player, positionNo);
        this.draw();
    }

    /**
     * Recursively get question from the question queue and ask users
     * If the game does not end, put the question again into the queue and continuously ask questions
     * @param question The question object containing player symbol and text
     */
    private askUser(question: IQuestion) {
        readLine.question(question.text, answer => {
            console.log();
            if(answer.toString() === 'NaN' || Number(answer) < 0 || Number(answer) > Math.pow(this.userSize,2))
            {
                throw new Error('You have input invalid number');
            } else {
                this.makeMove(question.player, answer);
            }

            if(!this.checkWin()) {
                this.questionQueue.push( question );
                this.askUser(this.questionQueue.shift());
            } else if(this.movementTimes >= Math.pow(this.size, 2)) {
                this.questionQueue.length = 0;
                console.log(`Tied game!`);
                readLine.close();
            } else {
                this.questionQueue.length = 0;
                console.log(`${question.player} wins!`);
                readLine.close();
            }
        });
    }

    /**
     * Init playground map
     */
    private initMap(playgroundSize?: number) {
        this.size = playgroundSize || 3;
        this.playground = new Array(this.size);
        this.playground.fill(new Array(this.size).fill(0));
        this.playground = this.playground.map((row, rowIndex) => {
            return row.map((col, colIndex) => 
                (rowIndex * this.size + (colIndex + 1)).toString()
            );
        })

        // this.playground = [
        //     ['o', 'o', 'o'],
        //     ['o', 'x', 'x'],
        //     ['x', 'x', 'o'],
        // ]

        this.draw();
        this.checkWin();
    }

    /**
     * Draw the playground with existing values
     */
    private draw() {
        this.playground.forEach((row, index) => {
            console.log(row.join(' | '));
            if(index !== this.size - 1) {
                console.log(new Array(this.size * 4 - 2).fill('-').join(''));
            }
        });
        console.log();
    }

    /**
     * Check if the playground has a winner
     * @returns the flag to show the result
     */
    private checkWin() {
        const horizontal = [...this.playground];
        const vertical = this.playground.map((row, i) => this.playground.map(col => col[i]));
        const diagonal = [
            this.playground.map((row, i, array) => array[i][i]),
            this.playground.map((row, i, array) => array[i][this.size - i - 1])
        ];
        const allPossibleCombinations = [...horizontal, ...vertical, ...diagonal];
        // console.log(horizontal);
        // console.log(vertical);
        // console.log(diagonal);

        const winningCombination = allPossibleCombinations.filter(
            combination => combination.every(value => value === combination[0])
        )
        
        // console.log(winningCombination);
        return !!winningCombination.length;
    }

    /**
     * Player places their tic-tac-toe to the certain position in the playground
     * @param player The player who makes this action
     * @param position The position to put the player's tic-tac-toe
     */
    private placeCell(player: string, position: number) {
        const y = Math.floor((position - 1) / this.size);
        const x = (position - 1) % this.size;
        if(this.players.includes(this.playground[y][x])){ //make the program extensible
            throw new Error("The position is occupied");
        } else {
            this.playground[y][x] = player;
        }
    }
}

export default Playground;
