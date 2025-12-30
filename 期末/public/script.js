document.getElementById('dataForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const statusMsg = document.getElementById('statusMessage');
    const originalBtnText = submitBtn.querySelector('span').innerText;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.querySelector('span').innerText = '處理中...';
    statusMsg.className = 'hidden';

    // 收集資料
    const formData = {
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            statusMsg.textContent = '🎉 資料提交成功！';
            statusMsg.className = 'success';
            document.getElementById('dataForm').reset();
        } else {
            throw new Error(result.message || '提交失敗');
        }
    } catch (error) {
        statusMsg.textContent = `❌ 錯誤: ${error.message}`;
        statusMsg.className = 'error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = originalBtnText;
    }
});
