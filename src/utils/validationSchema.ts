import * as yup from 'yup';

// Phone mask helper function
const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    // Remove all non-digits
    const phoneNumber = value.replace(/[^\d]/g, '');

    // Check if there's already a country code - keep user's input
    if (phoneNumber.length >= 11) {
        const countryCode = phoneNumber[0] === '7' ? '+7' : `+${phoneNumber[0]}`;
        return `${countryCode}(${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 9)} ${phoneNumber.slice(9, 11)}`;
    }
    return value;
};

// Custom phone validation - updated to accept different country codes
const phoneRegExp = /^\+\d\(\d{3}\)\s\d{3}\s\d{2}\s\d{2}$/;

export const formSchema = yup.object().shape({
    name: yup
        .string()
        .required('Введите ваше имя')
        .min(2, 'Имя должно содержать минимум 2 символа')
        .matches(/^[а-яА-ЯёЁa-zA-Z\s-]+$/, 'Имя может содержать только буквы, пробелы и дефис')
        .transform((value) => value?.trim()),

    phone: yup
        .string()
        .required('Введите номер телефона')
        .matches(phoneRegExp, 'Введите корректный номер телефона в формате +X(XXX) XXX XX XX')
        .transform(formatPhoneNumber),

    email: yup
        .string()
        .required('Введите email')
        .email('Введите корректный email')
        .transform((value) => value?.toLowerCase().trim()),

    promocode: yup.string().optional()
});

// Helper function to format phone input in real-time
export const formatPhoneInput = (value: string) => {
    if (!value) return '';

    // Remove all non-digits
    const phoneNumber = value.replace(/[^\d]/g, '');

    // Build the formatted string
    let formatted = '';

    // If there are digits, format according to the first digit (country code)
    if (phoneNumber.length > 0) {
        // Use first digit as country code
        formatted = `+${phoneNumber[0]}`;

        if (phoneNumber.length > 1) {
            formatted += `(${phoneNumber.slice(1, 4)}`;
        }
        if (phoneNumber.length > 4) {
            formatted += `) ${phoneNumber.slice(4, 7)}`;
        }
        if (phoneNumber.length > 7) {
            formatted += ` ${phoneNumber.slice(7, 9)}`;
        }
        if (phoneNumber.length > 9) {
            formatted += ` ${phoneNumber.slice(9, 11)}`;
        }
    }

    return formatted;
};

// Example usage of phone mask:
// Input: "77771234567"
// Output: "+7(777) 123 45 67"
// Input: "17771234567"
// Output: "+1(777) 123 45 67"