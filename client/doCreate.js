export default function doCreate() {
    const data = {
        id: document.getElementById('id').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    }

    axios.post('../server/index.php?action=newUser', Qs.stringify(data))
    .then(res => {
        const response = res.data;
        let text, icon;
        switch (response.status) {
            case 200:
                text = "您新增了一筆資料";
                icon = "success";
                break
            case 400:
                text = "請輸入正確資料";
                icon = "error";
            case 500:
                text = "您新增資料失敗，請再試試";
                icon = "error";
                break;
            default:
                console.error('Error: Unable to fetch employees');
                break;
        }
        Swal.fire({
            title: response.message,
            text: text,
            icon: icon
            
            }).then(() => {
                document.getElementById('content').innerHTML = '';
            });
    })
    .catch(err => {
        console.error(err); 
    })            
}
