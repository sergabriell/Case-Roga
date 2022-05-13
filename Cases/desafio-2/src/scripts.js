const html = {
    get(element) {
        return document.querySelector(element);
    }
}

const data = Array.from({ length: 80 }).map((_, i) => `Name: ${(i + 1)}`);

let limit = 4;

const state = {
    page: 1,
    limit,
    totalPage: Math.ceil(data.length / limit),
    maxPages: 5
}

const list = {
    create(item) {
        const card = document.createElement('div');
        card.classList.add('card');

        const name = document.createElement('h3');
        name.textContent = item;

        card.append(name);
        html.get('.content-cards').appendChild(card);
    },
    update() {
        html.get('.content-cards').innerHTML = '';

        let page = state.page - 1;
        let start = page * state.limit;
        let end = start + state.limit;

        const paginatedItems = data.slice(start, end);

        paginatedItems.forEach(list.create)
    }
}