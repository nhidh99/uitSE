type UserModel = {
    email: string;
    name: string;
    phone: string;
    role: string;
    gender: string;
    cart: string | null;
    address_id: number | null;
    wish_list: string;
};

export default UserModel;
