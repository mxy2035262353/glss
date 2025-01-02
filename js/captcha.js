function generateCaptcha(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

// 随机生成颜色
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// 随机生成旋转角度
function randomAngle() {
    return Math.random() * 30 - 15;  // 随机角度 -15° 到 +15°
}

// 绘制干扰线，使用随机颜色
function drawRandomLines(ctx, width, height) {
    const linesCount = 5 + Math.floor(Math.random() * 5);  // 增加干扰线的数量（5-10条线）

    for (let i = 0; i < linesCount; i++) {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const endX = Math.random() * width;
        const endY = Math.random() * height;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 1 + Math.random() * 1;  // 将线宽限制在 1px 到 2px 之间

        // 使用随机颜色
        ctx.strokeStyle = randomColor();
        ctx.stroke();
    }
}

// 绘制噪点
function drawNoise(ctx, width, height) {
    const noiseCount = 50 + Math.floor(Math.random() * 20);  // 随机生成噪点的数量（50-70个点）

    for (let i = 0; i < noiseCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = `rgba(0, 0, 0, 0.2)`;  // 使用较低透明度的黑色来绘制噪点
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.random() * 2, 0, 2 * Math.PI);  // 随机生成大小的圆点
        ctx.fill();
    }
}

// 绘制验证码
function drawCaptcha(captcha) {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置canvas背景色
    ctx.fillStyle = '#f5f5f5';  // 背景色与CSS中的背景色保持一致
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 先绘制干扰线
    drawRandomLines(ctx, canvas.width, canvas.height);

    // 然后绘制噪点
    drawNoise(ctx, canvas.width, canvas.height);

    // 设置字体样式
    const fontSize = 30;
    const fontFamily = 'Arial';
    const letterWidth = fontSize * 0.6;  // 字母宽度估算
    const totalWidth = letterWidth * captcha.length;
    const startX = (canvas.width - totalWidth) / 2;  // 使验证码居中

    // 绘制验证码字符
    for (let i = 0; i < captcha.length; i++) {
        const letter = captcha.charAt(i);
        
        // 设置随机颜色和旋转角度
        ctx.fillStyle = randomColor();  // 随机颜色
        ctx.font = `${fontSize}px ${fontFamily}`;
        
        // 随机偏移位置和扭曲角度
        const x = startX + i * letterWidth + Math.random() * 10;
        const y = (canvas.height / 2) + Math.random() * 10;
        const angle = randomAngle();
        
        // 保存当前的绘图状态
        ctx.save();
        
        // 移动画布原点并旋转
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);  // 旋转角度转换为弧度
        
        // 绘制字母
        ctx.fillText(letter, 0, 0);
        
        // 恢复绘图状态
        ctx.restore();
    }

    // 将验证码文本存储在隐藏元素中，以便提交时验证
    document.getElementById('captcha-display').textContent = captcha;
    document.getElementById('captcha-display').style.display = 'none';
}

// 点击按钮时重新生成验证码
document.getElementById('generate-captcha').addEventListener('click', function () {
    const captcha = generateCaptcha();  // 生成验证码
    drawCaptcha(captcha);  // 绘制验证码到canvas上
});

// 页面加载时生成验证码
window.onload = function() {
    const captcha = generateCaptcha();  // 生成验证码
    drawCaptcha(captcha);  // 绘制验证码到canvas上
};