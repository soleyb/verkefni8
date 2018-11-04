const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;
  let box;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    // TODO láta hluti í _items virka
    box = items.firstElementChild;

    for(let eyda of items.children){
      eyda.querySelector('.item__button').addEventListener('click', deleteItem);
      eyda.querySelector('.item__checkbox').addEventListener('change', strikaYfir);
      eyda.querySelector('.item__text').addEventListener('click', edit);
    }

  }
  //strikar yfir eða fjarlægir yfirstrikun
  function strikaYfir(e) {
    e.target.parentNode.classList.toggle('item--done');
    console.log(e.target.parentNode);
  }


  function formHandler(e) {
    e.preventDefault();

    texti=e.target.querySelector('.form__input').value;
    if(texti==null || texti==""){
      return;
    }
    add(texti);
    document.querySelector('.form__input').value="";

  }

  // event handler fyrir það að klára færslu
  function finish(e) {
  }

  // event handler fyrir það að breyta færslu
  function edit(e) {
    let textabox = e.target;
    const texti = textabox.textContent;
    const input = el(texti);
    var foreldri = e.target.parentNode;
    foreldri.insertBefore(input,textabox);
    foreldri.removeChild(textabox);
    document.querySelector('.item__edit').focus();

    input.addEventListener('keypress', function(ev) {
      if(ev.keyCode == ENTER_KEYCODE){
        const nyrTexti = input.value;
        textabox.textContent = nyrTexti;
        foreldri.insertBefore(textabox,input);
        foreldri.removeChild(input);
        textabox.addEventListener('click', edit);
      };
    })
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
//    const nyttStak = el(box,'item--done',null);
    const nyttStak = box.cloneNode(true);
    nyttStak.classList.remove('item--done');
    nyttStak.querySelector('.item__text').textContent=value;
    nyttStak.querySelector('.item__checkbox').checked = false;
    nyttStak.querySelector('.item__button').addEventListener('click', deleteItem);
    nyttStak.querySelector('.item__checkbox').addEventListener('change', strikaYfir);
    nyttStak.querySelector('.item__text').addEventListener('click', edit);

    items.appendChild(nyttStak);
//    console.log(nyttStak.querySelector('item__text').textContent);

  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    foreldri = e.target.parentNode
    console.log(foreldri);
    items.removeChild(foreldri);
  }

  // hjálparfall til að útbúa element
  function el(value) {
    const input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('class', 'item__edit');
    input.value = value;
    return input;
  }

  return {
    init: init
  }
})();
