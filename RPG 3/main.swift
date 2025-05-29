import Foundation
/*
 LORE
 
 
var choices: [String: String] = [:];
choices = ["poczatek": "wybierz prawo lub lewo",
           "lewo": "poszedles w lewo, dokad dalej? Wybierz gora lub jaskinia",
           "prawo": "poszedles w prawo, dokad dalej? Wybierz miasto lub jaskinia",
           "gora": "podczas wychodzenia na gore poslizgnales sie i upadles \n * KONIEC GRY *",
           "jaskinia": "wszedles do jaskini. znalazles w niej kilka dorgocennych kamieni. mozesz isc z nimi do miasta i probowac je sprzedac, lub wziac je do maga. wybierz rynek lub mag",
           "miasto": "jestes w miescie",
           "rynek": "znajdujesz sie na rynku w miescie. znajduja sie tu rozne kramy, na ktorych moglbys sprzedac znalezione klejnoty. oczywistym wyborem bylby kram jubilera, ktory na pewno fachowo oceni ich wartosc. mozesz jednak udac sie na gielde, i liczyc na sprzedaz ich po wyzszej cenie tamtejszym handlarzom. trzecia, najbardziej ryzykowna opcja jest udanie sie na kramy biedoty i proba ich sprzedazy jako \"magicznych klejnotow\" (co nawet moze byc prawda) wybierz jubiler, gielda lub kramy",
           "jubiler": "jubiler ocenia fachowym okiem twoje kamienie i prponuje cene 100 monet. mozesz ja zaakceptowac, lub targowac sie o wiecej. wybierz sprzedaz lub negocjacja",
           "zagubienie": "poprzez twoje niezdecydowanie nie zdazyles dojsc do celu przed zachodem slonca. szukajac drogi po ciemku, zbladziles i spadles ze skal \n * KONIEC GRY *"];

print(choices["poczatek"] ?? "");
var game = true;
while(game){
    var choice = readLine();
    if(choices[choice ?? ""] == nil){
        choice = "zagubienie";
    }
    if ((choices[choice ?? ""] ?? "").contains("*")){
        print(choices[choice ?? ""] ?? "cos poszlo ostro nie tak jesli to widisz");
        game = false;
    }else{
        print(choices[choice ?? ""] ?? "");
    }
}
*/

var options = ["eventName": ["option": "nextEvent"]];
var events = ["event": "text"];
var game = true;
var alphabet = "ABCDEF";
var optionCounter = 0;
events = ["overview_4": "Jest rok 3308 i ludzkość panuje nad kosmosem. Dzięki wynalezieniu napędu FSD, paliwa wodorowego i kompputerów potężniejszych, niż kiedykolwiek wcześniej, gwiazdy znalazły się w zasięgu ręki. Poczynając od 22 wieku, ludzkość masowo zaczyna kolonizwoać kosmos. Jednak o ile na Ziemi wojna światowa dobitnie pokazała, że jedynie zjednoczona ludzkość przeżyje, odkrywcy kosmosu zapomnieli o tej lekcji. Już pierwsza ludzka kolonia poza Układem Słonecznym wkrótce po osiągnięciu samowystarczalności ogłosiła niepodległość, zmuszając władze z Ziemi do zbrojnej interwencji. I o ile obie strony doszły w końcu do ugody, tak nie zakończyło to sporów na zawsze. Ludzka chciwość doprowadziła do wytępienia wszystkich obcych form życia, najpierw na Tau Ceti, a potem w kolejnych koloniach. I o ile z czasem ludzie zaczęli przykładać większą wagę do ochrony obcych, tak cały czas nie mogą pogodzić się ze sobą. Na tym polega paradoks ludzkiego zachowania: mimo, że praktycznie nieskończony wszechświat jest na wyciągnięcie ręki, ludzie i tak walczą między sobą o najmniejszą drobnostkę, przelewając niepotrzebnie krew. Dzisiaj, kiedy zasiedlonych systemów są tysiące, a populację ludzkości liczy się w tryliardach, trzy największe mocarstwa rywalizują o wpływy w zamieszkałej przestrzeni: Imperium, Federacja i Sojusz. Mimo ich nieustannych nacisków tysiące systemów wybierają \"czwartą drogę\", będąc niezależnymi od żadnego z nich. Wybierz opcję: \nA - Informacje o Imperium \nB - informacje o Federacji \nC - informacje o sojuszu \nD - kontynuuj fabułę",
          "overviewEmpire_1": "Imperium \n\"Kiedy nasi przodkowie opuścili Ziemię, zadali sobie pytanie: które z naszych osiągnięć reprezentuje to, co najlepsze w ludzkości, abyśmy mogli zabrać je ze sobą, aby oświetlić ciemność? Federacja, uwikłana w świat kontraktów i drobnych sprzeczek, wybrała swoją Konstytucję. Zaufali nie samemu człowiekowi, ale niedoskonałemu dziełu człowieka. Ale mój przodek – twój pierwszy cesarz – był mądrzejszy. Wiedział, że najlepszym osiągnięciem ludzkości jest sama ludzkość. W jednym nukleotydzie jego szlachetnego DNA było więcej mądrości niż we wszystkich pisanych tekstach Federacji. Ta sama mądrość wciąż nas prowadzi. Nie potrzebujemy zakurzonych dokumentów, aby dowodzić naszych praw! Jesteśmy ludźmi, urodziliśmy się by rządzić... a wszechświat czeka na silną rękę naszego rządzenia.\" Ten cytat Imperatora Traskena Duvala II bardzo dobrze podsumowuje podstawy Imperium Achenarskiego. Podczas gdy Federacja zdecydowała się kontynuować liberalne tradycje Ziemi, tak władcy Imperium postanowili rządzić za pomocą silnej ręki. Po założeniu pierwszej swojej kolonii w systemie Achenar, Imperator Henson Duval wprowadził serię praw zmieniającyh pacyfistyczną republikę w autokratyczną monarchię, z mocno ograniczoną rolą Senatu Imperium. Gdy wieści o tym dotarły do Federacji, zdecydowano się na wysłanie do ekspedycji karnej do Achenaru. Przybyła tam flota została jednak zaskoczona przez siły imperialne i zmuszona była się wycofać. Wojna podjazdowa, która trwała przez następne lata, zakończyła się ostatecznie porażką Federacji i uznaniem przez nią niezalezności Imperium. Od tego czasu stosunki między tymi dwoma mocarstwami są chłodne, a często wybuchające konflikty pochłonęły niezliczoną ilość ofiar. Społeczeństwo imeprialne oparte jest na systemie feudalnym, w którym tylko arystokracji przysługują swobody i prawa wyborcze, a praca niewolnicza wykorzystywana jest w każdym sektorze gospodarki. Wybierz opcję: \nA - powrót",
          "overviewFederation_1": "Federacja \n \"Jak zatem podjąć niewykonalne zadanie podsumowania Federacji? To my wyznaczamy granice. Nasi przodkowie, którzy przeżyli gorzką udrękę globalnych wojen, wyznaczyli linię i oświadczyli: nigdy więcej. Zapisaliśmy prawa wszystkich obywateli w naszej Konstytucji, podkreśliliśmy je i podpisaliśmy. Wykreśliliśmy linie, które jako pierwsze połączyły systemy gwiezdne, sprowadzając ludzkość do wybrzeży nowych światów, otwierając drogę do międzygwiezdnego handlu. A kiedy sama ludzkość, w obfitości młodości, zagroziła delikatnej równowadze obcego życia, ponownie narysowaliśmy granicę; do tej pory kroczmy zgodnie z prawem, a nie dalej.\" To cytat z mowy inauguracyjnej Isaaca Gellana, byłego prezydenta Federacji. Powstała ze zjednoczenia państw na Ziemi, Federacja jest najstarszym państwem międzygwiezdnym. W uchwalonej po buncie kolonii ludzkiej w systemie Tau Ceti konstytucji, Federacja zobowiązuje się chronić praworządności, demorkacji i wolności obywatelskich, a także proklamuje równouprawnienie wszystkich form życia. Ten wyidealizowany dokument często przegrywa starcie z rzeczywistością, w której to ogromne międzykalaktyczne korporacje wywierają wpływ na senatorów obradujących w stolicy Federacji, na Marsie, a skandale korupcyjne regularnie pojawiają się na łamach gazet. Mimo wszystko mieszkańcy systemów wchodzących w jej skład mogą cieszyć się swobodnym życiem na wysokim z reguły poziomie, mimo czunych oczu Federalnej Agencji Bezpieczeństwa. Wybierz opcję: \nA - powrót",
          "overviewAlliance_1": "Sojusz \n \"Jeśli mamy doprowadzić do powstania Sojuszu Niezależnych Systemów, potrzebujemy czegoś więcej niż przemów bohaterów wojennych. Musimy pokazać ludziom, że to cholerstwo może działać. Chcę plany wydatków, prognozy dywidend, raporty geodetów. Chcę danych tak suchych, że nie musisz w nie wierzyć. Ludzie są zmęczeni i wykończeni. Obie strony zbyt wiele razy sprzedały im sny, więc nie próbujmy ich więcej sprzedawać. Czas się obudzić.\" Ta prywatna wiadomość wymieniona między Ojcami Założycielami Sojuszu, Meredithem Argentem i Miciem Turnerem, wiele mówi o podstawie, na jakiej opiera się Sojusz. Zgodnie z zasadą \"Gdzie dwóch się bije, tam wszyscy cierpią\", populacja systemu Alioth, mimo posiadania ogromnych złóż gazu i minerałów praktycznie pod ręką, żyła w biedzie. O ten system bowiem toczyły się praktycznie nieustanne walki między Federacją a Imperium. Przez wieki system ten był podzielony między te dwa mocarstwa, a populacja wyzyskiwana przez obie strony jednakowo. Wszelkie próby buntu kończyły się tragicznie, a na powstańcach stosowano surowe kary. Mieszkańcy Alioth nie tracili jednak nadziei na to że kiedyś będą żyli w świecie wolnym od obcej opresji. Gdy w 3228 federacyjna megakorporacja ogłosiła podniesienie cen żywności, mieszkańcy planety Turner's World ogłosili strajk. Próby rozbicia go siłą zarówno przez Federację, jak i Imperium spełzły na niczym, a dzięki pomocy pobliskich niepodległych systemów udało się wypędzić okręty obu walczących stron. Zarówno od niedawna niepodległy Alioth, jak i inne pobliskie systemy zdawały sobie sprawę, że prędzej czy później najeźdźcy powrócą. W 3230 r. został utworzony Sojusz Niepodległych Systemów, ostoja demokracji wśród autorytartyzmu Imperium i skrajnego kapitalizmu Federacji. Systemy Sojuszu szczycą się posiadaniem największych praw obywatelskich w zamieszkałej przestrzeni, a ich obywatele nie są wykorzystywani przez żadne korporacje, ani arystokratów. Niemniej jednak Sojsuz cały czas jest najmniejszym z trzech mocarstw, a jego parlament, mimo że najbardziej demokratyczny ze wszystkich mocarstw, jest często skłócony i długo debatuje nad każdą ustawą. Wybierz opcje: \nA - powrót",
          "endEvent_0": "no i umarles"];
options["overview_4"] = ["A": "overviewEmpire_1", "B": "overviewFederation_1", "C": "overviewAlliance_1", "D": "endEvent_0"];
options["overviewEmpire_1"] = ["A": "overview_4"];
options["overviewFederation_1"] = ["A": "overview_4"];
options["overviewAlliance_1"] = ["A": "overview_4"];
var eventName = "overview_4";
var eventText = "what do you want to know? A - Empire, B - Federation, or C - Alliance?";
var choice = "";
print(eventText);
while(game){
    var optionCounter = 0;
    var isValidOption = false;
    let amountOfOptionsIndex = eventName.index(eventName.endIndex, offsetBy: -1);
    let amountOfOptions = eventName[amountOfOptionsIndex...];
    let tempOptions = Int(amountOfOptions) ?? 0;
    if(tempOptions != 0){
        choice = readLine() ?? "";
    }
    if(tempOptions == 0){
        game = false;
    }
    for i in alphabet{
        if(String(i) == choice && optionCounter < tempOptions){
            isValidOption = true;
            break;
        }
        optionCounter += 1;
    }
    if(isValidOption){
        eventText = events[options[eventName]![choice]!]!;
        eventName = options[eventName]![choice]!;
        print(eventText);
    }else{
        if(tempOptions == 0){
            continue;
        }else{
            print("Nie ma takiej opcji");
        }
    }
}

