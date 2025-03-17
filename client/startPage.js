export default function startPage() {
    const page = `
    <div class="container mt-5">
        <h1>第四週練習</h1>
        <div class="d-flex justify-content-center my-3">
            <button id="read-employees" class="btn btn-success mx-2">查詢員工</button>
        </div>
        <div id='content' class="mt-4"></div>
    </div>
    `;
    return page;
}