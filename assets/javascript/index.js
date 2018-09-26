let cards = document.querySelectorAll('.card');

let x = 1.045;
let y = 1.05;
let duration = 150;
let easing = 'easeOutCubic';

console.log(cards);

for (let card of cards) {
  let bg = card.querySelector('.card-bg');
  card.addEventListener('mouseenter', event => {
    animate.stop(bg);
    animate({
      el: bg,
      scaleX: x,
      scaleY: y,
      duration: duration,
      easing: easing
    });
  });

  card.addEventListener('mouseleave', event => {
    animate.stop(bg);
    animate({
      el: bg,
      scaleX: [x, 1],
      scaleY: [y, 1],
      duration: 1000,
      easing: 'easeOutElastic 650'
    });
  });
}