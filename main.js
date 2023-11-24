function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential)

  fullName.textContent = data.name
  sub.textContent = data.sub
  given_name.textContent = data.given_name
  family_name.textContent = data.family_name
  email.textContent = data.email
  verifiedEmail.textContent = data.email_verified
  picture.setAttribute("src", data.picture)
}

window.onload = function () {
  const clientID = '54481010119-rg72jpv6s4coego70too6ugm01crbkm0.apps.googleusercontent.com'
    
    //window.prompt("Cole a sua Cliente ID", "")

  google.accounts.id.initialize({
    client_id: clientID,
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"), {
    theme: "filled_black",
    size: "large",
    type: "standard",
    shape: "pill",
    locale: "pt-BR",
    logo_alignment: "left",
  } // customization attributes
  );

  google.accounts.id.prompt(); // also display the One Tap dialog
      }
