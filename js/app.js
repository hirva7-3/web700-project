let allItems = [];

fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Coffee%20%2F%20Tea')
  .then(res => res.json())
  .then(data => {
    allItems = data.drinks;
    renderCards(allItems);
  });


function renderCards(items) {
  const container = document.getElementById('cards');
  const count = document.getElementById('count');
  container.innerHTML = '';
  count.textContent = `Showing ${items.length} items`;

  if (items.length === 0) {
    container.innerHTML = '<p>No items found.</p>';
    return;
  }

  let table = `
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>ID</th>
      </tr>`;

  items.forEach(item => {
    table += `
      <tr>
        <td><img src="${item.strDrinkThumb}" width="80"/></td>
        <td>${item.strDrink}</td>
        <td>${item.idDrink}</td>
      </tr>`;
  });

  table += `</table>`;
  container.innerHTML = table;
}

function applyFilters() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const sortValue = document.getElementById('sortSelect').value;

  let filtered = allItems.filter(item =>
    item.strDrink.toLowerCase().includes(query)
  );

  if (sortValue === 'nameAsc') {
    filtered.sort((a, b) => a.strDrink.localeCompare(b.strDrink));
  } else if (sortValue === 'nameDesc') {
    filtered.sort((a, b) => b.strDrink.localeCompare(a.strDrink));
  } else if (sortValue === 'idAsc') {
    filtered.sort((a, b) => Number(a.idDrink) - Number(b.idDrink));
  } else if (sortValue === 'idDesc') {
    filtered.sort((a, b) => Number(b.idDrink) - Number(a.idDrink));
  }

  renderCards(filtered);
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('sortSelect').addEventListener('change', applyFilters);
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = '';
  renderCards(allItems);
});