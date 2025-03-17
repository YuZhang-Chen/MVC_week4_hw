export default function getUsers() {
    axios.get("../server/index.php?action=getUsers")
        .then(res => {
            const response = res['data'];
            const emp_list = response['result'];
            switch (res.status) {
                case 200:
                    let str = `<table>`;
                    str += `<tr>
                                <th>員工編號</th>
                                <th>密碼</th>
                                <th>電子郵件</th>
                                <th>電話</th>
                                <th><button id="create-employee" class="btn btn-success mx-2">新增員工</button></th>
                            </tr>`;
                    emp_list.forEach(emp => {
                        str += `<tr>
                                    <td>${emp.id}</td>
                                    <td>${emp.password}</td>
                                    <td>${emp.email}</td>
                                    <td>${emp.phone}</td>
                                    <td><button id="update-employee" class="btn btn-success mx-2">修改</button>
                                    <button id="delete-employee" class="btn btn-success mx-2">刪除</button></td>
                                </tr>`;
                    });
                    str += `</table>`;
                    document.getElementById('content').innerHTML = str;
                    break;
                default:
                    console.error('Error: Unable to fetch employees');
                    break;
            }
        })
        .catch(err => {
            console.error(err);
        });
}