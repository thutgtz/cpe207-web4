document.querySelector('#myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // prevent default form submitting
  e.preventDefault();

  // get form values
  var subject = document.querySelector('#sn').value;
  var massege = document.querySelector('#ms').value;
  var name = document.querySelector('#name').value;
  var email = document.querySelector('#em').value;
  var phone = document.querySelector('#phone').value;

  
  if (!validateForm(subject,massege,name,email,phone)) {
     return false;
   }

  var bookmark = {
    Subject: subject,
    Email: email,
    Name : name,
    Massege : massege,
    Phone : phone

  }

  console.log(bookmark);

  // // local storage test
  // localStorage.setItem('bookmarks',JSON.stringify(bookmark));
  // console.log(JSON.parse(localStorage.getItem('bookmarks')));

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  
  // Clear fields
  document.querySelector('#sn').value='';
  document.querySelector('#ms').value='';
  document.querySelector('#name').value='';
  document.querySelector('#em').value='';
  document.querySelector('#phone').value='';

  fetchBookmarks();  
}

function deleteBookmark(n) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i=0; i<bookmarks.length; i++) {
    if (bookmarks[i].Name === n) {
      bookmarks.splice(i,1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.querySelector('#bookmarksResults');

  bookmarksResults.innerHTML = '';

  var str ="";
  
  for (var i=0; i<bookmarks.length; i++) {
    var n = bookmarks[i].Name;
    var e = bookmarks[i].Email;
    var s = bookmarks[i].Subject;
    var m = bookmarks[i].Massege;
    var p = bookmarks[i].Phone;
   
    
    str +='<div class="card-deck text-center" >'
        +`<div class="card mb-4 shadow-sm">`
        + `<div class="text-left"><a onclick="deleteBookmark('${n}')" class="btn btn-danger" href="#" >X</a></div>`
        + `<div class="card-header"><h5 class="my-0">${s}</h5></div><br>`
        + `<div class="text-left p-2"><h5>Name : <h6 class="text-center">${n}</h6></h5><h5>Phone : <h6 class="text-center">${p}</h6></h5></div>`
        + `<div class="card-deck text-center p-2" ><div class="card mb-1 shadow-sm">`
        + `<div class="text-left p-4"><p>${m}</p></div>`
        + `</div></div>`
        + `<div class="card-body" style="width: 200px text-align: center">`
        + ` <a class="btn btn-danger m-1" href="mailto:${e}" >Contact</a>`
        + `</div></div>`
        +'</div>';
  }

  bookmarksResults.innerHTML = str;
}

function validateForm(subject,massege,name,email,phone) {
  if (subject == ""|| massege=="" || name=="" || email=="" || phone=="") {
    alert('Please fill in all data fields');
    return false;
  }

 

  return true;
}