const form = document.getElementById("form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const name = data.get("name");
        const age = data.get("age");
        const gender = data.get("gender");
        const smoking = data.get("smoking");
        const cigarette = data.getAll("cigarette");

        const surveyData = JSON.parse(localStorage.getItem("surveyData")) || [];

        surveyData.push({
            name,
            age,
            gender,
            smoking,
            cigarette
        });

        localStorage.setItem("surveyData", JSON.stringify(surveyData));

        window.location.href = "table.html";
    });
}

function appendTable(data) {
    const target = document.querySelector("#tableData tbody");
    const row = document.createElement("tr");

    data.forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    target.appendChild(row);
}

const table = document.getElementById("tableData");

if (table) {
    const surveyData = JSON.parse(localStorage.getItem("surveyData")) || [];

    surveyData.forEach((item, index) => {
        const cigarette = [
            "Gudang Garam Filter",
            "Lucky Strike",
            "Marlboro",
            "Esse"
        ];

        appendTable([
            index + 1,
            item.name,
            item.age,
            item.gender,
            item.smoking,
            ...cigarette.map(value => item.cigarette.includes(value) ? "✓" : "-")
        ]);
    });
}

const remove = document.getElementById("buttonRemove");

if (remove) {
    remove.addEventListener("click", () => {
        localStorage.clear();

        const tbody = document.querySelector("tbody");
        tbody.replaceChildren();
    });
}