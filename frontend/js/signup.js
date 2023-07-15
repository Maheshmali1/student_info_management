
import { backendUrl } from './config.js';
class signup{
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
                    var data ={
                       username:document.querySelector('#signup-email').value,
                       password:document.querySelector('#signup-pass').value
                    }
                    fetch(`${backendUrl}/user/register`,{
                        method: 'POST',
                        body : JSON.stringify(data),
                        headers:{
                            "Content-type":"application/json;charset=UTF-8",
                        }

                    })
                    .then((response) => response.json())
                    .then((data)=>{
                        if(data.success== "false")
                        {
                            console.log("error:",data.message)
                            document.querySelector(".error-message-all").style.display = 'block';
                            document.querySelector(".error-message-all").innerText = "Server is not available"
                        }
                        else{
                            this.form.submit();
                        }

                    })
                    .catch((data)=>{
                        console.log('error',data.message)
                    })

                    
            }
           
            
        })
    }
       
    validateFields(field)
    {
        if((field.value).trim() !='')
        {
            
             return true;
        }
    }
    
    
}
const form =document.querySelector('#signupform')
if (form)
{
    const fields = ["signup-email","signup-pass"]
    const validator1 =new signup(form,fields)
    console.log("yes we got signup")
}