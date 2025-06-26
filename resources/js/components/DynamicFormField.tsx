type FormField = {
    id: number;
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    options?: string | null;
};

type Props = {
    field: FormField;
    value: string;
    error?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
};

export default function DynamicFormField({ field, value, error, onChange }: Props) {
    return (
        <div>
            <label className="block font-medium text-gray-700">{field.label}</label>

            {field.type === 'text' && (
                <input
                    type="text"
                    name={field.name}
                    required={field.required}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
            )}

            {field.type === 'textarea' && (
                <textarea
                    name={field.name}
                    required={field.required}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
                />
            )}

            {field.type === 'select' && field.options && (
                <select
                    name={field.name}
                    required={field.required}
                    value={value}
                    onChange={onChange}
                    className={`mt-1 block w-full rounded shadow-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
                >
                    <option value="">-- Selecteer --</option>
                    {JSON.parse(field.options).map((option: string, idx: number) => (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            )}

            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
