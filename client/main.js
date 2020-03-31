function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("id_token",id_token);
    $.ajax({
        method:'POST',
        url:'http://localhost:3000/users/googleSign',
        data:{token:id_token},
        success: function(response){
            //console.log(response.data);
            localStorage.setItem('access_token', response.access_token);
            //console.log(localStorage.getItem('access_token'));
        }
    })
}

function signOut() {
    console.log("ini token", localStorage.getItem('access_token'));
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.removeItem('access_token');
    console.log("ini token", localStorage.getItem('access_token'));
  }