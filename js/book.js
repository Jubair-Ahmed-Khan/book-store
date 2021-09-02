const searchBooks = () => {
    const SearchByBookName = document.getElementById('search-book');
    searchText = SearchByBookName.value;
    SearchByBookName.value = "";
    const url = `https://openlibrary.org/search.json?q=${searchText}
    `;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBooks(data));

}

const displayBooks = books => {

    const doc = books.docs;
    const { numFound } = books;

    // main container
    // const container = document.getElementById('container');
    //container.textContent = '';
    const showNumberDiv = document.getElementById('show-number');
    showNumberDiv.innerHTML = '';


    if (numFound !== 0) {
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


    doc.forEach(book => {
        const { title, first_publish_year, author_name, cover_i } = book;
        //console.log(title);
        const showResultDiv = document.getElementById('show-info');
        //showResultDiv.textContent = '';
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

        if (cover_i !== undefined) {
            const img = document.createElement('img');
            const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
            img.setAttribute('src', imgSrc);
            cardDiv.appendChild(img);
        }
        if (title !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">Book Name:</span> ${title}
                `;
            cardBodyDiv.appendChild(h5);
        }
        if (author_name !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">Author Name:</span> ${author_name[0]}
                `;
            cardBodyDiv.appendChild(h5);
        }
        if (first_publish_year !== undefined) {
            const h5 = document.createElement('h5');
            h5.innerHTML = `
                    <span class="fw-bolder text-primary">First Published:</span> ${first_publish_year}
                `;
            cardBodyDiv.appendChild(h5);
        }
        cardDiv.appendChild(cardBodyDiv);
        div.appendChild(cardDiv);
        showResultDiv.appendChild(div);

    })
    //document.getElementById('container').appendChild(showResultDiv);


}