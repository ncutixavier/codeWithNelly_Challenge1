const users_table = document.querySelector('.users-table-body');
const spinner = document.querySelector('.loading-spinner');
const modalSpinner = document.querySelector('.loader-spinner');
const closeBtn = document.querySelector('.close-btn');
const posts = document.querySelector('.posts');
const postsContent = document.querySelector('.posts-content');
const postUser = document.querySelector('.post-user');
const postNber = document.querySelector('.post-nber');

function getAllUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      //Get All users
      if (json.length > 0) {
        spinner.style.display = 'none';
        for (let index = 0; index < json.length; index++) {
          let template = `
                    <tr user-id=${json[index].id}>
                        <td>${json[index].name}</td>
                        <td>${json[index].email}</td>
                        <td><button class="getUserPost">Get User’s Posts</button></td>
                    </tr>
                `;
          users_table.innerHTML += template;
        }

        const userBtn = document.querySelectorAll('.getUserPost');
        for (let index = 0; index < Array.from(userBtn).length; index++) {
          userBtn[index].addEventListener('click', (e) => {
            posts.style.display = 'flex';
            postUser.innerHTML = `${userBtn[index].parentElement.parentElement.firstElementChild.innerHTML}'s posts`;
            let id =
              userBtn[index].parentNode.parentNode.getAttribute('user-id');

            //Get User's Posts
            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
              .then((response) => response.json())
              .then((json) => {
                if (json.length > 0) {
                  postNber.innerHTML = `Posts: ${json.length}`;
                  modalSpinner.style.display = 'none';
                  for (let index = 0; index < json.length; index++) {
                    let template = `
                        <div class="post" post-id=${json[index].id}>
                            <div class="post-avatar">
                                <img src="https://ncutixavier.github.io/codeWithNelly_Challenge1/assets/icons/post.png" alt="">
                            </div>
                            <div class="post-content">
                                <h3>${json[index].title}</h3>
                                <p>${json[index].body}</p>
                            </div>
                        </div>
                    `;
                    postsContent.innerHTML += template;
                  }
                } else {
                  modalSpinner.style.display = 'flex';
                }
              });
          });
        }
      } else {
        spinner.style.display = 'flex';
      }
    });
}

getAllUsers();

closeBtn.onclick = function () {
  posts.style.display = 'none';
};
