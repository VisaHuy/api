"use strict"

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const resultList = document.getElementById("results-list");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = input.value.trim();
    if (query.length < 3) {
        alert("Запрос должен содержать не менее 3 символов");
        return;
    }

    fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10`)
        .then((response) => response.json())
        .then((data) => {
            resultList.innerHTML = "";
            if (data.items.length === 0) {
                resultList.innerHTML = "<p>Ничего не найдено</p>";
            } else {
                data.items.forEach((repo) => {
                    const listItem = document.createElement("li");
                    const link = document.createElement("a");
                    link.href = repo.html_url;
                    link.target = "_blank";
                    link.textContent = repo.full_name;
                    const description = document.createElement("p");
                    description.textContent = repo.description;
                    listItem.appendChild(link);
                    listItem.appendChild(description);
                    resultList.appendChild(listItem);
                });
            }
        })
        .catch((error) => {
            console.error(error);
            resultList.innerHTML = "<p>Произошла ошибка при выполнении запроса</p>";
        });
});
