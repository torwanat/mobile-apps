var check = true;
while(check){
    let choice = readLine() ?? "";
    switch choice{
        case "1":
        for i in -22..<22{
            print(i);
        }
    case "2":
        for i in stride(from: 55, to: -15, by: -5){
            print(i, terminator: " ");
        }
    case "3":
        for i in stride(from: 40, to: 10, by: -1){
            if(i < 25 && i > 15){
                continue;
            }else{
                print(i);
            }
        }
    case "4":
        for i in -40..<40{
            if(i >= 3 && i < 30){
                continue;
            }else{
                if(i % 2 == 0){
                    continue
                }else{
                    print(i);
                }
            }
        }
    case "5":
        for i in -20..<20{
            if(i > 5 && i < 10){
                continue;
            }else{
                if(i % 2 == 0){
                    print(i);
                }
            }
        }
    case "6":
        for i in -100..<41{
            if(i > -28 && i < 14){
                continue;
            }else{
                if(i % 7 == 0){
                    print(i);
                }
            }
        }
    case "7":
        if let input = readLine(){
            if let number = Int(input){
                for _ in 1...number{
                    print("X", terminator: "");
                }
            }
        }
    case "8":
        if let input = readLine(){
            if let number = Int(input){
                for _ in 1...number{
                    print("X", terminator: "");
                }
                print();
                for _ in 1...(number - 2){
                    print("X", terminator: "");
                    for _ in 1...(number - 2){
                        print(" ", terminator: "");
                    }
                    print("X", terminator: "");
                    print();
                }
                for _ in 1...number{
                    print("X", terminator: "");
                }
            }
        }
    case "9":
        if let input = readLine(){
            if let number = Int(input){
                for _ in 1...(number - 1){
                    print(" ", terminator: "");
                }
                print("X");
                for i in 1...(number - 2){
                    for _ in 1...(number - i - 1){
                    print(" ", terminator: "");
                    }
                    print("X", terminator: "");
                    if((i - 1) > 0 ){
                        for _ in 1...(i - 1){
                            print(" ", terminator: "");
                        }
                    }
                    print("X");
                }
                for _ in 1...number{
                    print("X", terminator: "");
                }
            }
        }
    case "10":
        if let input = readLine(){
            if let number = Int(input){
            var counter = 1;
                for _ in 1...number{
                    for var i in 1...counter{
                        print(i, terminator: "");
                        i += 1;
                    }
                    counter += 1;
                    print("");
                }
            }
        }
    case "11":
        let number = Int(readLine() ?? "") ?? 0;
        for j in 1...number{
            for _ in 1...(number - j + 1){
                print(" ", terminator: "");
            }
            for i in 1...j{
                print((j - i + 1), terminator: "");
            }
                print("");
        }
    case "12":
        let number = Int(readLine() ?? "") ?? 0;
        var result = 1;
        if(number == 0){
            print(1);
        }else{
            for i in 1...number{
                result *= i;
            }
            print(result);
        }
    case "13":
        let number = Int(readLine() ?? "") ?? 0;
        for i in 0...number{
            if(i % 2 == 0){
                print(i);
            }
        }
    case "14":
        let number = Int(readLine() ?? "") ?? 0;
        var isPrime = true;
        if(number == 0 || number == 1){
            isPrime = false;
        }else{
            for i in 2...(number / 2){
                if(number % i == 0){
                    isPrime = false;
                    break;
                }
            }
        }
        if(isPrime){
                print("Jest to liczba pierwsza");
            }else{
                print("Nie jest to liczba pierwsza");
        }
    case "15":
        let number = Int(readLine() ?? "") ?? 0;
        print(" ", terminator: " ");
        for i in 1...number{
            print(i, terminator: " ");
        }
        print("");
        for i in 1...number{
            print(i, terminator: " ");
            for j in 1...number{
                print((i * j), terminator: " ");
            }
            print("")
        }
    default:
        check = false;
    }
}