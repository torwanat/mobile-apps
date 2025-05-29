//
//  View2Controller.swift
//  Memory
//
//  Created by Mikołaj Nawrot on 18/11/2022.
//

import UIKit

class View2Controller: UIViewController {
    
    var easy = true
    var cardsTab: Array<UIButton> = []
    var valuesArr: Array<Int> = []
    var pair: Array<Int> = []
    var solved: Int = 0
    var moves: Int = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Do any additional setup after loading the view.
        
        if(easy){
            createEasyGame()
        }else{
            createHardGame()
        }
    }
    
    func calculateAvailableHeight() -> Double{
        let screenSize = UIScreen.main.bounds
        let navigationSize = self.navigationController?.navigationBar.bounds
        let statusBarSize = UIApplication.shared.statusBarFrame.height
        let tabBarSize = self.tabBarController?.tabBar.frame.size.height ?? 0
        let availableHeight = screenSize.height - (navigationSize?.height ?? 0) - statusBarSize - tabBarSize
        return availableHeight
    }
    
    func calculateAvailableWidth() -> Double{
        let screenSize = UIScreen.main.bounds
        return screenSize.width
    }
    
    func calculateCardDimensions() -> Double{
        let widthGap: Double
        let heightGap: Double
        let dimensions: Double
        if(easy){
            widthGap = 30
            heightGap = 45
        }else{
            widthGap = 45
            heightGap = 90
        }
        var availableHeight = calculateAvailableHeight() - heightGap
        var availableWidth = calculateAvailableWidth() - widthGap
        if(availableHeight >= availableWidth){
            if(easy){
                availableHeight += 8
                dimensions = availableHeight / 4
                return dimensions
            }else{
                availableHeight += 7
                dimensions = availableHeight / 7
                return dimensions
            }
        }else{
            if(easy){
                availableWidth -= 93
                dimensions = availableWidth / 4
                return dimensions
            }else{
                availableWidth -= 44
                dimensions = availableWidth / 7
                return dimensions
            }
        }
    }
    
    func createEasyGame(){
        cardsTab = []
        let dimensions = calculateCardDimensions()
        if(calculateAvailableHeight() >= calculateAvailableWidth()){
            let margin = (calculateAvailableWidth() - (3 * dimensions) - 30) / 2
            for i in 0...3{
                for j in 0...2{
                    let button: UIButton = UIButton()
                    let img = UIImage(named: "cardBack")
                    button.frame = CGRect(x: (margin + (dimensions + 15)*Double(j)), y: ((dimensions + 15)*Double(i) + 64), width: dimensions, height: dimensions)
                    button.tag = Int(String(i) + String(j))!
                    button.setBackgroundImage(img, for: UIControl.State.normal)
                    button.addTarget(self, action: #selector(clicked), for: UIControl.Event.touchUpInside)
                    cardsTab.append(button)
                    self.view.addSubview(button)
                }
            }
        }else{
            let margin = (calculateAvailableWidth() - (4 * dimensions) - 45) / 2
            for i in 0...2{
                for j in 0...3{
                    let button: UIButton = UIButton()
                    let img = UIImage(named: "cardBack")
                    button.frame = CGRect(x: (margin + (dimensions + 15)*Double(j)), y: ((dimensions + 15)*Double(i)  + 64), width: dimensions, height: dimensions)
                    button.tag = Int(String(i) + String(j))!
                    button.setBackgroundImage(img, for: UIControl.State.normal)
                    button.addTarget(self, action: #selector(clicked), for: UIControl.Event.touchUpInside)
                    cardsTab.append(button)
                    self.view.addSubview(button)
                }
            }
        }
        gameMechanics()
    }
    
    func createHardGame(){
        cardsTab = []
        let dimensions = calculateCardDimensions()
        if(calculateAvailableHeight() >= calculateAvailableWidth()){
            let margin = (calculateAvailableWidth() - (4 * dimensions) - 45) / 2
            for i in 0...6{
                for j in 0...3{
                    let button: UIButton = UIButton()
                    let img = UIImage(named: "cardBack")
                    button.frame = CGRect(x: (margin + (dimensions + 15)*Double(j)), y: ((dimensions + 15)*Double(i) + 64), width: dimensions, height: dimensions)
                    button.tag = Int(String(i) + String(j))!
                    button.setBackgroundImage(img, for: UIControl.State.normal)
                    button.addTarget(self, action: #selector(clicked), for: UIControl.Event.touchUpInside)
                    cardsTab.append(button)
                    self.view.addSubview(button)
                }
            }
        }else{
            let margin = (calculateAvailableHeight() - (4 * dimensions) - 45) / 2
            for i in 0...3{
                for j in 0...6{
                    let button: UIButton = UIButton()
                    let img = UIImage(named: "cardBack")
                    button.frame = CGRect(x: ((dimensions + 15)*Double(j)), y: (margin + (dimensions + 15)*Double(i) + 64), width: dimensions, height: dimensions)
                    button.tag = Int(String(i) + String(j))!
                    button.setBackgroundImage(img, for: UIControl.State.normal)
                    button.addTarget(self, action: #selector(clicked), for: UIControl.Event.touchUpInside)
                    cardsTab.append(button)
                    self.view.addSubview(button)
                }
            }
        }
        gameMechanics()
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        if(easy){
            changeEasyOrientation(landscape: UIDevice.current.orientation.isLandscape)
        }else{
            changeHardOrientation(landscape: UIDevice.current.orientation.isLandscape)
        }
    }
    
    func changeEasyOrientation(landscape: Bool){
        let dimensions = calculateCardDimensions()
        var column = 0
        var row = 0
        if(landscape){
            let margin = (calculateAvailableWidth() - (4 * dimensions) - 45) / 2
            for card in cardsTab{
                card.frame = CGRect(x: (margin + (dimensions + 15) * Double(column)), y: ((dimensions + 15) * Double(row) + 64), width: dimensions, height: dimensions)
                column += 1
                if(column == 4){
                    row += 1
                    column = 0
                }
            }
        }else{
            let margin = (calculateAvailableWidth() - (3 * dimensions) - 30) / 2
            for card in cardsTab{
                card.frame = CGRect(x: (margin + (dimensions + 15) * Double(column)), y: ((dimensions + 15) * Double(row) + 64), width: dimensions, height: dimensions)
                column += 1
                if(column == 3){
                    row += 1
                    column = 0
                }
            }
        }
    }
    
    func changeHardOrientation(landscape: Bool){
        let dimensions = calculateCardDimensions()
        var column = 0
        var row = 0
        if(landscape){
            let margin = (calculateAvailableHeight() - (4 * dimensions) - 45) / 2
            for card in cardsTab{
                card.frame = CGRect(x: ((dimensions + 15) * Double(column)), y: (margin + (dimensions + 15) * Double(row) + 64), width: dimensions, height: dimensions)
                column += 1
                if(column == 7){
                    row += 1
                    column = 0
                }
            }
        }else{
            let margin = (calculateAvailableWidth() - (4 * dimensions) - 45) / 2
            for card in cardsTab{
                card.frame = CGRect(x: (margin + (dimensions + 15) * Double(column)), y: ((dimensions + 15) * Double(row) + 64), width: dimensions, height: dimensions)
                column += 1
                if(column == 4){
                    row += 1
                    column = 0
                }
            }
        }
    }
    
    func gameMechanics(){
        var refArr: Array<Int> = []
        pair = []
        pair.append(-1)
        pair.append(-1)
        solved = 0
        moves = 0
        var counter: Int = 0
        if(easy){
            for _ in 0...1{
                for i in 0...5{
                    refArr.append(i)
                    valuesArr.append(0)
                }
            }
        }else{
            for _ in 0...1{
                for i in 0...13{
                    refArr.append(i)
                    valuesArr.append(0)
                }
            }
        }
        for card in cardsTab{
            let random = refArr.randomElement()!
            card.tag = random
            valuesArr[counter] = random
            let index = refArr.firstIndex(of: random)
            refArr.remove(at: index!)
            counter += 1
        }
    }
    
    @objc func clicked(sender:UIButton){
        let img = UIImage(named : "./img/\(sender.tag + 1).png")!
        sender.setBackgroundImage(img, for: UIControl.State.normal)
        moves += 1
        choice(button: sender)
    }

    func choice(button: UIButton){
        if(pair[0] == -1){
            pair[0] = button.tag
            button.isEnabled = false
            return
        }else{
            pair[1] = button.tag
            button.isEnabled = false
            sleep(3)
            if(self.pair[0] != self.pair[1]){
                for card in self.cardsTab{
                    if(card.tag == self.pair[0] || card.tag == self.pair[1]){
                        card.isEnabled = true
                        card.setBackgroundImage(UIImage(named: "none.png"), for: UIControl.State.normal)
                    }
                }
                pair[0] = -1
                pair[1] = -1
            }else{
                solved += 1
                pair[0] = -1
                pair[1] = -1
                checkWin()
            }
        }
    }
    
    func checkWin(){
        if((easy && solved == 6) || (!easy && solved == 14)){
            endGame()
        }
    }
    
    func endGame(){
        let onlyOption = UIAlertAction(title: "Spadam", style: .default){ (action) in
            self.navigationController?.popToRootViewController(animated: true)
        }
        let alert = UIAlertController(title: "Wygrales!", message: "Twoja liczba ruchow: \(moves)", preferredStyle: .alert)
        alert.addAction(onlyOption)
        self.present(alert, animated: true)
    }
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
