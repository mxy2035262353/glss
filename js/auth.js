// 用户注册
$('#register-form').submit(function (event) {
    event.preventDefault();
    // 获取表单数据
    const username = $('#register-username').val();
    const password = $('#register-password').val();
    const confirmPassword = $('#register-confirm-password').val();
    const email = $('#register-email').val();
    const gender = $("input[name='gender']:checked").val();
    // 校验密码和确认密码
    if (password !== confirmPassword) {
        alert("密码和确认密码不匹配！");
        return;
    }
    // 校验邮箱格式
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        alert("请输入有效的邮箱地址！");
        return;
    }
    // 检查用户名是否已存在
    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.username === username)) {
        alert("用户名已存在！");
        return;
    }
    // 保存用户数据到本地存储
    const newUser = { username, password, email, gender };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("注册成功！");
    window.location.href = 'login.html';
});

// 用户登录
$('#login-form').submit(function (event) {
    event.preventDefault();

    // 获取表单数据
    const username = $('#login-username').val();
    const password = $('#login-password').val();
    const captchaInput = $('#login-captcha').val();
    const captchaDisplayed = $('#captcha-display').text();

    // 校验验证码
    if (captchaInput !== captchaDisplayed) {
        alert("验证码错误！");
        return;
    }

    // 查找用户并验证用户名和密码
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("用户名或密码错误！");
        return;
    }

    // 登录成功
    alert("登录成功！");
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'index.html';
});