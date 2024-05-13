async function getData(x) {
  fetch(`http://localhost:3302/seeker/getCategory/${x}`) // must update according to port number
    .then((response) => response.json())
    .then((data) => {
      var text = "";
      if (data.length === 0) {
        text += `<br><br><b><h2>No ${x} has been registered yet</h2></b>`;
      }
      for (let i = 0; i < data.length; i++) {
        var data2 = `<div onclick='showData("${x}",${JSON.stringify(
          data[i]
        )})' class="card">
            <div class="card-left purple-bg">
            <img src="./../../uploads/${data[i]["profilePicture"]}">
            </div>
            <div class="card-center">
                <h3>${data[i]["fullname"]}</h3>
                <br>
                
                <p class="card-details">${x}</p>

                    
            </div>
            <div class="card-right">
            <p><ion-icon name="location-outline"></ion-icon> ${
              data[i]["hometown"]
            } </p>
                <br>                
                <p><ion-icon name="people-outline"></ion-icon> ${
                  data[i]["gender"]
                }</p>
                
            </div>
        </div>`;
        text += data2;
      }
      document.getElementById("providersDisplay").innerHTML = text;
    })
    .catch((error) => console.error("Error:", error));
}

function toggleShortlist(event) {
  event.preventDefault();
  var shortlistLink = document.getElementById("shortlistLink");
  shortlistLink.classList.toggle("shortlisted");
}
async function addShortList(category, email) {
  await fetch(`/seeker/shortlist/${category}/${email}`)
    .then((response) => response.json())
    .then((data) => {
      if (data["login"]) {
        var message = data["message"];
        window.location.href = `http://localhost:3302/login?message=${message}`; // must update according to port number
      } else {
        console.log("");
      }
    });
}
async function showData(category, obj) {
  var data = `<a href="#" onclick="addShortList('${category}','${obj["email"]}')" ><ion-icon name="bookmarks-outline"></ion-icon> Shortlist </a>
    <ion-icon class="close-detail" name="close-detail"></ion-icon>
    <div class="detail-header"><br>
    <img src="./../../uploads/${obj["profilePicture"]}">
        <h2>${obj["fullname"]}</h2>  
        <p>${category}</p>
    </div>
    <hr class="divider">
    <div class="detail-desc">
        <p><b>Gender:  </b>${obj["gender"]}</p>
    </div>
    <hr class="divider">
    <div class="detail-desc">
        <p><b>Home Town:  </b>${obj["hometown"]}</p>
    </div>
    <hr class="divider">
    <div class="detail-desc">
        <p><b>Phone No:  </b>${obj["phoneNo"]}</p>
    </div>
    <hr class="divider">
    <div class="detail-desc">
        <p><b>Email:  </b>${obj["email"]}</p>
    </div>
    <hr class="divider">
    <div class="detail-desc">
        <div class="about">
            <h4>About</h4>
            <p>${obj["about"]}</p>
        </div>
    
    </div>`;
  document.getElementById("detail").innerHTML = data;
}

async function showShortlisted() {
  fetch(`http://localhost:3302/seeker/getShortlisted`) // must update according to port number
    .then((response) => response.json())
    .then((data) => {
      if (data["login"]) {
        var message = data["message"];
        window.location.href = `http://localhost:3302/login?message=${message}`; // must update according to port number
      } else {
        var text = `<h2>My Shortlisted</h2><div style="text-align: right;">
    <a href="/seeker/findWorker"><button style="background-color: #3498db; color: #fff; padding: 10px 20px; border-radius: 10px;">Find Another Worker</button></a>
  </div><br><br>
    `;
        if (data.length === 0) {
          text += "<p>You have no shortlisted Providers</p>";
        } else {
          for (let i = 0; i < data.length; i++) {
            var data2 = `<div onclick='showData("${
              data[i]["skills"][0]
            }",${JSON.stringify(data[i])})' class="card">
          <div class="card-left purple-bg">
          <img src="./../../uploads/${data[i]["profilePicture"]}">
          </div>
          <div class="card-center">
              <h3>${data[i]["fullname"]}</h3>             
              <p class="card-details">${data[i]["skills"][0]}</p>
              <div class="card-sub">
              <p><ion-icon name="location-outline"></ion-icon> ${
                data[i]["hometown"]
              } </p>
                              
              <p><ion-icon name="people-outline"></ion-icon> ${
                data[i]["gender"]
              }</p>   </div>             
          </div>
          <div class="card-right">
          <a  href="/chat"><img src="/images/cmt.svg" width="30"></i></a>
<br><a href="#" onclick="deleteShortlist('${
              data[i]["email"]
            }')" class="button remove-button">
    Remove  <i class="fas fa-trash-alt"></i>
  </a>

              
          </div>
      </div>`;
            text += data2;
          }
        }
        document.getElementById("mainX").innerHTML = text;
      }
    })
    .catch((error) => console.error("Error:", error));
}

async function deleteShortlist(email) {
  await fetch(`/seeker/deleteShortlistedObject/${email}`)
    .then((response) => response.json())
    .then((data) => {
      if (data["result"]) {
        showShortlisted();
      } else {
        console.log("");
      }
    });
}
