export class UserDto {
    id;
    username;
    email;
    avatarUrl;
    isVerified;
    roles;

    constructor(user) {
        this.id = user.id || user._id;
        this.username = user.username;
        this.email = user.email;
        this.avatarUrl = user.avatarUrl;
        this.isVerified = user.isVerified;
        this.roles = user.roles;
    }
}