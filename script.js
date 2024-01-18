// Path: https://api.github.com
// User -> users/darelife
// Repos -> users/darelife/repos
// Followers -> users/darelife/followers
// Following -> users/darelife/following
// Starred -> users/darelife/starred
// Subscriptions -> users/darelife/subscriptions
// Organizations -> users/darelife/orgs
// Events -> users/darelife/events
// Received Events -> users/darelife/received_events
// Gists -> users/darelife/gists
// Specific repo -> repos/darelife/DevSocModule2
// Specific repo contributors -> repos/darelife/DevSocModule2/contributors
// Specific repo languages -> repos/darelife/DevSocModule2/languages
// Specific repo teams -> repos/darelife/DevSocModule2/teams
// Specific repo tags -> repos/darelife/DevSocModule2/tags
// Specific repo branches -> repos/darelife/DevSocModule2/branches
// Specific repo commits -> repos/darelife/DevSocModule2/commits
// Specific repo comments -> repos/darelife/DevSocModule2/comments
// Specific repo forks -> repos/darelife/DevSocModule2/forks
// Specific repo issues -> repos/darelife/DevSocModule2/issues
// Specific gist -> gists/1
// Specific gist commits -> gists/1/commits
// Specific gist comments -> gists/1/comments
// Specific gist forks -> gists/1/forks

// async function getavatar(username){
//     let res = await fetch("https://api.github.com/users/" + username);
//     let data = await res.json();
//     let basicData = document.getElementById("basicData");
//     let profilePicture = document.createElement("div");
//     let basicdetails = document.createElement("div");
//     basicData.appendChild(profilePicture);
//     basicData.appendChild(basicdetails);
//     basicdetails.innerHTML = `test<br>test2test3`;
//     basicdetails.style.paddingTop = "1rem";
//     profilePicture.style.display = "inline-block";
//     basicdetails.style.display = "inline-block";
//     profilePicture.style.marginRight = "1rem";
//     profilePicture.id = "profilePicture";
//     basicdetails.id = "basicdetails";
//     console.log(profilePicture);
//     let image = document.createElement("img");
//     image.id = "avatar2";
//     image.style.width = "5rem";
//     image.style.borderRadius = "50%";
//     image.style.height = "5rem";
//     basicData.style.backgroundColor = "#2a2b2f";
//     basicData.style.border = "0.3rem solid #2a2b2f"
//     image.src = data.avatar_url;
//     // image.innerHTML = `<img src="${data.avatar_url}" alt="Avatar" class="avatar" style="width=5rem;height=5rem;border-radius=50%">`;
//     profilePicture.appendChild(image);
// }

async function getavatar(username) {
    // Fetch User Response from the github API
    let response = await fetch("https://api.github.com/users/" + username);
    let data = await response.json();

    // Basic DOM Stuff
    let userData = document.getElementById("userData");
    let profilePicture = document.createElement("div");
    let name = document.createElement("div");
    let basicdetails = document.createElement("div");

    // Code for profile picture
    profilePicture.id = "profilePicture";
    image = document.createElement("img");
    image.src = data.avatar_url;
    image.id = "avatar";
    image.style = "width: 5rem; height: 5rem; border-radius: 50%; margin: 1rem;"
    profilePicture.appendChild(image);

    // Code for the name
    name.id = "name";
    name.innerHTML = `<a href="${data.html_url}" target="_blank">${data.name}</a>`;
    // name.style.marginRight = "1rem";

    // Code for the basic details
    basicdetails.id = "basicdetails";
    basicdetails.innerHTML = `<span class="basicdetailsdata">Followers: ${data.followers}</span><br><span class="basicdetailsdata">Following: ${data.following}</span><br><span class="basicdetailsdata">Public Repos: ${data.public_repos}</span><br><span class="basicdetailsdata">Public Gists: ${data.public_gists}</span>`;
    

    // Appending
    userData.appendChild(profilePicture);
    userData.appendChild(name);
    userData.appendChild(basicdetails);
}

async function getrepos(username) {
    // Repo names with hyperlink to the github repo
    let res = await fetch("https://api.github.com/users/" + username + "/repos");
    let data = await res.json();
    // console.log(data);
    let list = document.createElement("ol");
    let listParent = document.getElementById("repos");
    list.id = "repoNames";
    // list.className = "repoNames";
    listParent.appendChild(list);
    let elementsInRow;
    if (screen.width <= 1000) {
        elementsInRow = 1;
    }
    else {
        elementsInRow = 2;
    }
    for (let i = 0; i < data.length; i+=elementsInRow) {
        let table = document.getElementById("tableBox");
        let row = document.createElement("tr");
        for (let j = 0; j < elementsInRow; j++) {
            if (i+j >= data.length) {
                break;
            }
            if (i+j < data.length) {
                let url = data[i+j].html_url;
                let name = data[i+j].name;
                if (name.length > 30) {
                    name = name.slice(0, 30) + "...";
                }
                let forked = data[i+j].fork;
                if (forked) {
                    name = "(Forked) " + name;
                }
                let forkscount = data[i+j].forks_count;
                let starscount = data[i+j].stargazers_count;
                let watcherscount = data[i+j].watchers_count;
                let issuescount = data[i+j].open_issues_count;
                let license = data[i+j].license;
                let cell = document.createElement("td");
                cell.innerHTML = `<div class="boxintable">
                <span class = "individualRepoName"><a href="${url}" target="_blank">${name}</a></span><br><span class = "repoDetails">${forkscount} Forks&#160;&#160;&#160;&#160;&#160;&#160;${starscount} Stars&#160;&#160;&#160;&#160;&#160;&#160;${watcherscount} Watchers<br>${issuescount} Issues&#160;&#160;&#160;&#160;&#160;&#160;${license ? license.name : "No License" }</span>

                </div>`;
                row.appendChild(cell);
            }
        }
        table.appendChild(row);
        // let item = document.createElement("div");
        // item.id = `RepoNumber${i}`;
        // item.className = "boxintable";
        // item.innerHTML = `<a href="${data[i].html_url}" target="_blank">${data[i].name}</a>`;
        // list.appendChild(item);
    }
}

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let table = document.getElementById("tableBox");
    table.innerHTML = "";
    let profile = document.getElementById("repos");
    profile.innerHTML = "";
    let userData = document.getElementById("userData");
    userData.style.backgroundColor = "#2a2b2f";
    userData.style.border = "0.3rem solid #2a2b2f"
    userData.innerHTML = "";
    var username = document.getElementById("username").value;
    getavatar(username);
    getrepos(username);
});