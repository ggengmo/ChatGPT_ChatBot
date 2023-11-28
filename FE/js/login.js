document.getElementById("login-form").addEventListener("submit", function(event){
    event.preventDefault()

    let email = document.getElementById("email").value
    let password = document.getElementById("your_pass").value

    fetch('http://127.0.0.1:8000/accounts/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,   // 사용자명
            password: password,   // 비밀번호
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        if (data.access_token) {
            // 로그인 성공 시 토큰을 저장하고 다른 페이지로 이동
            localStorage.setItem('jwt', data.access_token);
            window.location.href = "http://127.0.0.1:8000/chatting/";  // 로그인 성공 후 이동할 페이지 URL
        } else if (data.non_field_errors) {
            // 로그인 실패 시 에러 메시지 출력
            alert(data.non_field_errors);
        }         
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
