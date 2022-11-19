let menu = document.querySelector(".burger_menu");
let logo = document.querySelectorAll(".logo");

logo[0].addEventListener('click', function () {
  console.log('clicked');
  menu.classList.toggle('show_menu');
});

logo[1].addEventListener('click', function () {
  console.log('clicked');
  menu.classList.toggle('show_menu');
});
