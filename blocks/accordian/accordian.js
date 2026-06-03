/**
 * Decorates the accordian block.
 * @param {Element} block The accordian block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  const heading = rows.shift();

  if (heading) {
    heading.classList.add('accordian-heading');
  }

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const title = cells[0];
    const content = cells[1];

    if (!title || !content) return;

    row.classList.add('accordian-item');
    title.classList.add('accordian-item-title');
    content.classList.add('accordian-item-content');

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'accordian-item-button';
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', `accordian-panel-${index}`);
    button.innerHTML = title.innerHTML;

    title.textContent = '';
    title.append(button);

    content.id = `accordian-panel-${index}`;
    content.hidden = true;

    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      content.hidden = expanded;
    });
  });
}
