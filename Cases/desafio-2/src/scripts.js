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