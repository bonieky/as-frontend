import { ChangeEvent } from "react";

type Props = {
    type?: 'text' | 'password';
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    errorMessage?: string;
}

export const InputField = ({ type, value, onChange, placeholder, disabled, errorMessage }: Props) => {
    return (
        <div className="w-full my-3">
            <input
                type={type || 'text'}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full block text-lg p-3 outline-none rounded
                bg-gray-900 text-white
                border-b-2 ${errorMessage ? 'border-red-600' : 'border-gray-900'}
                focus:border-white`}
            />
            {errorMessage && <div className="text-right text-sm text-red-600">{errorMessage}</div>}
        </div>
    );
}