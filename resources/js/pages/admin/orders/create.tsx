import DynamicFormField from '@/components/DynamicFormField';
import { Button } from '@/components/ui/button';
import SiteLayout from '@/layouts/site-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, ShoppingCart } from 'lucide-react';

type FormField = {
    id: number;
    label: string;
    name: string;
    type: 'text' | 'textarea' | 'select';
    required: boolean;
    options?: string | null;
};

type Props = {
    service: {
        id: number;
        name: string;
        form_fields: FormField[];
    };
};

export default function CreateOrder({ service }: Props) {
    const { data, setData, post, processing, errors } = useForm<{
        service_id: number;
        form_data: Record<string, string>;
    }>({
        service_id: service.id,
        form_data: {},
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData('form_data', {
            ...data.form_data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    return (
        <SiteLayout title={`Order: ${service.name}`}>
            <Head title={`Order: ${service.name}`} />

            <div className="mx-auto max-w-3xl px-6 py-12">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                            <ShoppingCart className="h-3 w-3" />
                            Checkout
                        </div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">{service.name}</h1>
                        <p className="text-muted-foreground">Please fill in the details below to complete your order.</p>
                    </div>

                    <Link
                        href="/services"
                        className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Cancel
                    </Link>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-primary/5 md:p-12">
                    {/* Decorative element */}
                    <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

                    <form onSubmit={handleSubmit} className="relative space-y-8">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
                            {service.form_fields.length > 0 ? (
                                service.form_fields.map((field) => (
                                    <DynamicFormField
                                        key={field.id}
                                        field={field}
                                        value={data.form_data[field.name] || ''}
                                        error={(errors as Record<string, string>)[`form_data.${field.name}`]}
                                        onChange={handleChange}
                                    />
                                ))
                            ) : (
                                <div className="rounded-2xl border-2 border-dashed border-border py-12 text-center">
                                    <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                                    <p className="text-muted-foreground">
                                        No additional information required for this service.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
                            <p className="max-w-xs text-center text-xs text-muted-foreground sm:text-left">
                                By clicking place order, you agree to our terms of service and refund policy.
                            </p>
                            <Button
                                type="submit"
                                disabled={processing}
                                size="lg"
                                className="h-14 w-full gap-2 px-12 text-lg font-bold shadow-xl shadow-primary/20 sm:w-auto"
                            >
                                Place Order
                                <CheckCircle2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </SiteLayout>
    );
}
