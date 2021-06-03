var error = document.getElementById('Error');
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

if (getCookie("UserName")!=undefined) {
  let User = {
    LogIn: getCookie("UserLogIn"),
    Name: getCookie("UserName"),
    Email:getCookie("UserEmail")
  };
  UserLogIn(User);
  if (getCookie("OnLine")==undefined) {
//Обновление куки
  }
}
function CookiesDelete() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
function InputCheck() {
  var login = document.getElementById('RegistrationLogin').value;
  var Name = document.getElementById('RegistrationName').value;
  var Email = document.getElementById('RegistrationEmail').value;
  var Pass = document.getElementById('RegistrationPass').value;
  var Pass1 = document.getElementById('RegistrationPass1').value;
  var Button = document.getElementById('RegistrationSend');
  
  var Passisre = /^(?=.*\d)(?=.*[!?$%&@])(?=.*?[a-zA-Z]).{6,30}$/;
  var PassisValid = Passisre.test(Pass);  
  var loginre =/(?=.*\S).{6,30}/;
  var loginisValid = loginre.test(login);
  var Namere =/(?=.*\S).{1,30}/;
  var NameisValid = Namere.test(Name);
  var Emailre = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
  var EmailisValid = Emailre.test(Email);
  var confirm_password = false;
  if (Pass==Pass1) {
    confirm_password= true;
    error.innerHTML = ("");
  }else{
    confirm_password= false;
    error.innerHTML = ("Пароли не совпадают");
  }    
  if (PassisValid&&loginisValid&&NameisValid&&EmailisValid&&confirm_password) {
    Button.style.display= "block";
  }else
  {Button.style.display= "none";}
  console.log("Pass1 ="+Pass);
  console.log("Pass2 ="+Pass1);
  console.log("PassisValid ="+PassisValid);
  console.log("loginisValid ="+loginisValid);
  console.log("NameisValid ="+NameisValid);
  console.log("EmailisValid ="+EmailisValid);
}

function UserLogOut() {
  CookiesDelete();
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.remove("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.add("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');
  HeaderPanel.innerHTML = "";
  
}
function UserLogIn(jsonparams) {
  forms = document.getElementsByClassName("container");
  for (let index = 0; index < forms.length; index++) {
    if (forms[index].classList.contains("formVisibility")) {
      forms[index].classList.remove("formVisibility");
    } 
  }
  LogIn = document.getElementById("UnlogInFormButton");
  LogIn.classList.add("UnVivible");
  LogOut = document.getElementById("logInFormButton");
  LogOut.classList.remove("UnVivible");
  var HeaderPanel = document.getElementById('HeaderInform');

  HeaderPanel.innerHTML = "Здравствуйте "+jsonparams.Name+" ";
  

}

function FormShowSwich(FormShowingId,FormHiddenId) {
    FormShowing = document.getElementById(FormShowingId);
    FormHidden = document.getElementById(FormHiddenId);
    FormShowing.classList.toggle("formVisibility");
    FormHidden.classList.remove("formVisibility");   
}




document.addEventListener("DOMContentLoaded",function() {

    var buttonRegistration = document.getElementById('RegistrationSend');

    buttonRegistration.addEventListener("click", function(){
        var login = document.getElementById('RegistrationLogin').value;
        var Name = document.getElementById('RegistrationName').value;
        var Email = document.getElementById('RegistrationEmail').value;
        var Pass = document.getElementById('RegistrationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Name='+encodeURIComponent(Name)+
        '&Email='+encodeURIComponent(Email)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=registration';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {         
             console.log(request);
             console.log(request.responseText);
              if (request.responseText="Error") {
                error.innerHTML = ("Ошибка, возможно на такой логи уже зарегестирован аккаунт");
              }
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(Send);
    });
  });

  document.addEventListener("DOMContentLoaded",function() {

    var buttonAuthorization = document.getElementById('AuthorizationSend');

    buttonAuthorization.addEventListener("click", function(){
        var login = document.getElementById('AuthorizationLogin').value;

        var Pass = document.getElementById('AuthorizationPass').value;

        Send ='Login=' + encodeURIComponent(login)+
        '&Pass='+encodeURIComponent(Pass)+'&Operation=authorization';
        console.log(Send);
        var request = new XMLHttpRequest();
        request.open('POST','phpFiles/action.php',true);
        request.addEventListener('readystatechange', function() {
            if ((request.readyState==4) && (request.status==200)) {         
             console.log(request);
             req = request.responseText.replace(/[{()}]/g, '');
             console.log();
             while (req.indexOf("\"0\"")>-1) {
              req = req.replace('"0":', '');
             }
             
             console.log(req);
             
             
             
             //console.log(json);
                user = JSON.parse('{'+req+'}');
                UserLogIn(user);
             //alert(user.LogIn);
            
            }
        });
         request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        request.send(Send);
    });
  });



  /*
document.addEventListener("DOMContentLoaded",function() {
    var LoginInput = document.getElementById('RegistrationLogin');
    console.log(LoginInput);
    LoginInput.addEventListener("change", function(){
         if (LoginInput.value.length>=6) { 
      var name;
      name = 'Login=' + encodeURIComponent('login')+'&Operation=Search';
      var request = new XMLHttpRequest();
      request.open('POST','phpFiles/action.php',true);
      request.addEventListener('readystatechange', function() {
        if ((request.readyState==4) && (request.status==200)) {
        console.log(request);
        console.log(request.responseText);
        var LoginSearch = document.getElementById('LoginSearch');
        LoginSearch.innerHTML = request.responseText;
        }
      });
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      request.send(name);
    }});
  });*/