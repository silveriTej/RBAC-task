document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('add-user-form');
    const roleForm = document.getElementById('add-role-form');
    const userTable = document.getElementById('user-table');
    const roleList = document.getElementById('role-list');

    const users = [];
    const roles = ['Admin', 'Editor', 'Viewer'];

    // Populate role dropdown
    const roleDropdown = document.getElementById('user-role');
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        roleDropdown.appendChild(option);
    });

    // Add user
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name').value;
        const userRole = document.getElementById('user-role').value;

        if (userName && userRole) {
            users.push({ name: userName, role: userRole });
            renderUsers();
            userForm.reset();
        }
    });

    // Render users
    function renderUsers() {
        userTable.innerHTML = '';
        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>
                    <button onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    // Delete user
    window.deleteUser = (index) => {
        users.splice(index, 1);
        renderUsers();
    };

    // Add role
    roleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const roleName = document.getElementById('role-name').value;

        if (roleName && !roles.includes(roleName)) {
            roles.push(roleName);
            renderRoles();
            roleForm.reset();

            // Add new role to dropdown
            const option = document.createElement('option');
            option.value = roleName;
            option.textContent = roleName;
            roleDropdown.appendChild(option);
        }
    });

    // Render roles
    function renderRoles() {
        roleList.innerHTML = '';
        roles.forEach((role) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${role}
                <button onclick="deleteRole('${role}')">Delete</button>
            `;
            roleList.appendChild(li);
        });
    }

    // Delete role
    window.deleteRole = (role) => {
        const index = roles.indexOf(role);
        if (index > -1) {
            roles.splice(index, 1);
            renderRoles();

            // Remove from dropdown
            const options = Array.from(roleDropdown.options);
            options.forEach(option => {
                if (option.value === role) option.remove();
            });
        }
    };

    // Initial rendering
    renderRoles();
});
