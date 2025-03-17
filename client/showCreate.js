export default function showCreate() {
    const page = `
        <div>
            <label for="id">編號:</label>
            <input type="text" id="id" name="id">
            <label for="password">密碼:</label>
            <input type="password" id="password" name="password">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email">
            <label for="phone">電話號碼:</label>
            <input type="tel" id="phone" name="phone">
            <button id="add-employee">新增</button>
        </div>
    `;
    return page;
}
