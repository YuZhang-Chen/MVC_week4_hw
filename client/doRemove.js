import getUsers from "./getUsers.js";

export default function doRemove(event) {
    const rows = event.target.closest('tr');
    const data = {
        id: rows.querySelector('td').innerText,              
    }
    axios.post('../server/index.php?action=removeUser', Qs.stringify(data))
    .then(res => {
        const response = res.data;
        try {
            if (response.status == 200) {
            Swal.fire({
                title: response.message,
                text: "您刪除這筆資料了",
                icon: "success"
            }).then(() => {
                document.getElementById('content').innerHTML = getUsers();
            });
            }
        } catch (error) {
            console.error(error);
        }
        
    })
    .catch(err => {
        console.error(err); 
    })
}