export interface ContactData {
    email?: string;
    contactNo?: string;
    address?: string;
    addressLink?: string | null;
    facebook?: string | null;
    linkedIn?: string | null;
    instagram?: string | null;
    whatsApp?: string | null;
}

export const contactData: ContactData = {
    email: 'projects@byldist.com',
    contactNo: '+91 94454 60586',
    address: 'Chennai, India',
}