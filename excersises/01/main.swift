/*for i in -22..<22{
    print(i);
}*/

/*for i in stride(from: 55, to: -15, by: -5){
    print(i, terminator: " ");
}*/

/*for i in stride(from: 40, to: 10, by: -1){
    if(i < 25 && i > 15){
        continue;
    }else{
        print(i);
    }
}*/

/*for i in -40..<40{
    if(i >= 3 && i < 30){
        continue;
    }else{
        if(i % 2 == 0){
            continue
        }else{
            print(i);
        }
    }
}*/

/*for i in -20..<20{
    if(i > 5 && i < 10){
        continue;
    }else{
        if(i % 2 == 0){
            print(i);
        }
    }
}*/

/*if let input = readLine(){
    if let number = Int(input){
        for _ in 1...number{
            print("X", terminator: "");
        }
    }
}*/

/*if let input = readLine(){
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
}*/

if let input = readLine(){
    if let number = Int(input){
        print("X");
        for i in 1...(number - 2){
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

