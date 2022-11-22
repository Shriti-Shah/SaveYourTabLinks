// function saveLead(){
//     console.log("Button is clicked by onClick attribute");
// }        //we can remove this function

///now using EvenListener method
// let myLeads=["www.greatelead.com","www.awesomelead.com","www.factlead.com"];
let myLeads = [];
const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )      //Read About Local Storage
const tabBtn = document.getElementById("tab-btn");


if(leadFromLocalStorage)
{
  myLeads = leadFromLocalStorage
  renderLead(myLeads);
}


tabBtn.addEventListener("click", function(){
  // now we should push the url into myLeads array and show them
  chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){

    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLead(myLeads);
    })

  })


function renderLead(leads) {      //here leads is a parameter bcoz func is no more depend on globa variable as myLeads
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    // ulEl.textContent += myLeads[i] +" ";        //plane text
    // ulEl.innerHTML += "<li>"+myLeads[i]+"</li>";   //listed text like li do in HTML
    // listItems += "<li><a target='_blank' href='#'>" + myLeads[i] + "</a></li>";    this is theold method
    //heare leads is a parameter which refer to myLeads

    //this is template string
    listItems += `<li>
    <a target='_blank' href='${leads[i]}'>
    ${leads[i]}
    </a>
    </li>`;
  }

  ulEl.innerHTML = listItems;
}



deleteBtn.addEventListener("dblclick",function(){
  localStorage.clear()
  myLeads=[]
  renderLead(myLeads);
})

inputBtn.addEventListener("click", function () {
  // myLeads.push("www.awesomelead.com")
  myLeads.push(inputEl.value); //this is how you can take i/p & push into array
  inputEl.value = ""           //this will clear the input box

  //here we are going to use LocalStorage and JSON func
  localStorage.setItem("myLeads", JSON.stringify(myLeads))
  renderLead(myLeads);
});

