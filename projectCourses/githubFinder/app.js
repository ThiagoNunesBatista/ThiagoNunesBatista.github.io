// Create instances of the api and ui
const Api = new GitHubApi()
const Ui = new UI()
  // Get Elements
const btnSearchUser = document.getElementById('btnSearchUser')
const userInput = document.getElementById('usernameInput')

// Add listeners
btnSearchUser.addEventListener('click', searchUser)

// Create Functions
function searchUser(e) {
  const inputValue = userInput.value.trim()

  Api.get(inputValue)
    .then(responseUser => {
      if (responseUser.message !== 'Not Found') {
        Api.getRepositories(inputValue)
          .then(responseRepository => {
            Ui.showProfile(responseUser)
            Ui.showRepositories(responseRepository)
          })
      } else {
        console.log(responseUser.message);
      }

    })
    .catch(error => {
      console.error({ success: false, message: error })
    })
}
