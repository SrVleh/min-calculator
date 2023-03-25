
let validNums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
let validActions = ["/",  "*", "-", "+"]
let operation = " ";

let result = document.getElementById("result")
let operationsScreen = document.getElementById("operations")
let btnParent = document.getElementById("keys-container")
let btnList = [
    {btnClass: "btn special btn-ac", btnId: "btn-ac", btnContent: "AC"},
    {btnClass: "btn special", btnId: "btn-mod", btnContent: "%"},
    {btnClass: "btn action", btnId: "btn-divide", btnContent: "/"},
    {btnClass: "btn", btnId: "btn-7", btnContent: "7"},
    {btnClass: "btn", btnId: "btn-8", btnContent: "8"},
    {btnClass: "btn", btnId: "btn-9", btnContent: "9"},
    {btnClass: "btn action", btnId: "btn-multiply", btnContent: "*"},
    {btnClass: "btn", btnId: "btn-4", btnContent: "4"},
    {btnClass: "btn", btnId: "btn-5", btnContent: "5"},
    {btnClass: "btn", btnId: "btn-6", btnContent: "6"},
    {btnClass: "btn action", btnId: "btn-minus", btnContent: "-"},
    {btnClass: "btn", btnId: "btn-1", btnContent: "1"},
    {btnClass: "btn", btnId: "btn-2", btnContent: "2"},
    {btnClass: "btn", btnId: "btn-3", btnContent: "3"},
    {btnClass: "btn action", btnId: "btn-plus", btnContent: "+"},
    {btnClass: "btn btn-0", btnId: "btn-0", btnContent: "0"},
    {btnClass: "btn", btnId: "btn-period", btnContent: "."},
    {btnClass: "btn action", btnId: "btn-equals", btnContent: "="},
]

function InstantiateButtons(){
    let btnTemplate = btnList.map((btn, index) => {
        return [`
            <button id="#${btn.btnId}" class="${btn.btnClass}">${ btn.btnContent }</button>
        `]
    })
    btnTemplate = btnTemplate.join("");
    btnParent.innerHTML = btnTemplate;
    AddListeners();
}

function AddListeners() {
    btnList.map((btn, index) => {
        document.getElementById(`#${btn.btnId}`)
            .addEventListener("click", ()=> {
                GetPressedButton(btn.btnContent)
            })
    })
}

function GetPressedButton(btn) {
    if (validNums.some(validNum => btn.includes(validNum))) {
        Display(btn)
        if (validActions.some(validAction => operation.includes(validAction))) {
            DisplayTemporalResult()
        }
    }

    if (validActions.some(validAction => btn.includes(validAction))) {
        Display(btn)
        if (result.innerText !== "") {
            operation = " "
            Display(result.innerText + btn);
            result.innerText = ""
        }
    }

    if(btn === "AC") Clear();
    if(btn === "%") CalculatePercentage();
    if(btn === "=") CalculateFinalResult();
    if(btn === ".") Display(btn)
}


function Display(char) {
    operation += char;
    operationsScreen.innerText = operation;
}

function DisplayTemporalResult() {
    result.innerText = eval(operation);
}

function Clear() {
    operationsScreen.innerText = "";
    result.innerText = "";
    operation = "";
}

function CalculatePercentage() {
    operation = eval(operation + "/ 100");
    operationsScreen.innerText = operation
    DisplayTemporalResult();
}

function CalculateFinalResult() {
    operation = eval(operation);
    operationsScreen.innerText = operation;
    result.innerText = "";
}

InstantiateButtons()