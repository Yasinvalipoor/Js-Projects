document.querySelector('input').addEventListener('input', ({ target }) => {
    document.body.style.backgroundColor = `hsl(0, 0%, ${target.value}%)`;
});