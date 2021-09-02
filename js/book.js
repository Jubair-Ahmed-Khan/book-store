// load api from search function

const searchBooks = () => {
    const SearchByBookName = document.getElementById('search-book');
    const searchText = SearchByBookName.value; //get the input text
    SearchByBookName.value = "";  //clear text

    // check whether no input is given 
    if (searchText === "") {
        alert('Please enter a topic to search !!!');
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}
    `;
        // fetch api 
        fetch(url)
            .then(res => res.json())
            .then(data => displayBooks(data));
    }
}

// display search result function 

const displayBooks = books => {

    const doc = books.docs;
    const { numFound } = books;

    const showNumberDiv = document.getElementById('show-number'); //where number of result is showed
    showNumberDiv.innerHTML = '';

    // show how many result found 
    if (numFound !== 0) {
        showNumberDiv.classList.add('text-danger');
        showNumberDiv.innerHTML = `
            <span class="text-success text-center my-5">${numFound}</span> results found
        `;
    }
    else {
        showNumberDiv.classList.add('text-danger');
        showNumberDiv.innerHTML = `
            No result found
        `;
    }

    const showResultDiv = document.getElementById('show-info'); //where books info is showed
    showResultDiv.innerHTML = '';

    doc.forEach(book => {

        const { title, first_publish_year, author_name, cover_i } = book;

        // column create 
        const div = document.createElement('div');
        div.classList.add('col');

        // card create 
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.classList.add('h-100');

        // card body create 
        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body');

        // check if cover image is present or not 
        if (cover_i !== undefined) {
            const img = document.createElement('img');
            const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
            img.setAttribute('src', imgSrc);
            cardDiv.appendChild(img);
        }

        // check if title is present or not 
        if (title !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">Book Name:</span> ${title}
                `;
            cardBodyDiv.appendChild(h5);
        }

        // check if author name is present or not 
        if (author_name !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">Author Name:</span> ${author_name[0]}
                `;
            cardBodyDiv.appendChild(h5);
        }

        // check if first publish year is present or not 
        if (first_publish_year !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">First Published:</span> ${first_publish_year}
                `;
            cardBodyDiv.appendChild(h5);
        }

        // append items to place where book info will be showed
        cardDiv.appendChild(cardBodyDiv);
        div.appendChild(cardDiv);
        showResultDiv.appendChild(div);
    })
}