//
//  View1Controller.swift
//  Memory
//
//  Created by Mikołaj Nawrot on 18/11/2022.
//

import UIKit

class View1Controller: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        self.view.backgroundColor = UIColor(patternImage: UIImage(named: "Background")!)
    }
    
    @IBOutlet weak var mode: UISegmentedControl!
    
    @IBOutlet weak var btGo: UIButton!
    
    @IBAction func modeChanged(_ sender: Any) {
        switch mode.selectedSegmentIndex{
        case 0:
            btGo.setTitle("Easy", for: .normal)
            btGo.isEnabled = true
        case 1:
            btGo.setTitle("Hard", for: .normal)
            btGo.isEnabled = true
        default:
            btGo.setTitle("Wybierz tryb", for: .normal)
        }
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        let dest = segue.destination as! View2Controller
        dest.easy = mode.selectedSegmentIndex == 0 ? true : false
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
