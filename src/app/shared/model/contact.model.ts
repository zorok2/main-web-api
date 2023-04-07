let _checked = new WeakMap();
export class Contacts {
    contact_id: number
    token_dang_nhap: string
    email: string
    tai_khoan: string
    password: string
    phone_number: string
    ngay_tao: string
    contact_tag_id: number[]
    contact_tag_name: string[]
    ho_ten: string
    avatar: string
    is_two_factor_auth: boolean
    is_two_factor_auth_for_new_device: boolean
    ho_ten_khong_dau: string
}