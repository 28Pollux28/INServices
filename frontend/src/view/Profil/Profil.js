import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import "./Profile.css";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import User from "../../request/service/User";

export default function ProfileSetting() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const buttonCliqued =async()=>{
    const dataJSON={
      "name": firstName,
      "surname": lastName,
      "username": username,
      "email": email,
      "phone": phone,
    }

    let response = await User.editUser(dataJSON)
    if(response[0]==true){
      window.alert("Vos modifications ont bien été modifées")
    }
    else{
      window.alert("ERREUR : Vos modifications n'ont pas été modifées")
    }
  }


  return (
    <div>
      <div className="container-xl px-4 mt-4">
        {/* <nav className="nav nav-borders">
          <a
            className="nav-link active ms-0"
            href="https://www.bootdey.com/snippets/view/bs5-edit-profile-account-details"
            target="__blank"
          >
            Profile
          </a>
          <a
            className="nav-link"
            href="https://www.bootdey.com/snippets/view/bs5-profile-billing-page"
            target="__blank"
          >
            Billing
          </a>
          <a
            className="nav-link"
            href="https://www.bootdey.com/snippets/view/bs5-profile-security-page"
            target="__blank"
          >
            Security
          </a>
          <a
            className="nav-link"
            href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"
            target="__blank"
          >
            Notifications
          </a>
        </nav> */}
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-4">
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {image ? (
                  <img
                    src={image}
                    width="315"
                    height="315"
                    alt="Uploaded Profile Picture"
                    className="img-account-profile rounded-circle mb-2"
                  />
                ) : (
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src="http://bootdey.com/img/Content/avatar/avatar1.png"
                    alt="Default Profile Picture"
                  />
                )}
                <div className="small font-italic text-muted mb-4">
                  JPG or PNG no larger than 5 MB
                </div>
                <input
                  type="file"
                  className="btn btn-primary"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card mb-4">
              <div className="card-header">Information du compte</div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputUsername">
                      Username (Comment votre nom apparaitra sur le site)
                    </label>
                    <input
                      className="form-control"
                      id="inputUsername"
                      type="text"
                      placeholder="Entrez votre username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">
                        Prénom
                      </label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        placeholder="Entrez votre prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">
                        Nom
                      </label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        placeholder="Entre votre nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">
                      Email address
                    </label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">
                        Numéro de téléphone
                      </label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Entrez votre numéro de téléphone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="button" onClick={buttonCliqued}>
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
