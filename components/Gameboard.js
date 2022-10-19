import { useState, useEffect } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import styles from '../style/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const numberIcons = 6;
const turnsLeft = 6;
let board = [];
let thrownDices = [];

export default function Gameboard() {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [total, setTotal] = useState(0);
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES + 1).fill(false, 1));
    const [selectedIcons, setSelectedIcons] = 
        useState(new Array(numberIcons + 1).fill(false, 1));
    const [selected, setSelected] = useState(false);
    const [bonus, setBonus] = useState(63);
    const [isBonus, setIsBonus] = useState(false);  
    const [one, setOne] = useState(0);
    const [two, setTwo] = useState(0);
    const [three, setThree] = useState(0);
    const [four, setFour] = useState(0);
    const [five, setFive] = useState(0);
    const [six, setSix] = useState(0);

    function calculate(i) {
        let chosenOne = thrownDices[selectedDices.indexOf(true)];
        let multiplier = 0;
        
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (thrownDices[i] === chosenOne) {
                multiplier++;
            }
        }

        if (isBonus === true) {
            setTotal(total + (thrownDices[1] * NBR_OF_DICES));
            setBonus(bonus - (thrownDices[1] * NBR_OF_DICES));

            if (1 === i && thrownDices[1] === i) {
                setOne(NBR_OF_DICES * thrownDices[1]);
            } else if (2 === i && thrownDices[1] === i) {
                setTwo(NBR_OF_DICES * thrownDices[1]);
            } else if (3 === i && thrownDices[1] === i) {
                setThree(NBR_OF_DICES * thrownDices[1]);
            } else if (4 === i && thrownDices[1] === i) {
                setFour(NBR_OF_DICES * thrownDices[1]);
            } else if (5 === i && thrownDices[1] === i) {
                setFive(NBR_OF_DICES * thrownDices[1]);
            } else if (6 === i && thrownDices[1] === i) {
                setSix(NBR_OF_DICES * thrownDices[1]);
            }
            
        } else {
            setTotal(total + (chosenOne * multiplier));
            setBonus(bonus - (chosenOne * multiplier));

            if (chosenOne === 1) {
                setOne(chosenOne * multiplier);
            } else if (chosenOne === 2) {
                setTwo(chosenOne * multiplier);
            } else if (chosenOne === 3) {
                setThree(chosenOne * multiplier);
            } else if (chosenOne === 4) {
                setFour(chosenOne * multiplier);
            } else if (chosenOne === 5) {
                setFive(chosenOne * multiplier);
            } else {
                setSix(chosenOne * multiplier);
            }
        }
    }

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0] )) {
            return "orange";
        } else {
            return selectedDices[i] ? '#D2FF58' : '#EEEEEE';
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getIconColor(i) {
        return selectedIcons[i] ? '#D2FF58' : '#EEEEEE';
    }

    function selectIcon(i) {
        let icon = [...selectedIcons];
        if (isBonus === true) {
            if (icon[i] === false && i === thrownDices[1]) {
                setSelected(true);
                turnsLeft = turnsLeft -1;
                icon[i] = selectedIcons[thrownDices[1] = true];
                setSelectedIcons(icon);
                calculate();
            } else if (icon[i] === true) {
                setStatus('You already selected points for' + i);
            } else {
                setStatus('Throw ' + nbrOfThrowsLeft + ' times before setting points.');
            }
        } else {
            if (nbrOfThrowsLeft > 0) {
                setStatus('Throw ' + nbrOfThrowsLeft + ' times before setting points')
            } else {
                if (icon[i] === false && (thrownDices[selectedDices.indexOf(true)] === i )) {
                    turnsLeft = turnsLeft -1;
                    setSelected(true);
                    checkBonusPoints();
                    icon[i] = selectedIcons[i] = true;
                    setSelectedIcons(icon);;
                } else if (icon[i] === true && isBonus === false) {
                    setStatus('You have already selected points for ' + i);
                } 
            }
        }
    }

    function IsBonus() {
        if (board.every((val, i, arr) => val === arr[0])) {
            setIsBonus(true);
            resetBoard();
            gameStatus();
        }
    }

    function checkBonusPoints() {
        calculate();
        setIsBonus(false);
        gameStatus();
        setSelectedDices(new Array(NBR_OF_DICES + 1).fill(false, 1));
        setNbrOfThrowsLeft(NBR_OF_THROWS);
    }

    function throwDices() {
        if (turnsLeft === 0 && nbrOfThrowsLeft === 0) {
            resetGame();
        } else {
            const values = (currentValue) => currentValue === false;
            if (selectedDices.every(values) === false && nbrOfThrowsLeft > 0 || nbrOfThrowsLeft === 3 || isBonus === true|| selected === true) { 
                setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);  
                setSelected(false);                
                resetBoard();
                for (let i = 0; i < NBR_OF_DICES; i++) {
                    if(!selectedDices[i]) {
                        let randomNumber = Math.floor(Math.random() * 6  + 1);
                        board[i] = 'dice-' + randomNumber;
                        thrownDices[i] = randomNumber;
                    } 
                }
                IsBonus();
            } else if (nbrOfThrowsLeft === 0) {
                setStatus('Please select your points before starting a new round');         
            } else { 
                setStatus('Select at least one dice before throwing again');
            }
        }
    }

    function resetGame() {
        turnsLeft = 6;
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setTotal(0);
        setBonus(63);
        board = [];
        setSelectedDices(new Array(NBR_OF_DICES + 1).fill(false, 1));
        setSelectedIcons(new Array(numberIcons + 1).fill(false, 1));
        setOne(0);
        setTwo(0);
        setThree(0);
        setFour(0);
        setFive(0);
        setSix(0);
    }

    function resetBoard() { 
        if (nbrOfThrowsLeft === 0 || IsBonus === true){
            for(let i = 0; i < NBR_OF_DICES + 1; i++) {
                selectedDices[i] = false;
                setNbrOfThrowsLeft(0);    
            } 
        }
    }

    function gameStatus() {
        if (nbrOfThrowsLeft === 3) {
            setStatus('Throw dices');

        } else if (nbrOfThrowsLeft >= 1) {
            setStatus('Select and throw dices again');
                    
        } else if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points');         
        } 
    }


    useEffect(() => { 
        gameStatus();
        if (bonus <= 0) {
            setBonus(0);
            setNbrOfThrowsLeft(0);
            board = [];
        }
        if (turnsLeft === 0) {
            setStatus('Game over. All points selected.');
            setNbrOfThrowsLeft(0);
        }
        
        if(nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        }
    }, [nbrOfThrowsLeft])

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={60}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        );
    }

    const icons = [];
    for (let i = 1; i <= numberIcons; i++) {
        icons.push(
            <Pressable
                key={"icons" + i}
                onPress={() => selectIcon(i)}>
                <MaterialCommunityIcons
                    name={"numeric-" + [i] + "-circle"}
                    key={"icons" + i}
                    size={50}
                    color={getIconColor(i)}>
                </MaterialCommunityIcons>    
            </Pressable>
        );
    }

    return(
        <SafeAreaView>
            <View style={styles.gameboard}>
                <View style={styles.icons}>{row}</View>
                <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameinfo}>{status}</Text>
                <Pressable style={styles.button}
                    onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>Throw dices</Text>
                </Pressable>
                <Text style={styles.gameinfo}>Total: {total}</Text>
                <Text style={styles.gameinfo}>You are {bonus} points away from bonus</Text>
                <Text style={styles.numbers}>{one} {two} {three} {four} {five} {six}</Text>
                <View style={styles.icons}>{icons}</View>
            </View>
        </SafeAreaView>
    )
}