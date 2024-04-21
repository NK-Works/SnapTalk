/* This code is made by Anneshu Nag, Student ID: 2210994760 */
// JavaScript for the frontend part
let selectedUserId;
function selectUser(userId) {
  selectedUserId = userId;
  fetchUserData();
}

async function fetchUserData() {
  if (selectedUserId) {
    try {
      const response = await fetch(`/users/user/${selectedUserId}`);
      const userData = await response.json();
      renderUserData(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
}

function renderUserData(userData) {

  const userdataContainer = document.querySelector(".userdata");
  let imagesHTML = "";
  let factsHTML = "";

  userData.posts.forEach((post) => {

    var likesHTML = '';
    if (post.likes && post.likes.length > 0) {
      likesHTML = `<p>${post.likes.length} ${post.likes.length === 1 ? 'like' : 'likes'}</p>`;
    } else {
      likesHTML = '<p>0 likes</p>';
    }
    var readMoreFormHTML = `<form action="/posts/post/${post._id}" method="get">
                              <input type="submit" value="Read More">
                            </form>`;

    imagesHTML += `<div class="post">
                      <img src="/images/uploads/${post.image}" alt="${post.imageText}">
                      <p>${post.imageText}</p>
                      <div>
                        ${likesHTML}
                        ${readMoreFormHTML}
                      </div>
                  </div>`;
  });

  userData.facts.forEach((fact) => {
    var likesHTML = '';
    if (fact.likes && fact.likes.length > 0) {
      likesHTML = `<p>${fact.likes.length} ${fact.likes.length === 1 ? 'like' : 'likes'}</p>`;
    } else {
      likesHTML = '<p>0 likes</p>';
    }
    var readMoreFormHTML = `<form action="/facts/fact/${fact._id}" method="get">
                              <input type="submit" value="Read More">
                            </form>`;

    factsHTML += `<div class="post">
                      <p>${fact.factText}</p>
                      <div>
                        ${likesHTML}
                        ${readMoreFormHTML}
                      </div>
                  </div>`;
  });

  const userHTML = `
    <div class="user-profile flex">
    <img src="${userData.dp}" alt="" />
    <div class="data">
        <h2>${userData.username}</h2>
        <p><span>Email: </span>${userData.email}</p>
        <p><span>Full Name: </span> ${userData.fullname}</p>
        <p><span>Posts: </span> ${userData.posts.length}</p>
        <p><span>Facts: </span> ${userData.facts.length}</p>
    </div>
        </div>

        <div class="user-posts">
            ${imagesHTML}
            ${factsHTML}

    </div>`;
  userdataContainer.innerHTML = userHTML;
}

async function handleSearch() {
  const searchInput = document.getElementById("search-user").value;
  const searchSuggestionContainer = document.querySelector(".serach-suggesion");

  searchSuggestionContainer.innerHTML = "";

  if (searchInput.trim() !== "") {
    try {
      const response = await fetch(`/users/search?query=${searchInput}`);
      const searchResults = await response.json();

      searchResults.forEach((user) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.textContent = user.username;
        suggestionItem.addEventListener("click", () => selectUser(user._id));
        searchSuggestionContainer.appendChild(suggestionItem);
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }
}
