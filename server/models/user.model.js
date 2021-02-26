class User {
    constructor(
        username,
        password,
        roles,
        first_name,
        last_name,
        phone,
        status,
        updated_at
    ) {       
        this.username = username;
        this.password = password;
        this.first_name = first_name || '';
        this.last_name = last_name || '';
        this.phone = phone || '';
        this.roles = roles || 'employee';
        this.status = status || false;
        this.created_at = new Date();
        this.updated_at = updated_at || '';
    }
}

module.exports = User;