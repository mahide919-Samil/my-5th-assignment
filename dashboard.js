const container = document.getElementById("issueContainer");
const loader = document.getElementById("loader");
const issueCount = document.getElementById("issueCount");
const searchInput = document.getElementById("searchInput");

const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");

let allIssues = [];


// LOAD ALL ISSUES
async function loadIssues(){

loader.classList.remove("hidden");

try{

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

}
catch(err){

console.log(err);

}

loader.classList.add("hidden");

}

loadIssues();




// UPDATE HEADER
function updateHeader(issues){

const openCount = issues.filter(i => i.status === "open").length;

const closedCount = issues.filter(i => i.status === "closed").length;

issueCount.innerText = issues.length + " Issues";

const headerRight = document.getElementById("headerStatus");

headerRight.innerHTML = `

<span class="flex items-center gap-1">
<span class="w-2 h-2 bg-green-500 rounded-full"></span>
${openCount} Open
</span>

<span class="flex items-center gap-1">
<span class="w-2 h-2 bg-red-500 rounded-full"></span>
${closedCount} Closed
</span>

`;

}




// DISPLAY ISSUES
function displayIssues(issues){

container.innerHTML = "";

updateHeader(issues);

issues.forEach(issue => {

const card = document.createElement("div");


const borderColor =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500";


card.className =
`bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg ${borderColor}`;


card.innerHTML = `

<h3 class="font-bold mb-2">${issue.title}</h3>

<p class="text-sm text-gray-500 mb-2">
${issue.description?.slice(0,60)}...
</p>

<p class="text-xs">Author: ${issue.author}</p>

<p class="text-xs">Priority: ${issue.priority}</p>

<p class="text-xs">Label: ${issue.category}</p>

<p class="text-xs text-gray-400">
${new Date(issue.createdAt).toLocaleDateString()}
</p>

<p class="${issue.status === "open" ? "text-green-600" : "text-purple-600"} font-semibold">
${issue.status}
</p>

`;

card.onclick = () => loadIssueDetails(issue._id);

container.appendChild(card);

});

}



// LOAD SINGLE ISSUE
async function loadIssueDetails(id){

try{

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();

const issue = data.data;


document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDesc").innerText = issue.description;

document.getElementById("modalAuthor").innerText =
"Author: " + issue.author;

document.getElementById("modalPriority").innerText =
"Priority: " + issue.priority;

document.getElementById("modalStatus").innerText =
"Status: " + issue.status;

document.getElementById("modalCategory").innerText =
"Label: " + issue.category;


document.getElementById("modal").classList.remove("hidden");



}
catch(err){

console.log(err);

}

}



// CLOSE MODAL
function closeModal(){
    // const modal = document.getElementById("modal");
    // modal.classList.remove("hidden");
    // modal.classList("flex")

document.getElementById("modal").classList.add("hidden");

}

 

// SEARCH
async function searchIssues(){

const text = searchInput.value.trim();

if(text === ""){

displayIssues(allIssues);

return;

}

try{

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();

displayIssues(data.data);

}
catch(err){

console.log(err);

}

}



// ACTIVE TAB
function setActive(btn){

document.querySelectorAll(".tabBtn").forEach(b=>{

b.classList.remove("bg-purple-600","text-white");

b.classList.add("bg-gray-200");

});

btn.classList.add("bg-purple-600","text-white");

}



// FILTER
allBtn.onclick = () => {

setActive(allBtn);

displayIssues(allIssues);

};


openBtn.onclick = () => {

setActive(openBtn);

const openIssues = allIssues.filter(i => i.status === "open");

displayIssues(openIssues);

};


closedBtn.onclick = () => {

setActive(closedBtn);

const closedIssues = allIssues.filter(i => i.status === "closed");

displayIssues(closedIssues);

};