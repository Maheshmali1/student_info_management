class addStudent{
    constructor(form,fields)
    {
       this.form =form;
       this.fields=fields;
       this.validateOnSubmit()
       
    }

    validateOnSubmit()
    {
        let self = this;
        var error= 0;
        this.form.addEventListener('submit',(e)=>{
            e.preventDefault();
         
            self.fields.forEach(field => {
                const input = document.querySelector(`#${field}`)
               
                if(self.validateFields(input)==false){
                    error++;
                }
                
            });
            if(error==0)
            {
                    var name = document.querySelector('#student-name').value.trim()
                    var email= document.querySelector('#student-email').value.trim()
					var phone = document.querySelector('#student-phone').value.trim()
                    console.log(email,name,phone)
                    const localstorage_user = JSON.parse(localStorage.getItem('user'))
					const inMemoryToken = localstorage_user.accessToken
                    var response_code;
                    fetch('http://localhost:3000/student',{
                        method: 'post',
                        headers: {
                            'accept': 'application/json',
                            'Content-Type': 'application/json',
							'Authorization' : `Bearer ${inMemoryToken}`
                        },
                        body: JSON.stringify( {
                
                            "name": name,
                            "email": email,
							"phoneNo": phone
                
                        })
                        
                    })
                    .then((response) => {
                        
                        return response.json()})
                    .then( res => {
                            console.log( res.message);
                            
                            this.form.submit()
                    })
                    
            }

        })
    }
    
       
    validateFields(field)
    {
        return true
    }
    
    
}

function studentadd(){
    const form = document.querySelector(".addnewstudent");
    if(form)
    {
        console.log("yes we got newstudent ")
        const fields = ["student-name","student-email","student-phone"]
        const validator =new addStudent(form,fields)
        console.log("yes we got newstudent ")
    }

}

