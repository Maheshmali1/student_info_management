const BACKEND_URL = 'https://brick-red-prawn-kilt.cyclic.app/';
$(document).ready(function() {
    // Activate tooltip
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    // Select/Deselect checkboxes
    var checkbox = $('table .table-body tr .custom-checkbox input[type="checkbox"]');
    $("#selectAll").click(function() {
        if (this.checked) {
            checkbox.each(function() {
                $(this).prop('checked', true);
            });
        } else {
            checkbox.each(function() {
                $(this).prop('checked', false);
            });
        }
    });

    // Delete selected rows
    $('#deleteStudentModalAll #deletestudentAll').on('submit', function(e) {
        e.preventDefault();
        console.log('You have just clicked on deletion of multiple');
        var checkedRows = [];
        $('table .table-body tr').each(function() {
            var checkbox = $(this).find('.custom-checkbox input[type="checkbox"]');
            if (checkbox.prop('checked')) {
                var row = $(this);
                var studentId = row.find('.studentid').text();
                checkedRows.push({ row: row, studentId: studentId });
            }
        });

        
        checkedRows.forEach(function(data) {
            var row = data.row;
            var studentId = data.studentId;
            console.log("studentId",studentId)
            row.remove();
            
          
			const localstorage_user = JSON.parse(localStorage.getItem('user'))
            const inMemoryToken = localstorage_user.accessToken
            fetch(`${BACKEND_URL}/student/` + studentId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
					'Authorization' : `Bearer ${inMemoryToken}`
                },
              
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

       
        $('#deleteStudentModalAll').modal('hide');
    });
});



function getAllClients() {
	const myHeaders = new Headers();
	const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken = localstorage_user.accessToken
	myHeaders.append('Content-Type', 'application/json');
	myHeaders.append('Authorization', `Bearer ${inMemoryToken}`);

		return fetch(`${BACKEND_URL}/student`, {
		method: 'GET',
		
		headers: myHeaders,
		})
		.then(response => {
			if (response.status === 403) {
				// Redirect to the sign-in page
				window.location.href = 'index.html'; 
				return;
			}
			return response.json();
		})
	  .then((user) => {
		console.log(user.message.data);
		var tmp=""
		user.message.data.forEach(item => {
             
			tmp += '<tr>';
			tmp += '<td>';
			tmp += '<span class="custom-checkbox">';
			tmp += '<input type="checkbox" name="options[]" class="checkbox">';
			tmp += '<label></label>';
			tmp += '</span>';
			tmp += '</td>';
			tmp += '<td class="studentid">' + item.studentId + '</td>';
			tmp += '<td>' + item.name + '</td>';
			tmp += '<td>' + item.email + '</td>';
			tmp += '<td>' + item.phoneNo + '</td>';
			tmp += '<td>';
			tmp += '<a href="#editStudentModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>';
			tmp += '<a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>';
			tmp += '</td>';
			tmp += '</tr>';
			
		});
		document.querySelector('.table-body').innerHTML = tmp;		

	  })
	  .catch((error) => {
		console.log(error);
	  });
}


getAllClients();

function search_toggle(){
            $(document).ready(function() {
                $("#search-bar").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $(".table-body tr").filter(function() {
                        $(this).toggle($(this).text()
                        .toLowerCase().indexOf(value) > -1)
                    });
                });
            });
                
        
        }
search_toggle()

function logout(){
    const localstorage_user = JSON.parse(localStorage.getItem('user'))
    const inMemoryToken1 = localstorage_user.accessToken
    const inMemoryToken2 = localstorage_user.refreshToken
    return fetch(`${BACKEND_URL}/user/logout`, {
		method: 'DELETE',
		body: JSON.stringify({
            "accessToken": inMemoryToken1,
            "refreshToken": inMemoryToken2
        })
		})
		.then(response => {
			return response.json();
		})
        .then(res=>{
            window.location.href = 'index.html'
        })

}