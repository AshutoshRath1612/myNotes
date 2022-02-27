

//  When page reload every notes show show
showNotes();
// When user add a node , it is added to the local storage
 let addbtn = document.getElementById('addbtn');


// To add notes in loacal storage
 addbtn.addEventListener('click' , function(e){
     let addtitle = document.getElementById('addtitle');
     let addtxt = document.getElementById('addtxt');
     let notes = localStorage.getItem('notes');
     let notestitle = localStorage.getItem('notestitle');
     if(notes == null){
         notesObj = [];
         notesHead = [];
     }
     else{
         notesObj = JSON.parse(notes);
         notesHead = JSON.parse(notestitle);
     }

     notesObj.push(addtxt.value);
     notesHead.push(addtitle.value);
     localStorage.setItem("notes" , JSON.stringify(notesObj));
     localStorage.setItem("notestitle" , JSON.stringify(notesHead));
     addtxt.value="";
     addtitle.value="";
    //  console.log(notesObj);
    //  console.log(notesHead);

     showNotes();
 })

//  To show notes in html page
 function showNotes(){
     let notes = localStorage.getItem("notes");
     let notestitle = localStorage.getItem("notestitle")
     if(notes == null){
        notesObj = [];
        notesHead = [];
    }
    else{
        notesObj = JSON.parse(notes);
        notesHead = JSON.parse(notestitle);
    }


    //  Add a card element in the page
     let addednote = "";
     notesObj.forEach(function(element,index){
        //  console.log(notesHead)
         addednote += `
         <div class="noteCard card mx-2 my-2" style="width: 18rem;">
         <div class="card-body">
             <h5 class="card-title">${notesHead[index]}</h5>
             <p class="card-text">${element}</p>
             <a id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</a>
         </div>
     </div>`;
     });
let noteselem = document.getElementById('notes');
if(notesObj.length !=0){
    noteselem.innerHTML = addednote;
}
else{
    noteselem.innerHTML = '<h2>No notes to show</h2>'
}
 }


//  To delete a node
function deleteNode(index){
    let notes = localStorage.getItem("notes");
     let notestitle = localStorage.getItem("notestitle")
     if(notes == null){
        notesObj = [];
        notesHead = [];
    }
    else{
        notesObj = JSON.parse(notes);
        notesHead = JSON.parse(notestitle);
    }
    notesHead.splice(index ,1);
     notesObj.splice(index , 1);
     localStorage.setItem("notes" , JSON.stringify(notesObj));
     localStorage.setItem("notestitle" , JSON.stringify(notesHead));
    showNotes();
}


// Customizing the searchbar

let searchtxt = document.getElementById(('searchtxt'));
searchtxt.addEventListener('input' , function(){
    let inputVal = searchtxt.value.toLowerCase();
    let noteCard = document.getElementsByClassName('noteCard');
    Array.from(noteCard).forEach(function(element){
        let cardname = element.getElementsByTagName('p')[0].innerText
        let cardtitle = element.getElementsByTagName('h5')[0].innerText
        if(cardname.includes(inputVal) || cardtitle.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})