function searchForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let city = document.querySelector(".city-name");
  city.innerHTML = searchInput.value.toUpperCase();
}
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchForm);
