document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 메뉴 토글 (작은 화면에서 사용)
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarNav = document.getElementById('navbarNav');

    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarNav.classList.toggle('show');
        });
    }

    // 메뉴 항목에 대한 클릭 애니메이션 추가
    const courseLinks = document.querySelectorAll('.courselink');

    courseLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // 현재 링크 외의 모든 링크에서 'active' 클래스 제거
            courseLinks.forEach(l => l.classList.remove('active'));
            // 현재 클릭된 링크에 'active' 클래스 추가
            this.classList.add('active');
        });
    });
});

// JavaScript: 메뉴 항목을 강조하는 함수
function highlightMenuItem(event) {
    // 클릭 시, 기본 링크 이동 동작을 수행하기 전에 JavaScript 실행
    event.preventDefault();
    
    // 모든 메뉴 항목에서 'selected' 클래스를 제거
    document.querySelectorAll('.sub_nav li').forEach((item) => {
        item.classList.remove('selected');
    });

    // 클릭된 링크의 부모 <li> 요소에 'selected' 클래스 추가
    const clickedItem = event.target.closest('li');
    clickedItem.classList.add('selected');

    // 선택된 항목의 href를 로컬 저장소에 저장
    localStorage.setItem('selectedMenu', event.target.href);

    // 클릭된 링크로 이동
    window.location.href = event.target.href;
}

