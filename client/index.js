import doCreate from "./doCreate.js";
import doRemove from "./doRemove.js";
import getUsers from "./getUsers.js";
import showCreate from "./showCreate.js";
import showUpdate from "./showUpdate.js";
import startPage from "./startPage.js"

window.onload = () => {
    document.getElementById('root').innerHTML = startPage();
    
    const contentElement = document.getElementById('content');

    document.getElementById('read-employees').onclick = () => {
        contentElement.innerHTML = getUsers();

        contentElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-success')) {
                if (event.target.id === 'delete-employee') {
                    Swal.fire({
                        title: '確定要刪除嗎?',
                        showCancelButton: true,
                        confirmButtonText: '確定',
                        cancelButtonText: '取消'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            doRemove(event);
                        }
                    });
                } else if (event.target.id === 'update-employee') {
                    showUpdate(event);
                }
            }
        });

        contentElement.addEventListener('click', (event) => {
            if (event.target.id === 'create-employee') {
                contentElement.innerHTML = showCreate();
                document.getElementById("add-employee").onclick = () => {
                    doCreate();
                }
            }
        });
    };

    
}