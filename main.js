document.querySelectorAll('.chat-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = btn.closest('.card');
    const charData = {
      name: card.dataset.char,
      avatar: card.dataset.avatar,
      role: card.dataset.role,
      desc: card.dataset.desc,
      welcomeimg: card.dataset.welcomeimg
    };
    localStorage.setItem('cnsfw_currentChar', JSON.stringify(charData));
    window.location.href = "chat.html";
  });
});