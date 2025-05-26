export const moreInit = (list) => {
	list.style.maxHeight = list.getAttribute('data-max-height') + 'px'
	list.style.overflow = 'hidden'
}

export const moreToggle = (
	btn,
	list,
	beforeText = 'Показать еще',
	afterText = 'Скрыть'
) => {
	const span = btn.querySelector('span')
	btn.querySelector('span')
	if (!btn.classList.contains('active')) {
		btn.classList.add('active')
		span ? (span.innerText = afterText) : (btn.innerText = afterText)
		list.classList.add('active')
	} else {
		btn.classList.remove('active')
		span ? (span.innerText = beforeText) : (btn.innerText = beforeText)
		list.classList.remove('active')
	}
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-based
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}.${month}.${year}`;
}