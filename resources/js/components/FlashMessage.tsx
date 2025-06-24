import { usePage } from '@inertiajs/react';

type FlashProps = {
    flash?: {
        success?: string;
        error?: string;
    };
};

export default function FlashMessage() {
    const { props } = usePage<FlashProps>();
    const success = props.flash?.success;
    const error = props.flash?.error;

    if (!success && !error) return null;

    return (
        <div
            className={`mb-4 rounded px-4 py-3 text-sm font-medium ${
                success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
        >
            {success || error}
        </div>
    );
}
