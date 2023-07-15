import { backendUrl } from './config.js';
class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        let self = this;
        var error = 0;
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);

                if (self.validateFields(input) == false) {
                    error++;
                }
            });

            if (error == 0) {
                var email = document.querySelector('#login-username').value;
                var password = document.querySelector('#login-password').value;
                email = email.trim();
                console.log(email, password);

                fetch(`${backendUrl}/user/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": email,
                        "password": password
                    })
                })
                .then(response => {
                    if (response.status === 401) {
                        throw new Error("Invalid password");
                    } else if (response.status === 404) {
                        throw new Error("User not found");
                    } else {
                        return response.json();
                    }
                })
                .then(res => {
                    console.log(res.message);
                    localStorage.setItem('user', JSON.stringify(res.message));
                    this.form.submit();
                })
                .catch(error => {
                    console.log(error);
                    if (error.message === "Invalid password") {
                        $("#invalidPasswordModal").modal("show");
                    } else if (error.message === "User not found") {
                        $("#userNotFoundModal").modal("show");
                      
                    } else {
                        alert("An error occurred. Please try again later.");
                    }
                });
            }
        });
    }

    validateFields(field) {
        return true;
    }
}

const form = document.querySelector("#loginform");
if (form) {
    const fields = ["login-username", "login-password"];
    const validator = new Login(form, fields);
    console.log("Yes, we got login");
}

