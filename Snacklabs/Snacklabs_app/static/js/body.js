// 섹션 토글 기능
document.querySelectorAll('.label.public').forEach(section => {
    section.addEventListener('click', () => {
        const content = section.nextElementSibling;
        if (content.style.display === 'none' || content.style.display === '') {
            content.style.display = 'block';
            section.classList.add('active');
        } else {
            content.style.display = 'none';
            section.classList.remove('active');
        }
    });
});

// 모든 섹션 제목에 클릭 이벤트 리스너 추가
document.querySelectorAll('.label.public').forEach(section => {
    section.addEventListener('click', () => toggleSection(section));
});

// 섹션 추가 폼 토글
document.getElementById('addSectionButton').addEventListener('click', function(event) {
    event.preventDefault(); // 링크 기본 동작 방지
    const form = document.getElementById('addSectionForm');
    form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
});