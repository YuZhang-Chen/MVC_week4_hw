import doUpdate from "./doUpdate.js";

export default function showUpdate(event) {
    const rows = event.target.closest('tr');
    const fields = ['id', 'password', 'email', 'phone'];
    
    fields.forEach((field, index) => {
        if (index > 0) {
            const cell = rows.cells[index];
            cell.innerHTML = `<input type='text' value='${cell.innerText}' id='${field}'>`;
        }
    });
    event.target.id = 'save-employee';
    event.target.innerText = '確定';
    document.getElementById('save-employee').onclick = () => {
        
        const data = {
            id: rows.cells[0].innerText,
        };
                                
        fields.forEach((field, index) => {
            if (index > 0) {
                data[field] = document.getElementById(field).value;
            }
        });
        
        doUpdate(data);
    }
}