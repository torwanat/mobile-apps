import Foundation;
var name = "";
var go = true;
while(go){
    print("Wybierz akcję: 1 - Imię, 2- PESEL, k - Zakończ program: ");
    let choice = readLine() ?? "3";
    switch(choice){
    case "1":
        while(name == ""){
            print("Wpisz imię: ");
            name = readLine() ?? "";
        }
        let o = name.hasSuffix("a");

        if(!o || name == "Kuba" || name == "Barnaba" ){
            print("Jesteś mężczyzną");
        }else{
            print("Jetseś kobietą");
        }
    case "2":
        print("Podaj PESEL: ");
        let PESEL = readLine() ?? "";
        if(PESEL.count != 11){
            print("Błędny PESEL!");
        }else{
            let index = PESEL.index(PESEL.endIndex, offsetBy: -1);
            //let control = PESEL.suffix(from: index);
            var result = 0;
            var counter = 1;
            var isCorrect = true;
            for i: Character in PESEL{
                let temp: Int = Int(String(i)) ?? 0;
                if(counter % 4 == 0){
                    result += 9 * temp;
                }else{
                    if(counter % 3 == 0){
                        result += 7 * temp;
                    }else{
                        if(counter % 2 == 0){
                            result += 3 * temp;
                        }else{
                            result += temp;
                        }
                    }
                }
                counter += 1;
            }
            if(result % 10 == 0){
                print("Pesel jest poprawny");
            }else{
                print("Pesel jest niepoprawny");
                isCorrect = false;
            }
            if(isCorrect){
                let genderIndex = PESEL.index(PESEL.endIndex, offsetBy: -2);
                let genderRange = genderIndex ..< index;
                let gender = PESEL[genderRange];
                let genderTemp = Int(gender) ?? 0;
                if(genderTemp % 2 == 0){
                    print("Płeć: kobieta");
                }else{
                    print("Płeć: mężczyzna");
                }
                let yearIndex = PESEL.index(PESEL.startIndex, offsetBy: 1);
                let yearRange = PESEL.startIndex ... yearIndex;
                let year = PESEL[yearRange];
                let monthStartIndex = PESEL.index(PESEL.startIndex, offsetBy: 2);
                let monthEndIndex = PESEL.index(PESEL.startIndex, offsetBy: 3);
                let monthRange = monthStartIndex ... monthEndIndex;
                let month = PESEL[monthRange];     
                let dayStartIndex = PESEL.index(PESEL.startIndex, offsetBy: 4);
                let dayEndIndex = PESEL.index(PESEL.startIndex, offsetBy: 5);
                let dayRange = dayStartIndex ... dayEndIndex;
                let day = PESEL[dayRange];
                let tempMonth = Int(month) ?? 0;
                if(tempMonth < 13){
                    print("Data urodzenia: " + day + "." + month + ".19" + year);
                }else{
                    if(tempMonth < 33){
                        print("Data urodzenia: " + day + "." + String(tempMonth - 20) + ".20" + year);
                    }else{
                        if(tempMonth < 53){
                            print("Data urodzenia: " + day + "." + String(tempMonth - 40) + ".21" + year);
                        }else{
                            if(tempMonth < 73){
                                print("Data urodzenia: " + day + "." + String(tempMonth - 60) + ".22" + year);
                            }else{
                                if(tempMonth < 93){
                                    print("Data urodzenia: " + day + "." + String(tempMonth - 80) + ".18" + year);
                                }else{
                                    print("Data poza skalą");
                                }
                            }
                        }
                    }
                }
            }
        }        
    case "k":
        go = false;
    default:
        print("Proszę wybrać poprawną opcję");
    }
}
