// const BACKEND_URL = 'http://localhost:3000';
$(document).ready(function(){
    var t = $('#table');
    var tableOptions = {
        'bPaginate': false,
        'searching' : false,
        'info': false,
       'ordering' : false,
        'paging' : false
    };
    t.DataTable(tableOptions);
    console.log("the table is", $('#table').DataTable());

 
    $('tbody').on('click', ".edit", (event) => {
        console.log("clicked on edit");
        var row = $(event.currentTarget).closest('tr');
        var studentId = row.find('.studentid').text();
        console.log(studentId)
        $('#editStudentModal #editstudent').on('submit', function(e) {
            e.preventDefault();

            console.log('You have just submitted the form');

            var name = $('#editStudentModal #name').val();
            var email = $('#editStudentModal #email').val();
            var phone = $('#editStudentModal #phone').val();
    
            var id = studentId; // Replace with the actual student ID
            var url = `${BACKEND_URL}/student/${id}`;
            console.log(url)
            // Prepare the request body
            var body = {
                'name': name,
                'email': email,
                'phoneNo': phone
            };
            const localstorage_user = JSON.parse(localStorage.getItem('user'))
            const inMemoryToken = localstorage_user.accessToken
           

            fetch(url, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
					'Authorization' : `Bearer ${inMemoryToken}`

                },
                body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
               
                window.location.reload();
                $('#editStudentModal').modal('hide');

            })
            .catch(error => {
                console.error('Update failed:', error);
                
            });
            
            
        });
    });


    $('tbody').on('click', ".delete", (event) => {
        console.log("clicked on delete");
        var row = $(event.currentTarget).closest('tr');
        var studentId = row.find('.studentid').text();
        console.log(studentId)
     
        $('#deleteStudentModal #deletestudent').on('submit', function(e) {
            e.preventDefault();
            console.log('You have just clicked on deletion');
           
            var id = studentId; // Replace with the actual student ID
            var url = `${BACKEND_URL}/student/${id}`;
            console.log(url)
          
           
            const localstorage_user = JSON.parse(localStorage.getItem('user'))
            const inMemoryToken = localstorage_user.accessToken
            
            fetch(url, {
                method: 'DELETE',
                headers: {
                    'accept': 'application/json',
					'Authorization' : `Bearer ${inMemoryToken}`

                },
                
            })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                
                
                $('#deleteStudentModal').modal('hide');
                window.location.reload()
            })
            .catch(error => {
                console.error('Update failed:', error);
                
            });
            
        });
    });

})


