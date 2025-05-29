func intCheck(anyArr:[Any]) -> Array<Int>{
    var intArr:[Int] = [];
    anyArr.forEach { value in
        if(type(of: value) == Int.self){
            intArr.append(value as! Int);
        }
    }
    return intArr;
}

func arrSpin(tab: String){
    let allArr = Array(tab);
    var spinArr: [String] = [];
    var spin = true;
    var allCounter = 0;
    var tempAdd = "";
    for i in allArr{
        if(i != allArr[0] && i != allArr.last){
            if(i != ","){
                tempAdd += String(i);
            }else{
                spinArr.append(tempAdd);
                tempAdd = "";
            }
        allCounter += 1;
        }
    }
    spinArr.append(tempAdd);
    var endArr = spinArr;
    while(spin){
        let choice = readLine() ?? "";
        let startChoice = choice.startIndex;
        let secondChoice = choice.index(choice.startIndex, offsetBy: 1);
        let endChoice = choice.index(choice.endIndex, offsetBy: -1);
        let startRangeChoice = startChoice...startChoice;
        let prefix = choice[startRangeChoice];
        var amountOfSpins = 0;
        if(choice.count > 1){
            let endRangeChoice = secondChoice...endChoice;
            let suffix = choice[endRangeChoice];
            amountOfSpins = Int(suffix) ?? 0;
        }
        switch(prefix){
            case "k":
                spin = false;
                break;
            case "R":
                print(endArr);
                for _ in 1...amountOfSpins{
                    spinArr = endArr;
                    var counter = 0;
                    for i in spinArr{
                        if(i == spinArr.last){
                            endArr[0] = i;
                        }else{
                            endArr[counter + 1] = i;
                        }
                        counter += 1;
                    }
                    print(endArr);
                }
            case "L":
                print(endArr);
                for _ in 1...amountOfSpins{
                    spinArr = endArr;
                    var counter = 0;
                    for i in spinArr{
                        if(i == spinArr[0]){
                            endArr[endArr.count - 1] = i;
                        }else{
                            endArr[counter - 1] = i;
                        }
                        counter += 1;
                    }
                    print(endArr);
                }    
            default:
                print("Błędna komenda");
        }
    }
}

func checkDimensions(matrix1: [[Any]], matrix2: [[Any]]) -> Bool{
    if(matrix1.isEmpty || matrix2.isEmpty || matrix1.count != matrix2[0].count || matrix1[0].count != matrix2.count){
        return false;
    }else{
        return true;
    }
}

func checkTypes(matrix1: [[Any]], matrix2: [[Any]]) -> Bool{
    for i in 0..<matrix1.count{
        for j in 0..<matrix1[0].count{
            if(!(matrix1[i][j] is Int) || !(matrix2[j][i] is Int)){
                return false;
            }
        }
    }
    return true;
}

func multiplyMatrixes(matrix1: [[Any]], matrix2: [[Any]]) -> [[Int]]{
    var intMatrix1: [[Int]] = [];
    var intMatrix2: [[Int]] = [];
    var output: [[Int]] = [];
    if(checkDimensions(matrix1: matrix1, matrix2: matrix2) && checkTypes(matrix1: matrix1, matrix2: matrix2)){
        for i in 0..<matrix1.count{
            var temp: [Int] = [];
            for j in 0..<matrix1[0].count{
                temp.append(matrix1[i][j] as! Int);
            }
            intMatrix1.append(temp);
        }
        for i in 0..<matrix2.count{
            var temp: [Int] = [];
            for j in 0..<matrix2[0].count{
                temp.append(matrix2[i][j] as! Int);
            }
            intMatrix2.append(temp);
        }
        print(intMatrix1);
        print(intMatrix2);
        for i in 0..<intMatrix1.count{
            var tempArr: [Int] = [];
            for j in 0..<intMatrix1.count{
                var sum = 0;
                for k in 0..<intMatrix1[0].count{
                    sum += intMatrix1[i][k] * intMatrix2[k][j];
                }
                tempArr.append(sum);
            }
            output.append(tempArr);
        }
        return output;
    }else{
        print("Błędne dane wejściowe!");
        return output;
    }
} 

//let ex1 = ["1", "dadada", 22, 124, "jkoajdsada", false] as [Any];
//print(intCheck(anyArr: ex1));
//let string = "[1,2,3,4,5,6,7,8,9,10]";
//print(arrSpin(tab: string));
print(multiplyMatrixes(matrix1: [[1,0,2],[-1,3,1]], matrix2: [[3,1],[2,1],[1,0]]));