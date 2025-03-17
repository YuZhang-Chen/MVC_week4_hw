import getUsers from "./getUsers.js";

export default function doUpdate(data) {
    axios.post('../server/index.php?action=updateUser', Qs.stringify(data))
    .then(res => {
        const response = res.data;
        let text, icon;
        switch (response.status) {
            case 200:
                text = "您成功更新一筆資料";
                icon = "success";
                break;
            default:
                text = "您更新一筆資料失敗，請再試試！";
                icon = 'error';
                break;
        }
        Swal.fire({
            title: response.message,
            text: text,
            icon: icon
        }).then(() => {
            document.getElementById('content').innerHTML = getUsers();
        });
        
    })
    .catch(err => {
        console.error(err); 
    })
}