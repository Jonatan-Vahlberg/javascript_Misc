const itemsList = document.querySelectorAll('.items');
const forms = document.querySelectorAll('.form');
const items =  [];

function addListItem(e){
    e.preventDefault();
    const text = this.querySelector("[name=item]").value;
    const item = {
        text,
        done: false,
    }
    items.push(item);
    populateList()
}

function populatelist(items = [], itemsList){
    itemsList.innerHTML = items.map((item, i) =>{
        return ``;
    });
}

forms.forEach(form => form.addEventListener('submit',addListItem));