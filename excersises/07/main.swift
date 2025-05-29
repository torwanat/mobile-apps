var oczko : Set = [
                   "2\u{2660}", "3\u{2660}", "4\u{2660}", "5\u{2660}", "6\u{2660}", "7\u{2660}", "8\u{2660}", "9\u{2660}", "10\u{2660}", "W\u{2660}", "D\u{2660}", "K\u{2660}", "A\u{2660}",
                   "2\u{2663}", "3\u{2663}", "4\u{2663}", "5\u{2663}", "6\u{2663}", "7\u{2663}", "8\u{2663}", "9\u{2663}", "10\u{2663}", "W\u{2663}", "D\u{2663}", "K\u{2663}", "A\u{2663}",
                   "2\u{2665}", "3\u{2665}", "4\u{2665}", "5\u{2665}", "6\u{2665}", "7\u{2665}", "8\u{2665}", "9\u{2665}", "10\u{2665}", "W\u{2665}", "D\u{2665}", "K\u{2665}", "A\u{2665}",
                   "2\u{2666}", "3\u{2666}", "4\u{2666}", "5\u{2666}", "6\u{2666}", "7\u{2666}", "8\u{2666}", "9\u{2666}", "10\u{2666}", "W\u{2666}", "D\u{2666}", "K\u{2666}", "A\u{2666}"
                  ];

func addCard(card: String) -> Int{
    var sum = 0;
    switch(card){
        case "2":
            sum += 2;
        case "3":
            sum += 3;
        case "4":
            sum += 4;
        case "5":
            sum += 5;
        case "6":
            sum += 6;
        case "7":
            sum += 7;
        case "8":
            sum += 8;
        case "9":
            sum += 9;
        case "10":
            sum += 10;
        case "A":
            sum += 11;
        case "W":
            sum += 2;
        case "D":
            sum += 3;
        case "K":
            sum += 4;
        default:
            print("Something broke");
    }
    return sum;
}

func checkWin(humanSum: Int, aiSum: Int, humanPersian: Int, aiPersian: Int) -> String{
    let win = "Wygrałeś";
    let lose = "Przegrałeś";
    let draw = "Remis";
    if(humanSum == aiSum){
        if(humanSum == 22) {
            print("Perskie oczka!");
        }
        else if(humanSum == 21) {
            print("Oczka!");
        }
        return draw;
    }else{
        if(humanSum == 22 && humanPersian == 2){
            print("Perskie oczko!");
            return win;
        }else if(aiSum == 22 && aiPersian == 2){
            print("Perskie oczko!");
            return lose;
        }else if(humanSum == 21){
            print("Oczko!");
            return win;
        }else if(aiSum == 21 ){
            print("Oczko!");
            return lose;
        }else if(humanSum > 21){
            if(aiSum < 21){
                return lose;
            }else if(aiSum < humanSum){
                return lose;
            }else{
                return win;
            }
        }else if(aiSum > 21){
            if(humanSum < 21){
                return win;
            }else if(aiSum < humanSum){
                return lose;
            }else{
                return win;
            }
        }else if(aiSum > humanSum){
            return lose;
        }else{
            return win;
        }
    }
}

func aiThink(sum: Int, opponentDeck: Set<String>, isPlaying: Bool, turn: Int, persian: Int, value: Int) -> Bool{
    if(!isPlaying && opponentDeck.count < 2 && sum > 11){
        return false;
    }else{ 
        if(persian == 2){
            return false;
        }else{
            if(sum <= 10 || (sum == 11 && value == 11)){
                return true;
            }else{
                if((value <= 22 - sum) && sum < 20){
                    return true;
                }else{
                    return false;
                }
            }
        }
    }
}

var yourDeck = Set<String>();
var computerDeck = Set<String>();
var yourSum = 0;
var computerSum = 0;
var game = true;
var human = true;
var ai = true;
var randCard = "";
var counter = 0;
var humanPersian = 0;
var aiPersian = 0;
while(game){
    counter += 1;
    randCard = oczko.randomElement() ?? "";
    var cardValue = "";
    if(randCard != ""){
        oczko.remove(randCard);
        let randCardIndex = randCard.index(randCard.endIndex, offsetBy: -2);
        let randCardRange = randCard.startIndex...randCardIndex;
        cardValue = String(randCard[randCardRange]);
    }else{
        human = false;
        ai = false;
        print("Gratuluję, zużyłeś całą talię. \nPas");
    }
    if(counter % 2 != 0 && human){
        yourSum += addCard(card: cardValue);
        if(cardValue == "A"){
            humanPersian += 1;
        }
        yourDeck.insert(randCard);
        print("Dobrana karta: " + randCard);
        print("Twoja talia:", terminator: " ");
        print(yourDeck);
        print("Suma twoich kart: " + String(yourSum));
        var validated = false;
        var choice = "";
        while(!validated){
            print("Podaj akcję: dobieram lub pas");
            choice = readLine() ?? " ";
            if(choice == "dobieram" || choice == "pas" || choice == "d" || choice == "p"){
                validated = true;
            }else{
                print("Błędna opcja");
            }
        }
        if(choice == "pas" || choice == "p"){
            human = false;
        }
    }else if(ai){
        computerSum += addCard(card: cardValue);
        if(cardValue == "A"){
            aiPersian += 1;
        }
        computerDeck.insert(randCard);
        ai = aiThink(sum: computerSum, opponentDeck: yourDeck, isPlaying: human, turn: counter/2, persian: aiPersian, value: addCard(card: cardValue));
        if(ai){
            print("Komputer dobiera");
        }else{
            print("Komputer pasuje");
        }
        print("Ilość kart komputera: \(computerDeck.count)");
    }
    if(!human && !ai){
        game = false;
        print("Ty:")
        print(yourSum);
        print(yourDeck);
        print("AI:");
        print(computerSum);
        print(computerDeck);
        print(checkWin(humanSum: yourSum, aiSum: computerSum, humanPersian: humanPersian, aiPersian: aiPersian));
    }
}
