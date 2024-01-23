document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var url = `https://api.roblox.com/users/get-by-username?username=${username}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var accountInfoDiv = document.getElementById('accountInfo');
            accountInfoDiv.innerHTML = '';

            if (data.success === false) {
                accountInfoDiv.innerHTML = '<p>No account found with that username.</p>';
            } else {
                var avatarUrl = `https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&format=png&userId=${data.Id}`;
                accountInfoDiv.innerHTML = `
                    <div class="message">
                        <img src="${avatarUrl}" alt="User Avatar">
                        <p><strong>Username:</strong> ${data.Name}</p>
                        <p><strong>ID:</strong> ${data.Id}</p>
                        <p><strong>Join Date:</strong> ${new Date(data.Created * 1000).toString()}</p>
                    </div>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
});
