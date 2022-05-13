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

const controls = {
    next() {
        state.page++;

        const lastPage = state.page > state.totalPage;
        if (lastPage) {
            state.page--;
        }
    },
    prev() {
        state.page--;

        if (state.page < 1) {
            state.page++;
        }
    },
    goTo(page) {
        if (page < 1) {
            page = 1;
        }

        state.page = Number(page);

        if (page > state.totalPage) {
            state.page = state.totalPage;
        }
    },
    createListeners() {
        html.get('.first-page').addEventListener('click', () => {
            controls.goTo(1);
            update();
        })

        html.get('.last-page').addEventListener('click', () => {
            controls.goTo(state.totalPage);
            update();
        })

        html.get('.next').addEventListener('click', () => {
            controls.next();
            update();
        })

        html.get('.prev').addEventListener('click', () => {
            controls.prev();
            update();
        })
    }
}

const buttons = {
    create(number) {
        const button = document.createElement('button');
        button.classList.add('numbers');

        button.innerHTML = number;

        if (state.page === number) {
            button.classList.add('current-page');
        }

        if (number !== '...') {
            button.addEventListener('click', (e) => {
                const page = e.target.innerHTML;

                controls.goTo(page);
                update();
            })
        }

        html.get('.pages .div-numbers').appendChild(button);
    },
    update() {
        html.get('.pages .numbers').innerHTML = '';
        html.get('.pages .div-numbers').innerHTML = '';

        if (state.maxPages > state.totalPage) {
            html.get('.first-page').classList.add('hidden');
            html.get('.last-page').classList.add('hidden');
            html.get('.prev').classList.add('hidden');
            html.get('.next').classList.add('hidden');
        }

        const { maxLeft, maxRight } = buttons.calculateVisible();

        buttons.create(1);
        for (let page = maxLeft + 1; page <= maxRight - 1; page++) {

            if (state.maxPages === 5 && state.totalPage > 5) {
                if (state.page > page && state.totalPage > state.maxPages && page > 2) {
                    if (state.page >= state.totalPage - 1) {
                        if (page === state.totalPage - 3) {
                            buttons.create('...');
                        } else {
                            buttons.create(page)
                        }
                    } else {
                        buttons.create('...');
                    }
                } else {
                    if (state.page + 1 === page && state.page > 2) {
                        buttons.create('...');
                    } else {
                        if (page > 3 && state.page < 3) {
                            buttons.create('...');
                        } else {
                            buttons.create(page);
                        }
                    }
                }
            } else {
                buttons.create(page);
            }
        }
        buttons.create(state.totalPage);
    },
    calculateVisible() {
        let maxLeft = (state.page - Math.floor(state.maxPages / 2))
        let maxRight = (state.page + Math.floor(state.maxPages / 2))

        if (maxLeft < 1) {
            maxLeft = 1;
            maxRight = state.maxPages;
        }

        if (maxRight > state.totalPage) {
            maxLeft = state.totalPage - (state.maxPages - 1);
            maxRight = state.totalPage;

            if (maxLeft < 1) {
                maxLeft = 1;
            }
        }

        return { maxLeft, maxRight };
    }
}